import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../sayfalar/profile";
import NavbarDanisan from "../components/NavbarDanisan";

const Danisan = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <NavbarDanisan />

        <div>  
        Danışan girişi yapıldı...
        </div>

      </div>
    </div>
  );
};

export default Danisan;
