import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchPrograms = async () => {
  try {
    const response = await axios.get(`${API_URL}/programs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};