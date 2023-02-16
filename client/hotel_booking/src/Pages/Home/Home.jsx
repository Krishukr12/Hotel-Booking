import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import classes from "./Home.module.css";
import { Featured } from "../../Components/Featured/Featured.jsx";
import { PropertyList } from "../../Components/PropertyList/PropertyList";
import { FeaturedProperties } from "../../Components/Featured Properties/FeaturedProperties";
import Footer from "../../Components/Footer/Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={classes.homeContainer}>
        <Featured />
        <h1 className={classes.homeTitle}>Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <Footer />
      </div>
    </div>
  );
};
