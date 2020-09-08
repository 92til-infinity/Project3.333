// Takes in a token, if it's there, puts it in the headers, if not deletes from headers
// If we have a token, we'll send it with every request
import axios from "axios";

// Function that takes in token as a parameter, then checks for it
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
