import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mern-pnrstatus-fare-server.vercel.app/', loginData); // Adjust endpoint if necessary
            const { message } = response.data;

            if (response.status === 200) {
                console.log('Login Successful');
                setRedirectToHome(true); // Set redirect state to true on successful login
            } else {
                console.log(message);
            }
        } catch (error) {
            console.error('Login Failed', error);
        }
        setLoginData({
            username: '',
            password: ''
        });
    };

    if (redirectToHome) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="login-container">
            <div className="login-imageContainer"></div>
            <div className="login-formContainer">
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={loginData.username}
                        onChange={handleLoginChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                    <p>
                        Not registered yet? <Link to="/register" className="login-link">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
