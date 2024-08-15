import React, { useState } from 'react';
import { resetPassword } from '../api/api';
import Card from './Card';

const ResetPasswordCard = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await resetPassword(token, newPassword);
        setMessage(response.message || response.error);
    };

    return (
        <Card title="Reset Password">
            <form onSubmit={handleSubmit}>
               
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </Card>
    );
};

export default ResetPasswordCard;
