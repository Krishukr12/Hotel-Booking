import { useState } from "react";
import classes from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../../redux/actionType";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { handleLogin } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { useCustomToast } from "../../hooks/useToast.js";

export const Login = () => {
  const { ShowCustomeToast } = useCustomToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login_isLoading } = useSelector((state) => state.loadings);
  const { login_error_msg } = useSelector((state) => state.errors);
  const [credentials, setCredentials] = useState({});

  //? : input change handler !
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //? : Check for empty fields !
    if (credentials.username && credentials.password) {
      const res = await handleLogin(credentials, dispatch);

      //? : Check for errors !
      if (res.type === LOGIN_SUCCESS) {
        localStorage.setItem("user", JSON.stringify(res.payload));
        // ? : Custom hook to show custome toast !
        ShowCustomeToast("Login Successfull");
        navigate(-1);
      }
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          success: false,
          status: 400,
          message: "All Fields are required !",
        },
      });
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
            disabled={login_isLoading}
            onClick={handleClick}
            className={classes.lButton}
          >
            {login_isLoading ? "Loading..." : "Login"}
          </button>
          {login_error_msg && login_error_msg.message && (
            <Alert color={"red"} bg={"unset"} textAlign={"center"}>
              <AlertIcon />
              {login_error_msg.message}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
