import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./HotelCard.module.css";
import { Skeleton } from "@chakra-ui/react";
export const HotelCard = ({ item, loading }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <div className={classes.searchItem}>
        <img src={item?.photos[0]} alt="" className={classes.siImg} />
        <div className={classes.siDesc}>
          <h1 className={classes.siTitle}>{item?.name}</h1>
          <span className={classes.siDistance}>
            {item?.distance}m from center
          </span>
          <span className={classes.siTaxiOp}>Free airport taxi</span>
          <span className={classes.siSubtitle}>
            Studio Apartment with Air conditioning
          </span>
          <span className={classes.siFeatures}>{item?.desc}</span>
          <span className={classes.siCancelOp}>Free cancellation </span>
          <span className={classes.siCancelOpSubtitle}>
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className={classes.siDetails}>
          {item?.rating && (
            <div className={classes.siRating}>
              <span>Excellent</span>
              <button>{item?.rating}</button>
            </div>
          )}
          <div className={classes.siDetailTexts}>
            <span className={classes.siPrice}>{item?.cheapestPrice} ₹</span>
            <span className={classes.siTaxOp}>Includes taxes and fees</span>
            <Link to={`/hotels/${item?._id}`}>
              <button className={classes.siCheckButton}>
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};
