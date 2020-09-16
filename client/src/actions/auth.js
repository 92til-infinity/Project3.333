import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Load User
// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get("/api/auth");
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

// Login User
export const login = (email, password) => async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    // console.log(res.data);

    // dispatch(loadUser());
  } catch (err) {
    console.error(err.response.data);
  }
};
