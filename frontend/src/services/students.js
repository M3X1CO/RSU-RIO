import axios from 'axios';
const baseUrl = '/api/students';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
  console.log('Setting token:', token); // Debugging log
};

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching all students:', error.response || error.message); // Debugging log
    throw error;
  }
};

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.error('Error creating a student:', error.response || error.message); // Debugging log
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
  } catch (error) {
    console.error('Error updating the student:', error.response || error.message); // Debugging log
    throw error;
  }
};

const remove = async id => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting the student:', error.response || error.message); // Debugging log
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
