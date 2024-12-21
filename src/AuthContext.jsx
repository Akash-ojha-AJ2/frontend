import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Initialize state from localStorage
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    useEffect(() => {
        // Optionally validate session on mount
        const checkSession = async () => {
            try {
                const response = await fetch('https://mark-my-attendance-4.onrender.com/api/teachers/session', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                    localStorage.setItem('isAuthenticated', 'true');
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('isAuthenticated');
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated');
            }
        };

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
