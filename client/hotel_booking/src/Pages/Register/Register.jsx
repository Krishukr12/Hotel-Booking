import React, { useEffect, useState } from "react";
import classes from "./Register.module.css";
import { Alert, AlertIcon, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import { handleRegister } from "../../redux/action.js";
import { useDispatch, useSelector } from "react-redux";
import {
  REGISTER_REQUEST_FAILURE,
  RESET_LOADING_STATUS,
} from "../../redux/actionType";
export const Register = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({});
  const { isLoading, error } = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleRegisterRequest = async () => {
    if (credentials.email && credentials.password && credentials.username) {
      await handleRegister(credentials, dispatch);
    } else {
      dispatch({
        type: REGISTER_REQUEST_FAILURE,
        payload: {
          success: false,
          status: 404,
          message: "All fields are required !",
        },
      });
    }
  };
  useEffect(() => {
    dispatch({ type: RESET_LOADING_STATUS });
  }, []);
  return (
    <>
      <Navbar />
      <div className={classes.main_container}>
        <div className={classes.form_container}>
          <h1 className={classes.form_title}>Register</h1>
          <input
            className={classes.inputField}
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            className={classes.inputField}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            className={classes.inputField}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <div className={classes.submitButton}>
            <button
              disabled={isLoading}
              className={classes.lButton}
              onClick={handleRegisterRequest}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>

          {error && error.message && (
            <Alert
              color={"red"}
              bg={"unset"}
              textAlign={"center"}
              status="error"
            >
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
