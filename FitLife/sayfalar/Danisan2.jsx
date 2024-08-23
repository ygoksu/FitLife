import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../sayfalar/profile";
import Navbar2AdminAll from "../components/Navbar2AdminAll";

const Danisan2 = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Navbar2AdminAll />

        <div>  
        hello
        Giriş yaptın kanks
        </div>

      </div>
    </div>
  );
};

export default Danisan2;
