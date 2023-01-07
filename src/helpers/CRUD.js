import axios from 'axios';

const header = {
  'Content-Type': 'multipart/form-data',
};

export const postData = async (path, data) => {
  try {
    const response = await axios.post(path, data, header);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getData = async path => {
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    throw error;
  }
};
