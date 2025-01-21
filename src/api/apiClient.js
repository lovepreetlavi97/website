import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',//base URL,
    headers: {
        'Content-Type': 'application/json', // Default Content-Type
    },
    timeout: 10000, // Request timeout (10 seconds)
});

// Automatically attach the Authorization token if available
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Please log in again.');
        }
        return Promise.reject(error); // Reject errors to handle locally if needed
    }
);

export default apiClient;
