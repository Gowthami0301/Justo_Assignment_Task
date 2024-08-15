import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api'; 
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};

export const generateOneTimeLink = async (username) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-link`, { username });
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/validate/${token}`, { token, newPassword });
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};

export const getTime = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/time`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};

export const kickoutUser = async (username) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/kickout`, { username });
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};
