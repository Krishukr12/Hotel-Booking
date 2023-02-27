import { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  RESET_LOADING_STATUS,
} from "../../redux/actionType";
import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { handleLogin } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { useCustomToast } from "../../hooks/useToast.js";
export const Login = () => {
  const { ShowCustomeToast } = useCustomToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state);
  const [credentials, setCredentials] = useState({});
  //! : input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //? : Check for empty fields
    if (credentials.username && credentials.password) {
      const res = await handleLogin(credentials, dispatch);
      if (res.type === LOGIN_SUCCESS) {
        localStorage.setItem("user", JSON.stringify(res.payload));
        // ? : Custom hook to show custome toast
        ShowCustomeToast("Login Successfull");
        navigate("/");
      }
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          success: false,
          status: 400,
          message: "All fields are required !",
        },
      });
    }
  };

  useEffect(() => {
    //? : To make sure that the loading status is reset when the page is changed
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
          {error && error.message && (
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
