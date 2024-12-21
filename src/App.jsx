import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Navbar from './Navbar';
import AddStudent from './addstudent';
import ViewStudentData from './ViewStudentForm';
import ViewData from './ViewData';
import Attendance from './Attendance';
import MarkAttendance from './MarkAttendance';
import DeleteAttendanceData from './DeleteAttendanceData';
import DeleteAttendanceResult from './DeleteAttendanceResult';
import Home from "./homepage";
import ProtectedRoute from './protectedRoute';
import { AuthProvider } from './AuthContext';
import Layout from './layout'; // Import Layout component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root ("/") to Login */}
          <Route path="*" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          {/* Protected Routes */}
          {/* Wrap protected routes in the Layout component */}
          <Route element={<Layout />}>
            {/* Add Navbar here so it appears on all protected pages */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addStudent"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <AddStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewstudentform"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <ViewStudentData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewdata"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <ViewData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/markattendance/:branch/:semester"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <MarkAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete-attendance"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <DeleteAttendanceData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete-attendance-result/:branch/:semester"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <DeleteAttendanceResult />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
