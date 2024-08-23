import React, { Component, useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import Navbar2 from "../components/Navbar2";
import { db, firebaseConfig, storage } from "../config/firebase";
import NavbarAntrenor from "../components/NavbarAntrenor";
const Antrenman = () => {
  let item = JSON.parse(localStorage.getItem("item"));

  let [authData, setAuthData] = useState({
    ad: "",
    hedef: "kiloverdirme",
    baslangictarihi: "",
    set: "",
    sure: "",
    kid: item.uıd,
    tekrar: "",
    videourl: "",
  });

  useEffect(() => {
    async function fetchData() {
      //antrenmanprogrami tablosuna geçiş
      const querySnapshot = await getDocs(collection(db, "AntrenmanProgrami"));

      querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());

        if (doc.data().kid == item.uıd) {
          var tarih;
          if (doc.data().baslangictarihi instanceof Timestamp) {
            // Baslangic tarihi bir Timestamp nesnesidir
            tarih = doc.data().baslangictarihi.toDate();
            const id = item.uıd;
            setAuthData((prevData) => ({
              ...prevData,
              baslangictarihi: tarih.toISOString().split("T")[0],
              kid: id,
              ...doc.data(), // diğer verileri de ekliyoruz
            }));
          } else {
            const id = item.uıd;
            setAuthData((prevData) => ({
              ...prevData,
              kid: id,
              ...doc.data(), // diğer verileri de ekliyoruz
            }));
          }
        }
      });
    }

    fetchData();
  }, []);

  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const dbupdate = async () => {
     const db =  getFirestore(); // Firestore veritabanını alalım
  await  setAuthData((prevData) => ({
      ...prevData,
      kid: item.uıd,
    }));
    const dbRef = doc(db, "AntrenmanProgrami", item.uıd); // Belge referansını oluşturalım
    // Bu referans, AntrenmanProgrami koleksiyonundaki authData.kid belgesine işaret eder
    await setDoc(dbRef, authData); // Belgeyi güncelleyelim
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <NavbarAntrenor />
      <div  style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,  // Take up all available horizontal space
        gap: "10px",
      }}>
      
      
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#00bf00" }}
      >
        <div
          className="card"
          style={{ width: "400px", backgroundColor: "#bfbfbf" }}
        >
          <h2 style={{ textAlign: "center" }}>Antrenman Programı</h2>

          <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Program Adı
            </span>

            <input
              name="ad"
              value={authData.ad}
              onChange={onChangeFunc}
              type="text"
              className="form-control "
              placeholder="Program adı giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Başlangıç Tarihi:
            </span>

            <input
              name="baslangictarihi"
              value={authData.baslangictarihi}
              onChange={onChangeFunc}
              type="Date"
              className="form-control"
              placeholder="Başlangıç tarihi giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "10px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "125px" }}
            >
              Hedef:
            </span>

            <select
              name="hedef"
              style={{ width: "300px" }}
              value={authData.hedef}
              onChange={onChangeFunc}
            >
              <option value="kilo verdirme">Kilo Verme</option>
              <option value="kilo aldirma">Kilo Alma</option>
              <option value="kilo koruma">Kilo Koruma</option>
              <option value="kas kazanma">Kas Kazanma</option>
            </select>
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Set Sayısı:
            </span>

            <input
              name="set"
              value={authData.set}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Set Sayısı Giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Süre:
            </span>

            <input
              name="sure"
              value={authData.sure}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Set süresi giriniz"
            />
          </div>
          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Antrenman Video url:
            </span>

            <input
              name="videourl"
              value={authData.videourl}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Antrenman video urlsini giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Tekrar Sayısı:
            </span>

            <input
              name="tekrar"
              value={authData.tekrar}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Tekrar sayısı giriniz"
            />
          </div>
          <div type="button" onClick={dbupdate} className="btn btn-success">
            Güncellemeleri Kaydet
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Antrenman;
