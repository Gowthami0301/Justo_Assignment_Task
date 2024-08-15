import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import Card from './Card';

const LoginCard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(username, password);
        if (response.token) {
            localStorage.setItem('token', response.token); // Save token to localStorage
            navigate('/dashboard'); // Redirect to Dashboard on successful login
        } else {
            setMessage(response.error || 'Login failed');
        }
    };

    return (
        <Card title="Login">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username (Email or Phone)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <p>
                    Forgot your password? <Link to="/send-reset-link">Reset Password</Link>
                    </p>

            </form>
            {message && <p>{message}</p>}
        </Card>
    );
};

export default LoginCard;
