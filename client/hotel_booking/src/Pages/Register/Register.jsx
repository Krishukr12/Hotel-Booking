import React, { useState } from "react";
import classes from "./Register.module.css";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import { handleRegister } from "../../redux/action.js";
import { useDispatch, useSelector } from "react-redux";
import {
  REGISTER_REQUEST_FAILURE,
  REGISTER_REQUEST_SUCCESS,
} from "../../redux/actionType";
import { useCustomToast } from "../../hooks/useToast";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const { register_isLoading } = useSelector((state) => state.loadings);
  const { register_error_msg } = useSelector((state) => state.errors);
  const { ShowCustomeToast } = useCustomToast();

  //? : input change handler............
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  //? : Register request handler using redux............
  const handleRegisterRequest = async () => {
    //? : Check for empty fields
    if (credentials.email && credentials.password && credentials.username) {
      const res = await handleRegister(credentials, dispatch);
      if (res.type === REGISTER_REQUEST_SUCCESS) {
        // ? : Custom hook to show custome toast
        ShowCustomeToast("Registration Successful");
        navigate("/login");
      }
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
              disabled={register_isLoading}
              className={classes.lButton}
              onClick={handleRegisterRequest}
            >
              {register_isLoading ? "Loading..." : "Register"}
            </button>
          </div>

          {register_error_msg && register_error_msg.message && (
            <Alert
              color={"red"}
              bg={"unset"}
              textAlign={"center"}
              status="error"
            >
              <AlertIcon />
              {register_error_msg.message}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
