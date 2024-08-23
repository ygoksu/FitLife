import React, { Component, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { addProduct, ekle, insert } from "../config/firebase";

const KayıtOl = () => {
  const [authData, setAuthData] = useState({
    uıd: "",
    ad: "",
    soyad: "",
    cinsiyet: "Kadın",
    dogumtarihi: "",
    email: "",
    rol: "Danisan",
    telno: "",
    sifre: "",
    fotoyol: "",
    aktif: "true",
  });
  let uıd = "";
  let key = "";

  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const dbinsert = async () => {
    createUserWithEmailAndPassword(auth, authData.email, authData.sifre)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          authData.uıd = user.uid;
          console.log(uıd);
          console.log(auth);

          console.log(auth.rol);

          //Burada bir değişkene ekleme yaptığım kişinin firebasedeki userıd sini atamak istiyorum nasıl yapabilirim ?

          if (authData.rol == "Danisan") {
            //insert("Danisan",authData);
            key = "DanisanOzellik";
          } else if (authData.rol == "Antrenor") {
            //insert("Antrenor",authData);
            key = "AntrenorOzellik";
          } else if (authData.rol == "Admin") {
            insert("Admin", authData);
            key = "";
          } else {
            console.log("Giriş yapılamadı");
          }

          localStorage.setItem("data", JSON.stringify(authData));

          setTimeout(() => {
            window.location = "/" + key;
          }, 1000);

          //console.log("Başarıyla kaydolundu!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
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
            AD:
          </span>

          <input
            name="ad"
            value={authData.ad}
            onChange={onChangeFunc}
            type="text"
            className="form-control "
            placeholder="Ad Girişi Yapınız"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Soyad:
          </span>

          <input
            name="soyad"
            value={authData.soyad}
            onChange={onChangeFunc}
            type="text"
            className="form-control"
            placeholder="Soyadınızı giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "125px" }}
          >
            Cinsiyet:
          </span>

          <select
            name="cinsiyet"
            style={{ width: "300px" }}
            value={authData.cinsiyet}
            onChange={onChangeFunc}
          >
            <option value="Kadın">Kadın</option>
            <option value="Erkek">Erkek</option>
          </select>
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Dogum Tarihi:
          </span>

          <input
            name="dogumtarihi"
            value={authData.dogumtarihi}
            onChange={onChangeFunc}
            type="date"
            className="form-control"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            E-Mail:
          </span>

          <input
            name="email"
            value={authData.eposta}
            onChange={onChangeFunc}
            type="email"
            className="form-control"
            placeholder="E-mail giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "127px" }}
          >
            Rol:
          </span>

          <select
            name="rol"
            style={{ width: "300px" }}
            value={authData.rol}
            onChange={onChangeFunc}
          >
            <option value="Danisan">Danisan</option>
            <option value="Antrenor">Antrenor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Telefon No:
          </span>

          <input
            name="telno"
            value={authData.telno}
            onChange={onChangeFunc}
            type="text"
            className="form-control"
            placeholder="Telefon Numarası Giriniz"
          />
        </div>

        <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
          <span
            className="input-group-text"
            id="addon-wrapping"
            style={{ width: "170px" }}
          >
            Şifre:
          </span>

          <input
            name="sifre"
            value={authData.sifre}
            onChange={onChangeFunc}
            type="password"
            className="form-control"
            placeholder="Şifrenizi giriniz"
          />
        </div>

        <div type="button" onClick={dbinsert} className="btn btn-success">
          Kayıt Ol
        </div>
      </div>
    </div>
  );
};

export default KayıtOl;
