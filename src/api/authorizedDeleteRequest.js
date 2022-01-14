
import axios from "axios";

const AuthorizeDeleteRequest = async (url) => {
  try {
    if (localStorage.token) {
      const a = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
      const baseURL = `http://127.0.0.1:8000/${url}`;
      return a
        .delete(baseURL)
        .then((response) => {
          // handle success
          return response;
        })
        .catch((error) => {
          // handle error
          // eslint-disable-next-line no-console
          console.log("error1", error);
          throw error;
        });
    }
    return { success: false, message: "Login again" };
  } catch (error) {
    console.log("error2", error);
    throw error;
  }
};

export default AuthorizeDeleteRequest;
