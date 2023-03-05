import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { handleLoginOut } from "../../redux/action.js";
import { LOGOUT_REQUEST_SUCCESS } from "../../redux/actionType";
import { useCustomToast } from "../../hooks/useToast.js";

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //? : Custom Toast hook
  const { ShowCustomeToast } = useCustomToast();

  //? : Logging out handler with redux
  const handleLogout = async () => {
    const res = await handleLoginOut(dispatch);
    if (res.type === LOGOUT_REQUEST_SUCCESS) {
      localStorage.removeItem("user");
      ShowCustomeToast("Logout Success");
    }
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navContainer}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className={classes.logo}>kissubooking</span>
        </Link>
        {user ? (
          //? If user is logged in, show the user name with logout button
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="md"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.400" }}
            >
              {user.username}
            </MenuButton>
            <MenuList border={"none"} minWidth={"10px"} bg={"unset"}>
              <MenuItem
                transition={"all 400ms ease"}
                bg={"#1f1f38"}
                className={classes.lButton}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          //? : If user is not logged in show the login & register buttons
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
