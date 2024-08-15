import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h1>Welcome to Auth API</h1>
                <div className="home-links">
                    <Link className="home-link" to="/register">Register</Link>
                    <Link className="home-link" to="/login">Login</Link>
                    <Link className="home-link" to="/forget-password">Forget Password</Link>
                    <Link className="home-link" to="/dashboard">Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
