import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.navbar}>
      <div className={classes.navContainer}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className={classes.logo}>kissubooking</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className={classes.navItems}>
            <Link to="/register">
              {" "}
              <button className={classes.navButton}>Register</button>
            </Link>
            <Link to="/login">
              {" "}
              <button className={classes.navButton}>Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
