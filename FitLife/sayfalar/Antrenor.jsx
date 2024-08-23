import React, { Component, useEffect, useState } from "react";
import { db, firebaseConfig, storage } from "../config/firebase";
import {
  query,
  where,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../components/accordion.css";
import Navbar2 from "../components/Navbar2";
import Antrenman from "./Antrenman";
import NavbarAntrenor from "../components/NavbarAntrenor";
import { vericek } from "../config/firebase";
const Antrenor = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  //useeffect çakması bi şey yapıyoz

  let [OgrenciId, setOgrenciId] = useState([]);
  var [OgrenciBilgi, setOgrenciBilgi] = useState([]);
  var [AntrenmanProgrami, setAntrenmanProgrami] = useState([]);
  const ogrencibilgileri = [];
  const Antrenmanbilgileri = [];
  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "KullaniciAntrenor"),
        where("aid", "==", data.uıd)
      );
      const querySnapshot = await getDocs(q);
      const ogrenciler = [];
      querySnapshot.forEach((doc) => {
        ogrenciler.push(doc.data());
      });

      setOgrenciId(ogrenciler); //kalsın
      //
      const querySnapshot2 = await getDocs(collection(db, "AntrenmanProgrami"));

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        for (var i = 0; i < ogrenciler.length; i++) {
          if (ogrenciler[i].kid == doc.data().kid)
            Antrenmanbilgileri.push(doc.data());
        }
      });
      setAntrenmanProgrami(Antrenmanbilgileri);

      //
      const ogrenciBilgileri = await Promise.all(
        ogrenciler.map(async (ogrenci) => {
          const docRef = doc(db, "Danisan", ogrenci.kid);
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        })
      );

      setOgrenciBilgi(ogrenciBilgileri);
    }

    fetchData();
  }, [data.uıd]);
  const [accordion, setActiveAccordion] = useState(-1);

  function toggleAccordion(index) {
    if (index === accordion) {
      setActiveAccordion(-1);
      return;
    }
    setActiveAccordion(index);
  }
  function YonlendirAnt(item) {
    localStorage.setItem("item", JSON.stringify(item));
    window.location.href = `/Antrenman`;
  }
  function YonlendirBes(item) {
    localStorage.setItem("item", JSON.stringify(item));
    window.location.href = `/Beslenme`;
  }

  const yonlendirgrafik = async (key, uid) => {
    const kullaniciDurumVeri = await vericek("KullaniciDurum");
    console.log(kullaniciDurumVeri);
    const kullaniciDurumVeriFilter = kullaniciDurumVeri.filter(
      (item) => item.uid == uid
    );
    const sonveri = kullaniciDurumVeriFilter.sort(
      (a, b) => new Date(a.tarih) - new Date(b.tarih)
    );

    localStorage.removeItem("grafikveri");

    localStorage.setItem("grafikveri", JSON.stringify(sonveri));
    window.location.href = key;
  };
  const yonlendirchat = async (uid) => {
    localStorage.setItem("gondericiid", JSON.stringify(data.uıd));
    localStorage.setItem("aliciid", JSON.stringify(uid));
    window.location.href = "ChatAntrenor";
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <NavbarAntrenor />
        <div className="container">
          <div>
            <h1>Sizden Eğitim Alan Kişiler</h1>
          </div>
          <div className="accordion__faq">
            {OgrenciBilgi.map((item, index) => (
              <div key={index}>
                <div className="accordion__faq-heading">
                  <h3 className={accordion === index ? "active" : ""}>
                    {item.ad} {item.soyad}{" "}
                    <div
                      type="button"
                      onClick={() => YonlendirAnt(item)}
                      className="btn btn-primary"
                    >
                      Antrenman Bilgilerine Bak
                    </div>
                    <div
                      type="button"
                      onClick={() => YonlendirBes(item)}
                      className="btn btn-warning"
                    >
                      Beslenme Bilgilerine Bak
                    </div>
                  </h3>
                  <div onClick={() => toggleAccordion(index)}>
                    {accordion === index ? (
                      <span className="verticle">△</span>
                    ) : (
                      <span className="horizental">▽</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className={accordion === index ? "active" : "inactive"}>
                    Cinsiyet : {item.cinsiyet} <br />
                    Doğum Tarihi : {item.dogumtarihi}
                    <br />
                    Telefon Numarası : {item.telno} <br />
                    Boy : {item.boy} <br />
                    Kilo : {item.kilo} <br />
                    Kas Kütlesi : {item.kas} <br />
                    Yağ Oranı : {item.yag} <br />
                    Kitle Indeksi: {item.kitleindeks}
                  </p>
                  <div className={accordion === index ? "active" : "inactive"}>
                    <div
                      type="button"
                      onClick={() => yonlendirgrafik("GrafikBoy", item.uıd)}
                      className="btn btn-success"
                      style={{ marginBottom: "30px", width: "100%" }}
                    >
                      Boy Tablosu
                    </div>

                    <div
                      type="button"
                      onClick={() => yonlendirgrafik("GrafikKilo", item.uıd)}
                      className="btn btn-success"
                      style={{ marginBottom: "30px", width: "100%" }}
                    >
                      Kilo Tablosu
                    </div>

                    <div
                      type="button"
                      onClick={() => yonlendirgrafik("GrafikKas", item.uıd)}
                      className="btn btn-success"
                      style={{ marginBottom: "30px", width: "100%" }}
                    >
                      Kas Kütlesi
                    </div>

                    <div
                      type="button"
                      onClick={() => yonlendirgrafik("GrafikYag", item.uıd)}
                      className="btn btn-success"
                      style={{ marginBottom: "30px", width: "100%" }}
                    >
                      Yag Oranı
                    </div>

                    <div
                      type="button"
                      onClick={() =>
                        yonlendirgrafik("GrafikKitleIndeks", item.uıd)
                      }
                      className="btn btn-success"
                      style={{ marginBottom: "30px", width: "100%" }}
                    >
                      Kitle İndeksi
                    </div>
                    <div
                      type="button"
                      onClick={() => yonlendirchat(item.uıd)}
                      className="btn btn-success"
                      style={{ marginBottom: "30px", width: "100%" }}
                    >
                      Chat
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Antrenor;
