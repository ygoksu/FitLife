import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { Component, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import Danisan from "./Danisan";

const Main = () => {
  const navigate = useNavigate();
  //const [girisYap, setGirisYap] = useState(false);
  //const [sifremiunuttum, setSifremiUnuttum] = useState(true);
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const paneleyonlendir = async (uid) => {
    /*const querySnapshot = await getDocs(collection(db, "kullanici"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.ad);
    });*/
    let docRef = doc(db, "Danisan", uid);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Belge verisi:", docSnap.data());
      //localStorage.setItem('data', docSnap.data());
      localStorage.setItem("data", JSON.stringify(docSnap.data()));
      console.log(docSnap.data().rol);
      if (docSnap.data().aktif == "true") {
        console.log("Başarıyla Danisan Girişi yapıldı!");
        window.location = "/HomeDanisan";
      } else {
        alert("Kullanıcı admin tarafından banlanmıştır.");
        window.location = "/";
      }
    } else {
      //console.log("Belge bulunamadı!");
      docRef = doc(db, "Antrenor", uid);
      docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Belge verisi:", docSnap.data());
        //localStorage.setItem('data', docSnap.data());
        localStorage.setItem("data", JSON.stringify(docSnap.data()));
        console.log(docSnap.data().rol);

        if (docSnap.data().aktif == "true") {
          console.log("Başarıyla Antrenor Girişi yapıldı!");
          window.location = "/Antrenor";
        } else {
          alert("Kullanıcı admin tarafından banlanmıştır.");
          window.location = "/";

        }
      } else {
        docRef = doc(db, "Admin", uid);
        docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          localStorage.setItem("dataAdmin", JSON.stringify(docSnap.data()));
          console.log(docSnap.data().rol);
          if (docSnap.data().aktif == "true") {
            console.log("Başarıyla admin Girişi yapıldı!");
            window.location = "/Admin";
          } else {
            alert("Kullanıcı admin tarafından banlanmıştır.");
            window.location = "/";
          }
          
          
        }
      }
    }
  };

  const authFunc = async () => {
    signInWithEmailAndPassword(auth, authData.email, authData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log("Başarıyla Giriş yapıldı!");

          paneleyonlendir(user.uid);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const yonlendirsifremiunuttum = async () => {
    window.location = "/SifremiUnuttum";
  };

  const yonlendirkayitol = () => {
    // '/hedef-sayfa' yoluna yönlendir
    navigate("KayıtOl");
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ width: "400px" }}>
        <h2>Giriş yap</h2>
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>

          <input
            name="email"
            value={authData.email}
            onChange={onChangeFunc}
            type="email"
            className="form-control "
            placeholder="Email"
          />
        </div>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-key"
              viewBox="0 0 16 16"
            >
              <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"></path>
              <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
          </span>
          <input
            name="password"
            value={authData.password}
            onChange={onChangeFunc}
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <p>
          <span onClick={yonlendirsifremiunuttum}>Şifremi Unuttum</span>
        </p>
        <p style={{ textAlign: "right" }}>
          <span onClick={yonlendirkayitol}>Kayıt Ol</span>
        </p>
        <div type="button" onClick={authFunc} className="btn btn-success">
          Giriş Yap
        </div>
      </div>
    </div>
  );
};
export default Main;
