import { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGIN_FAILURE, RESET_LOADING_STATUS } from "../../redux/actionType";
import { Alert, AlertIcon, Button, Spinner } from "@chakra-ui/react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { handleLogin } from "../../redux/action";
export const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state);

  const [credentials, setCredentials] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      await handleLogin(credentials, dispatch);
    } else {
      dispatch({
        type: LOGIN_FAILURE,
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
      <div className={classes.login}>
        <div className={classes.lContainer}>
          <h1 className={classes.form_title}>Login</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className={classes.lInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className={classes.lInput}
          />
          <button
            disabled={isLoading}
            onClick={handleClick}
            className={classes.lButton}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          {error && (
            <Alert color={"red"} bg={"unset"} textAlign={"center"}>
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
