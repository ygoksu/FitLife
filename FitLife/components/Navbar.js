import { signOut } from "firebase/auth";
import React, { Component } from "react";
import { auth } from "../config/firebase";

const Navbar = () => {

  let data = JSON.parse(localStorage.getItem("dataAdmin"));

  const cikisFonk = async () => {
    alert("Çıkış yapılıyor ...");

    localStorage.clear();

    await signOut(auth);
    window.location = "/";
  };

  const geriDon = async () => {
    alert("Geri dönülüyor ...");

    window.location = "/Admin";
  };

  return (
    <div style={{ backgroundColor: " #2596be" }}>
      <div style={{ textAlign: "left" }}> FITNESS </div>
      <div style={{ textAlign: "right" }}>
        <span  onClick={cikisFonk}>
        {" "}
        ÇIKIŞ YAP{" "}
        </span>
        
      </div>
      <div style={{ textAlign: "left" }}>
        <span  onClick={geriDon}>
        {data?.rol ? "Geri Dön" : ""}
        </span>
        
      </div>
    </div>
  );
};

export default Navbar