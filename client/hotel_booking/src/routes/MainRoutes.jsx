import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home.jsx";
import { Allhotels } from "../Pages/All hotels/Allhotels.jsx";
import { BookingPage } from "../Pages/Booking/BookingPage.jsx";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/hotels" element={<Allhotels />}></Route>
        <Route path="/hotels/:id" element={<BookingPage />}></Route>
      </Routes>
    </>
  );
};
