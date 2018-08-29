import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set token to Auth Header
      setAuthToken(token);
      //Decde token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

//Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set token to Auth Header
      setAuthToken(token);
      //Decde token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

//Logout user
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};
