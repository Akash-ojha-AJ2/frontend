import React from 'react';
import { useLocation } from 'react-router-dom';
import './ViewData.css'; // Import the CSS file

const ViewData = () => {
  const location = useLocation();

  console.log(location.state);
  const { data } = location.state || {};

  if (!data) {
    return <div>No data available. Please go back and try again.</div>;
  }

  const { students, attendanceMap, totalAttendanceMap,branch,semester } = data;

  // Extract all unique dates from the attendanceMap
  const allDates = new Set();
  Object.values(attendanceMap).forEach((attendanceRecords) => {
    attendanceRecords.forEach((record) => {
      allDates.add(record.date);
    });
  });

  // Convert Set to an array and sort dates
  const sortedDates = [...allDates].sort();

  // Sort students by roll number in ascending order
  const sortedStudents = [...students].sort((a, b) => {
    const rollA = parseInt(a.rollNo.replace(/\D/g, ''), 10); // Remove non-numeric characters
    const rollB = parseInt(b.rollNo.replace(/\D/g, ''), 10);
    return rollA - rollB;
  });

  return (
    <div className='data'>
      <h1>Student Data for {branch}, {semester}</h1>
      <div className="table-container">
        <div className="fixed-columns">
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Roll No</th>
                <th>Attendance Summary</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.studentName}</td>
                  <td>{student.email}</td>
                  <td>{student.phoneNo}</td>
                  <td>{student.rollNo}</td>
                  <td>
                    {totalAttendanceMap[student._id]?.presentDays || 0} / {totalAttendanceMap[student._id]?.totalDays || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="scrollable-columns">
          <table>
            <thead>
              <tr className='date'>
                {sortedDates.map((date) => (
                  <th key={date}>{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student._id}>
                  {sortedDates.map((date) => {
                    // Find the attendance status for the student on this date
                    const attendance = attendanceMap[student._id]?.find((att) => att.date === date);
                    const status = attendance ? attendance.status : 'Absent';

                    let statusClass = '';
                    if (status === 'Present') {
                      statusClass = 'attendance-present';
                    } else if (status === 'Absent') {
                      statusClass = 'attendance-absent';
                    } else {
                      statusClass = 'attendance-no-record';
                    }

                    return (
                      <td key={date} className={statusClass}>
                        {status}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
