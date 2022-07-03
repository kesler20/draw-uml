import React from "react";
import { Route, Routes } from "react-router-dom";
import Console from "../components/Console";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Console />} />
    </Routes>
  );
};

export default Pages;
