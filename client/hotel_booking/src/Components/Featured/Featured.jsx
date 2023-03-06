import React from "react";
import classes from "./Featured.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@chakra-ui/react";

export const Featured = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const city = ["delhi", "mumbai", "noida"];
  const cityImgs = [
    "https://media-cdn.tripadvisor.com/media/photo-s/23/b5/5f/31/facade.jpg",
    "https://theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/a918a09c291e11e5b5850022195573b9.jfif",
  ];
  useEffect(() => {
    setLoading(true);
    getPropertiesCountByCity(city);
  }, []);

  //? : Function to get properties count by city
  const getPropertiesCountByCity = async (...city) => {
    try {
      const res = await axios.get(
        `https://hotel-f7gz.onrender.com/hotels/find/countByCity/?cities=${city}`
      );
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className={classes.featured}>
      <>
        {city.map((item, index) => (
          <div className={classes.featuredItem}>
            <Skeleton className={classes.featuredImg} isLoaded={!loading}>
              <img
                src={cityImgs[index]}
                alt="Mumbai"
                className={classes.featuredImg}
              />
            </Skeleton>
            <Skeleton isLoaded={!loading} className={classes.sk}>
              <div className={classes.featuredTitles}>
                <h1>{city[index]}</h1>
                <h2>{data[index]} properties</h2>
              </div>
            </Skeleton>
          </div>
        ))}
      </>
    </div>
  );
};
