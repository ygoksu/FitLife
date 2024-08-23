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
import { useNavigate } from 'react-router-dom';
import "../components/accordion.css";
import Navbar2 from "../components/Navbar2";
import Antrenman from "./Antrenman";
import Navbar2AdminAll from "../components/Navbar2AdminAll";
const Antrenor2 = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  // let docRef = doc(db, "Danisan", uid);
  //let docSnap = await getDoc(docRef);

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
        for(var i =0;i<ogrenciler.length;i++)
        {
          if(ogrenciler[i].kid == doc.data().kid)
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
  function YonlendirAnt(item)
  {
    localStorage.setItem('item', JSON.stringify(item));
    window.location.href=`/Antrenman2`;
  }
  function YonlendirBes(item)
  {
    
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Navbar2AdminAll />
        <div className="container">
        <div>
         
          <h1>Let's answer some of your questions</h1>
        </div>
        <div className="accordion__faq">
          {OgrenciBilgi.map((item, index) => (
            
            <div key={index} >
              <div className="accordion__faq-heading">
                <h3 className={accordion === index ? "active" : ""}>
                  {item.ad} {item.soyad} {" "} 
                  <div  type="button" onClick={()=>YonlendirAnt(item)} className="btn btn-primary">Antrenman Bilgilerine Bak</div>
                  <div  type="button" onClick={()=>YonlendirBes(item)} className="btn btn-warning">Beslenme Bilgilerine Bak</div>
                </h3 >
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
                  Doğum Tarihi : {item.dogumtarihi}<br />
                  Telefon Numarası : {item.telno} <br />
                  Boy : {item.boy} <br />
                  Kilo : {item.kilo} <br />
                  Kas Kütlesi : {item.kas} <br />
                  Yağ Oranı : {item.yag} <br />
                  Kitle Indeksi: {item.kitleindeks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Antrenor2;
