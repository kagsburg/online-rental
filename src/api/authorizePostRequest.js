import axios from 'axios';

const AuthorizePostRequest = async (url, formData) => {
  try {
    if (localStorage.token) {
      const a = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
        },
      });
      const baseURL = `https://rental2api2.herokuapp.com//${url}`;
      return a
        .post(baseURL, JSON.stringify(formData))
        .then((response) => {
          // handle success
          return response;
        })
        .catch((error) => {
          // handle error
          console.log('error1', error);
          throw error;
        });
    } 
      return {success: false, message: 'Login again'};
    
  } catch (error) {
    console.log('error2', error);
    throw error;
  }
};

export default AuthorizePostRequest;
