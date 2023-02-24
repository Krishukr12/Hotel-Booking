import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import classes from "./FeaturedProperties.module.css";

export const FeaturedProperties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const imgs = [
    "https://www.cabinhomes.com/uploads/hp-log-cabin.jpg",
    "https://media.architecturaldigest.com/photos/5679c9d6b313ecbd18113cbd/2:1/w_1024,h_512,c_limit/log-cabin-1.jpg",
    "https://rew-feed-images.global.ssl.fastly.net/trestle_rets_plus/_cloud_media/property/residential/1031758032-1-2da69525c293c454903d70ffbf98eb16-m.jpg",
    "https://www.lushome.com/wp-content/uploads/2013/10/forest-cottages-modern-houses-green-living-25.jpg",
  ];
  useEffect(() => {
    setLoading(true);
    callApi();
  }, []);

  const callApi = async () => {
    await fetch(
      "https://hotel-f7gz.onrender.com/hotels/?limit=4&featured=true",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={classes.fp}>
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item, index) => (
            <div className={classes.fpItem} key={item._id}>
              <img src={imgs[index]} alt="" className={classes.fpImg} />
              <span className={classes.fpName}>{item.name}</span>
              <span className={classes.fpCity}>{item.city}</span>
              <span className={classes.fpPrice}>
                Starting from {item.cheapestPrice} ₹
              </span>
              {item.rating && (
                <div className={classes.fpRating}>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
