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
                src="https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.jpg?s=612x612&w=0&k=20&c=L1LJVrYMS8kj2rJKlQMcUR88vYoAZeWbYIGkcTo6QV0="
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
