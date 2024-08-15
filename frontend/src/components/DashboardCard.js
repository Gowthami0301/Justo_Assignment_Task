import React, { useState,useEffect, } from 'react';
import { getTime, kickoutUser } from '../api/api';
import Card from './Card';
import { useNavigate, Link } from 'react-router-dom';

const DashboardCard = () => {
    const [serverTime, setServerTime] = useState('');
    const [message, setMessage] = useState('');
    const [kickoutMessage, setKickoutMessage] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleGetTime = async () => {
        const token = localStorage.getItem('token');
        const response = await getTime(token);
        if (response.time) {
            setServerTime(response.time);
        } else {
            setMessage(response.error || 'Unable to fetch time');
        }
    };

    const handleKickout = async () => {
        const response = await kickoutUser(username);
        setKickoutMessage(response.message || response.error);
    };
    useEffect(() => {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/');
            return;
          }
        },[])
    return (
        <Card title="Dashboard">
            <div>
                <button onClick={handleGetTime}>Get Server Time</button>
                {serverTime && <p>Server Time: {serverTime}</p>}
                {message && <p>{message}</p>}
            </div>
            
            <div>
                <input
                    type="text"
                    placeholder="Username to Kickout"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button onClick={handleKickout}>Kickout User</button>
                {kickoutMessage && <p>{kickoutMessage}</p>}
            </div>
        </Card>
    );
};

export default DashboardCard;
