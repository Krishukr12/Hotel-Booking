import React, { useState } from "react";
import classes from "./Register.module.css";
import { Alert, AlertIcon, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../Components/Navbar/Navbar";

export const Register = () => {
  const [credentials, setCredentials] = useState({});
  const [error, setError] = useState({ status: false, message: "" });
  const toast = useToast();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const handleRegister = async () => {
    if (credentials.email && credentials.password && credentials.username) {
      try {
        const res = await axios.post(
          "https://hotel-f7gz.onrender.com/auth/register",
          credentials
        );
        toast({
          title: "Registration Successful",
          description: "Thanks for Registration!",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      } catch (err) {
        setError({ status: true, message: err.response.data.message });
      }
    } else {
      setError({ status: true, message: "All fields are required" });
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
            <button className={classes.lButton} onClick={handleRegister}>
              Register
            </button>
          </div>

          {error.status && error.message && (
            <Alert
              style={{
                height: "30px",
                width: "90%",
                margin: "auto",
                textAlign: "center",
                marginTop: "20px",
              }}
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
