import axios from 'axios';

const StudentExists = async (oldPassportNumber, newPassportNumber) => {
  try {
    const response = await axios.post('/api/students/check-exists', { 
      oldPassportNumber: oldPassportNumber || undefined, 
      newPassportNumber: newPassportNumber || undefined 
    });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking if student exists:', error);
    throw error;
  }
};

export default StudentExists;