import apiClient from './apiClient';

/**
 * Login user and send OTP
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<Object>} Response from the API
 */
export const loginUser = async (phoneNumber) => {
  try {
    const response = await apiClient.post('/user/login', phoneNumber);
    return response.data;
  } catch (error) {
    console.error('Error during loginUser API call:', error);
    throw error;
  }
};

/**
 * Verify OTP and return JWT token
 * @param {string} otp - OTP received by the user
 * @returns {Promise<Object>} Response from the API
 */
export const verifyOtpAPI = async (otp) => {
  try {
    const response = await apiClient.post('/user/verify-otp', {
      otp,
    });
    
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error during verifyOTP API call:', error);
    throw error;
  }
};

export const resendOtpAPI = async (phoneNumber) => {
  try {
    const response = await apiClient.post('/user/resend-otp', {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error('Error during resendOTP API call:', error);
    throw error;
  }
};

