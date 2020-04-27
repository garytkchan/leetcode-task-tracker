import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

// Register new user
export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    // from post API(Controller Class)
    await axios.post("/api/users/register", newUser);
    history.push("/login");

    // reset errors. Stop from recurring display
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// login
export const login = (LoginRequest) => async (dispatch) => {
  try {
    // from post API(Controller Class)
    const res = await axios.post("/api/users/login", LoginRequest);
    // extract the token from res.data
    const { token } = res.data;
    // store the token in the local storage
    localStorage.setItem("jwtToken", token);
    // set our token in header*** Like header in Postman
    setJWTToken(token);
    // decode the token in React
    const decoded = jwt_decode(token);
    // dispatch to securityReducer.js
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// logout
export const logout = () => (dispatch) => {
  // remove the token at the local storage. "jwtToken" was defined in login func above
  localStorage.removeItem("jwtToken");

  // set validToken to false. Remove from header
  setJWTToken(false);

  // dispatch to securityReducer.js
  dispatch({
    type: SET_CURRENT_USER,
    // reset payload if successful
    payload: {},
  });
};
