import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../redux/actionType";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { Navbar } from "../../Components/Navbar/Navbar";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await axios.post(
        "https://hotel-f7gz.onrender.com/auth/login",
        credentials
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.login}>
        <div className={classes.lContainer}>
          <h1 className={classes.form_title}>Login</h1>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className={classes.lInput}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className={classes.lInput}
          />
          <Button
            colorScheme="teal"
            variant="outline"
            disabled={isLoading}
            onClick={handleClick}
            className={classes.lButton}
          >
            Login
          </Button>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
