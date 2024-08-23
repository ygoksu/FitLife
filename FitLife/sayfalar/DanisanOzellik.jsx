import React, { Component, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { addProduct, ekle, insert } from "../config/firebase";

const AntrenorOzellik = () => {
  let data = JSON.parse(localStorage.getItem("data"));

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
    fotoyol: "",
    kas: 0,
    kilo: 0,
    kitleindeks: 0,
    yag: 0,
    boy: 0,
    aktif: "true",
  });
const [hedef,setHedef] = useState();
  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const yonlendirdanisan = async () => {
    insert("Danisan", authData);

    localStorage.setItem("data",JSON.stringify(authData));
    localStorage.setItem("hedef",JSON.stringify(hedef));
    //localStorage.removeItem("data");

    setTimeout(() => {
      window.location = "/AntrenorSec";
    }, 1000);
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
            Kilo:
          </span>

          <input
            name="kilo"
            value={authData.kilo}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder="Kilonuzu Giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Boy:
          </span>

          <input
            name="boy"
            value={authData.boy}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder="Boyunuzu Giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Vücut Yağ Oranı:
          </span>

          <input
            name="yag"
            value={authData.yag}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder="Vücut Yağ Oranınızı Giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Kas Kütlesi:
          </span>

          <input
            name="kas"
            value={authData.kas}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder="Kas Kütlenizi Giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
        <span className="input-group-text" id="addon-wrapping" style={{ width: '125px' }} >
            Hedef:
        </span>

        <select name="hedef" style={{ width: '300px' }}  onChange={(e) => setHedef(e.target.value)}>
            <option value="kiloverdirme">Kilo Verdirme</option>
            <option value="kiloaldirma">Kilo Aldırma</option>
            <option value="kilokoruma">Kilo Koruma</option>
            <option value="kaskazanma">Kas Kazanma</option>
        </select>

    </div>


        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Vücut Kitle İndeksi:
          </span>

          <input
            name="kitleindeks"
            value={authData.kitleindeks}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder=" Vücut Kitle İndeksinizi Giriniz"
          />
        </div>

        <div
          type="button"
          onClick={yonlendirdanisan}
          className="btn btn-success"
        >
          Kaydı Bitir
        </div>
      </div>
    </div>
  );
};

export default AntrenorOzellik;
