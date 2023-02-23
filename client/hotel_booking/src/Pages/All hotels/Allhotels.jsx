import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { Navbar } from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { HotelCard } from "../../Components/Hotel Card/HotelCard";
import classes from "./Allhotels.module.css";
import { Button } from "@chakra-ui/react";

export const Allhotels = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const handleClick = () => {
    alert("clicked");
  };
  useEffect(() => {
    setLoading(true);
    callApi();
  }, []);

  const callApi = async () => {
    await fetch(
      `https://hotel-f7gz.onrender.com/hotels?city=${destination}&min=${
        min || 0
      }&max=${max || 9999}`,
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
    <div>
      <Navbar />
      <Header type="list" />
      <div className={classes.listContainer}>
        <div className={classes.listWrapper}>
          <div className={classes.listSearch}>
            <h1 className={classes.lsTitle}>Search</h1>
            <div className={classes.lsItem}>
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className={classes.lsItem}>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className={classes.lsItem}>
              <label>Options</label>
              <div className={classes.lsOptions}>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className={classes.lsOptionInput}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className={classes.lsOptionInput}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={classes.lsOptionInput}
                    placeholder={options.adult}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={classes.lsOptionInput}
                    placeholder={options.children}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={classes.lsOptionInput}
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleClick}>Search</Button>
          </div>
          <div className={classes.listResult}>
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <HotelCard item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
