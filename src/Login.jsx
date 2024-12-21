import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie'; // Ensure this library is installed
import './login.css';

const LoginPage = () => {
    const { login } = useAuth(); // Context function to manage login state
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear previous error messages

        try {
            const response = await fetch('https://attendance-v2dt.onrender.com/api/teachers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({ email, password }), // Send email and password
            });

            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                localStorage.setItem('token', data.token); // Store the JWT token
                Cookies.set('teacherId', data.teacherId, { expires: 1 }); // Save teacherId in a cookie
                login(); // Update the authentication state
                navigate('/home'); // Redirect to home page
            } else {
                const data = await response.json(); // Extract error details
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="split left">
                    <h1>Welcome Back!</h1>
                    <p>Provide your personal details to use all features.</p>
                    <button className="signup-btn" onClick={() => navigate('/registration')}>SIGN UP</button>
                </div>

                <div className="split right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        {error && <p className="error">{error}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-btn">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

