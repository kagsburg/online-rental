import axios from "axios";

const AuthorizeLoginRequest = async (url, formData) => {
  const a = await axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });
  const baseURL = `http://127.0.0.1:8000/${url}`;
  return a
    .post(baseURL, JSON.stringify(formData))
    .then((response) => {
      // handle success
      return response;
    })
    .catch((error) => {
      // handle error
      return error;
    });
};

export default AuthorizeLoginRequest;
