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
export const Login = () => {
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        credentials
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
    }
  };

  return (
    <div className={classes.login}>
      <div className={classes.lContainer}>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className={classes.lInput}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className={classes.lInput}
        />
        <button
          disabled={isLoading}
          onClick={handleClick}
          className={classes.lButton}
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
