import React, { Component, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { addProduct, ekle, insert } from "../config/firebase";

const AntrenorOzellik = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  let dataAdmin = JSON.parse(localStorage.getItem("dataAdmin"));

  const [authData, setAuthData] = useState({
    uıd: data.uıd,
    ad: data.ad,
    soyad: data.soyad,
    cinsiyet: data.cinsiyet,
    dogumtarihi: data.dogumtarihi,
    email: data.email,
    rol: data.rol,
    telno: data.telno,
    sifre: data.sifre,
    deneyim: "",
    kiloaldirma: "true",
    kiloverdirme: "true",
    kilokoruma: "true",
    kaskazanma: "true",
    fotoyol: "",
    kontenjan: 5,
    aktif: "true"
  });
  let uıd = "";
  let key = "";

  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const yonlendirantrenor = async () => {
    //localStorage.setItem("data",JSON.stringify(authData));
    if(dataAdmin?.rol)
    {
      alert("Geri dönülüyor ...");
      localStorage.removeItem("data");
      console.log(authData);
  
      insert("Antrenor", authData);
      setTimeout(() => {
        window.location = "/Admin";
      }, 1000);
    }
    else{
        localStorage.removeItem("data");
    console.log(authData);

    insert("Antrenor", authData);

    setTimeout(() => {
        window.location = "/";
      }, 1000);
    }
  
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#00bf00" }}
    >
      <div
        className="card"
        style={{ width: "400px", backgroundColor: "#bfbfbf" }}
      >
        <h2 style={{ textAlign: "center" }}>Kayıt Ol</h2>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Deneyim:
          </span>

          <input
            name="deneyim"
            value={authData.deneyim}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder="Deneyimlerinizi Yazınız"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "125px" }}
          >
            Kilo Aldırma:
          </span>

          <select
            name="kiloaldirma"
            style={{ width: "300px" }}
            value={authData.kiloaldirma}
            onChange={onChangeFunc}
          >
            <option value={"true"}>Var</option>
            <option value={"false"}>Yok</option>
          </select>
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "125px" }}
          >
            Kilo Verdirme:
          </span>

          <select
            name="kiloverdirme"
            style={{ width: "300px" }}
            value={authData.kiloverdirme}
            onChange={onChangeFunc}
          >
            <option value={"true"}>Var</option>
            <option value={"false"}>Yok</option>
          </select>
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "125px" }}
          >
            Kilo Koruma:
          </span>

          <select
            name="kilokoruma"
            style={{ width: "300px" }}
            value={authData.kilokoruma}
            onChange={onChangeFunc}
          >
            <option value={"true"}>Var</option>
            <option value={"false"}>Yok</option>
          </select>
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "125px" }}
          >
            Kas Kazanma:
          </span>

          <select
            name="kaskazanma"
            style={{ width: "300px" }}
            value={authData.kaskazanma}
            onChange={onChangeFunc}
          >
            <option value={"true"}>Var</option>
            <option value={"false"}>Yok</option>
          </select>
        </div>

        <div
          type="button"
          onClick={yonlendirantrenor}
          className="btn btn-success"
        >
          Kaydı Bitir
        </div>
      </div>
    </div>
  );
};

export default AntrenorOzellik;
