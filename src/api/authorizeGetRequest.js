import axios from 'axios';

const AuthorizeGetRequest = async (url) => {
  try {
    if (localStorage.token) {
      const a = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
        },
      });
      const baseURL = `https://rental2api2.herokuapp.com/${url}`;
      return a
        .get(baseURL)
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

export default AuthorizeGetRequest;
