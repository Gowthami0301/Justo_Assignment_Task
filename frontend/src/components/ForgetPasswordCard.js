import React, { useState } from 'react';
import { generateOneTimeLink } from '../api/api';
import Card from './Card';

const ForgetPasswordCard = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await generateOneTimeLink(username);
        setMessage(response.message || response.error);
    };

    return (
        <Card title="Forget Password">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username (Email or Phone)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Generate Link</button>
            </form>
            {message && <p>{message}</p>}
        </Card>
    );
};

export default ForgetPasswordCard;
