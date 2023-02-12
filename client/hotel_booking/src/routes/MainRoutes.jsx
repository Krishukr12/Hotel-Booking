import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home.jsx";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
};
