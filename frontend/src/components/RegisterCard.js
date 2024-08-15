import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

import Card from './Card';

const RegisterCard = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerUser({ email, phone, password });
        setMessage(response.message || response.error);
        navigate("/login")
    };

    return (
        <Card title="Register">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <p>
                    Do have an account? <Link to="/login">Login</Link>
                </p>
            </form>
            {message && <p>{message}</p>}
        </Card>
    );
};

export default RegisterCard;
