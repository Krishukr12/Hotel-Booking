import { ClassNames } from "@emotion/react";
import React from "react";
import classes from "./PropertyList.module.css";
import { useState, useEffect } from "react";
export const PropertyList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    // setLoading(true);
    callApi();
  }, []);

  const callApi = async () => {
    await fetch("https://hotel-f7gz.onrender.com/hotels/find/countByType", {
      method: "GET", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const images = [
    "https://media-cdn.tripadvisor.com/media/photo-s/22/25/ce/ea/kingsford-hotel-manila.jpg",
    "https://www.theparkhotels.com/images/site-specific/navi-mumbai/home/navi-mumbai-night-view.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZegWhBLSeqAeiyNGnFw317BvBPv2NvVIsHw&usqp=CAU",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  return (
    <div className={classes.pList}>
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className={classes.pListItem} key={i}>
                <img src={img} alt="" className={classes.pListImg} />
                <div className={classes.pListTitles}>
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
