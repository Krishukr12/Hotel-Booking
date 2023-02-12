import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
export const Navbar = () => {
  // TODO: USER WILL GET USING API
  // const user = {
  //   username: "Krishan",
  // };
  const user = null;
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
            <button className={classes.navButton}>Register</button>
            <button className={classes.navButton}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};
