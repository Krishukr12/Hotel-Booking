import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import classes from "./Home.module.css";
import { Featured } from "../../Components/Featured/Featured.jsx";
import { PropertyList } from "../../Components/PropertyList/PropertyList";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={classes.homeContainer}>
        <Featured />
        <h1 className={classes.homeTitle}>Browse by property type</h1>
        <PropertyList />
      </div>
    </div>
  );
};
