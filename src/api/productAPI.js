import apiClient from './apiClient';


export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('Error during loginUser API call:', error);
    throw error;
  }
};


