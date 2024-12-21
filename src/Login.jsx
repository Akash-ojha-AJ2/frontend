import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './login.css';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://attendance-v2dt.onrender.com/api/teachers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensure cookies are included
                body: JSON.stringify({ email, password }),
            });
            

            if (response.ok) {
    const data = await response.json(); // Extract teacherId from response
    Cookies.set('teacherId', data.teacherId, { expires: 1 }); // Expires in 1 day
    login();
    navigate('/home');


            } else {
                const data = await response.text(); // If the response isn't JSON
                setError(data || 'Login failed. Please try again.');
            }
            
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className='login'>
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
