import React from 'react';
import axios from 'axios';

const StudentExists = async (oldPassportNumber, newPassportNumber) => {
  try {
    const response = await axios.post('/api/students/check-exists', { 
      oldPassportNumber, 
      newPassportNumber 
    });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking if student exists:', error);
    throw error;
  }
};

export default StudentExists;