import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Reserve.module.css";
import { useSelector } from "react-redux";
const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://hotel-f7gz.onrender.com/hotels/room/${hotelId}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //   const { data, loading, error } = useFetch(
  //     `http://localhost:8080/hotels/room/${hotelId}`
  //   );
  //   const { dates } = useContext(SearchContext);
  const { dates } = useSelector((state) => state.searchedInitialState);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://hotel-f7gz.onrender.com/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className={classes.reserve}>
      <div className={classes.rContainer}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={classes.rClose}
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className={classes.rItem} key={item._id}>
            <div className={classes.rItemInfo}>
              <div className={classes.rTitle}>{item.title}</div>
              <div className={classes.rDesc}>{item.desc}</div>
              <div className={classes.rMax}>
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className={classes.rPrice}>{item.price}</div>
            </div>
            <div className={classes.rSelectRooms}>
              {item.roomNumbers.map((roomNumber) => (
                <div className={classes.room}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className={classes.rButton}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
