import React from "react";
import classes from "./Featured.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const Featured = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    getPropertiesCountByCity();
  }, []);

  //? : Function to get properties count by city
  const getPropertiesCountByCity = async () => {
    try {
      const res = await axios.get(
        "https://hotel-f7gz.onrender.com/hotels/find/countByCity/?cities=mumbai,delhi,noida"
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
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className={classes.featuredItem}>
            <img
              src="https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.jpg?s=612x612&w=0&k=20&c=L1LJVrYMS8kj2rJKlQMcUR88vYoAZeWbYIGkcTo6QV0="
              alt="Mumbai"
              className={classes.featuredImg}
            />
            <div className={classes.featuredTitles}>
              <h1>Mumbai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className={classes.featuredItem}>
            <img
              src="https://static.toiimg.com/photo/msid-24245804,width-96,height-65.cms"
              alt="Delhi"
              className={classes.featuredImg}
            />
            <div className={classes.featuredTitles}>
              <h1>Delhi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className={classes.featuredItem}>
            <img
              src="https://thumbs.dreamstime.com/b/cityscape-skyscrapers-smaller-apartment-water-tower-temple-other-items-typical-indian-city-like-noida-gurgaon-delhi-114973441.jpg"
              alt="Noida"
              className={classes.featuredImg}
            />
            <div className={classes.featuredTitles}>
              <h1>Noida</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
