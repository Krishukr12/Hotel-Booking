import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import classes from "./Home.module.css";
import { Featured } from "../../Components/Featured/Featured.jsx";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={classes.homeContainer}>
        <Featured />
      </div>
    </div>
  );
};
