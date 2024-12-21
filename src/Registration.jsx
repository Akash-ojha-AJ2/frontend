import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    email: '',
    phone: '',
    institutionName: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { teacherName, email, phone, institutionName, address, password } = formData;

    if (!teacherName || !email || !phone || !institutionName || !address || !password) {
      return 'All fields are required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return 'Phone number must be 10 digits.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch('https://attendance-v2dt.onrender.com/api/teachers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
        return;
      }

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="registration">
      <div className="container">
        <div className="split left">
          <h1>Hello, Friend!</h1>
          <p>Enter your details and start your journey with us.</p>
          <button className="sign-in-btn" onClick={() => navigate('/login')}>
            SIGN IN
          </button>
        </div>

        <div className="split right">
          <h1>Register With</h1>

          <form onSubmit={handleSubmit} className="register-form">
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="teacherName"
              placeholder="Name"
              value={formData.teacherName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="institutionName"
              placeholder="Institution Name"
              value={formData.institutionName}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="register-btn">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistration;
