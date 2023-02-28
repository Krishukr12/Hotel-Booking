import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import classes from "./BookingPage.module.css";
import Reserve from "../../Components/Reserve/Reserve";
import { useSelector } from "react-redux";
const BookingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // setLoading(true);
    callApi();
  }, []);

  const callApi = async () => {
    await fetch(`https://hotel-f7gz.onrender.com/hotels/${id}`, {
      method: "GET",
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

  const navigate = useNavigate();
  const user = "krishan";
  const { dates, options } = useSelector((state) => state.searchedInitialState);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className={classes.hotelContainer}>
          {open && (
            <div className={classes.slider}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={classes.close}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={classes.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={classes.sliderWrapper}>
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className={classes.sliderImg}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={classes.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className={classes.hotelWrapper}>
            <h1 className={classes.hotelTitle}>{data.name}</h1>
            <div className={classes.hotelAddress}>
              <FontAwesomeIcon
                className={classes.locationIcon}
                icon={faLocationDot}
              />
              <span>{data.address}</span>
            </div>
            <span className={classes.hotelDistance}>
              Excellent location – {data.distance} from center
            </span>
            <span className={classes.hotelPriceHighlight}>
              Book a stay over {data.cheapestPrice} ₹ at this property and get a
              free airport taxi
            </span>
            <div className={classes.hotelImages}>
              {data.photos?.map((photo, i) => (
                <div className={classes.hotelImgWrapper} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className={classes.hotelImg}
                  />
                </div>
              ))}
            </div>

            <div className={classes.hotelDetails}>
              <div className={classes.hotelDetailsTexts}>
                <h1 className={classes.hotelTitle}>{data.title}</h1>
                <p className={classes.hotelDesc}>{data.desc}</p>
              </div>
              <div className={classes.hotelDetailsPrice}>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of India, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>{days * data.cheapestPrice * options.room} ₹</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default BookingPage;
