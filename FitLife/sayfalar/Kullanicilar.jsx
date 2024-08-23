import React, { useEffect, useState } from "react";
import Navbar2Admin from "../components/Navbar2Admin";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

import { db, firebaseConfig, auth, insert } from "../config/firebase";

function Kullanicilar() {
  const [danisanlar, setDanisanlar] = useState([]);
  const [Antrenorler, setAntrenorler] = useState([]);
  const [Adminler, setAdminler] = useState([]);
  useEffect(() => {
    async function quickstart() {
      const danisantemp = [];
      const antrenmantemp = [];
      const admintemp = [];
      const querySnapshot = await getDocs(collection(db, "Antrenor"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        antrenmantemp.push(doc.data());
      });
      const querySnapshot2 = await getDocs(collection(db, "Danisan"));
      querySnapshot2.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        danisantemp.push(doc.data());
      });
      const querySnapshot3 = await getDocs(collection(db, "Admin"));
      querySnapshot3.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        admintemp.push(doc.data());
      });

      setDanisanlar(danisantemp);
      setAdminler(admintemp);
      setAntrenorler(antrenmantemp);
    }
    quickstart();
  }, []);

  const yolla = (item) => {
    console.log("hello");
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(item));
  };
  const disable = (item) => {
    if (item.aktif == "true") {
      item.aktif = "false";
    } else {
      item.aktif = "true";
    }
    insert(item.rol, item);

    console.log("disabled");
    // admin.auth().updateUser(item.uıd, {
    //   disabled: true,
    // });

    setDanisanlar([...danisanlar]);
    setAntrenorler([...Antrenorler]);
    setAdminler([...Adminler]);

  };
  return (
    <div style={{ display: "flex" }}>
      <Navbar2Admin />
      <div style={{ display: "flex", flexWrap: "wrap", margin: 0 }}>
        {danisanlar.map((item) => (
          <div
            key={item.uıd}
            className="card"
            style={{ width: "200px", height: "200px", margin: 0 }}
          >
            <div className="card-body">
              <h6 className="card-title">
                {item.ad} {item.soyad}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">{item.rol}</h6>

              <a
                href="Danisan"
                onClick={() => yolla(item)}
                className="card-link"
              >
                Giriş yap
              </a>
              <div>
                <button
                  type="button"
                  className={item?.aktif ==="true" ? "btn btn-success" : "btn btn-danger"}  
                  onClick={() => disable(item)}
                >
                  {"Aktiflik Durumu"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Antrenorler.map((item2) => (
          <div
            key={item2.uıd}
            className="card"
            style={{ width: "200px", height: "200px", margin: 0 }}
          >
            <div className="card-body">
              <h6 className="card-title">
                {item2.ad} {item2.soyad}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">{item2.rol}</h6>

              <a
                href="Antrenor"
                onClick={() => yolla(item2)}
                className="card-link"
              >
                Giriş Yap
              </a>
              <div>
                <button
                  type="button"
                  className={item2?.aktif ==="true" ? "btn btn-success" : "btn btn-danger"}     
                  onClick={() => disable(item2)}
                >
                  {"Aktiflik Durumu"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Adminler.map((item3) => (
          <div
            key={item3.uıd}
            className="card"
            style={{ width: "200px", height: "200px", margin: 0 }}
          >
            <div className="card-body">
              <h6 className="card-title">
                {item3.ad} {item3.soyad}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">{item3.rol}</h6>

              <a
                href="Admin"
                onClick={() => yolla(item3)}
                className="card-link"
              >
                Giriş Yap
              </a>
              <div>
                <button
                  type="button"
                  className={item3?.aktif ==="true" ? "btn btn-success" : "btn btn-danger"}     
                  onClick={() => disable(item3)}
                >
                  {"Aktiflik Durumu"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Kullanicilar;
