import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILURE,
  REGISTER_REQUEST_SUCCESS,
} from "./actionType";

// ! REGISTER USER HANDLER
export const handleRegister = async (credentials, dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    await axios.post(
      "https://hotel-f7gz.onrender.com/auth/register",
      credentials
    );

    return dispatch({
      type: REGISTER_REQUEST_SUCCESS,
    });
  } catch (err) {
    return dispatch({
      type: REGISTER_REQUEST_FAILURE,
      payload: err.response.data,
    });
  }
};

// ! USER LOGIN HANDLER
export const handleLogin = async (credentials, dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(
      "https://hotel-f7gz.onrender.com/auth/login",
      credentials
    );
    return dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    return dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
  }
};

// ! USER LOGOUT HANDLER

export const handleLoginOut = async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    return dispatch({ type: LOGOUT_REQUEST_SUCCESS });
  } catch (err) {
    return dispatch({ type: LOGOUT_REQUEST_FAILURE });
  }
};
