import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, insert, insert2 } from "../config/firebase";
import "../components/accordion.css";

const AntrenorSec = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  let dataAdmin = JSON.parse(localStorage.getItem("dataAdmin"));
  //localStorage.setItem("hedef",JSON.stringify("kaskazanma")) //kolaylık olsun diye
  let hedef = JSON.parse(localStorage.getItem("hedef"));
  console.log(hedef)
  const [antrenorler, setAntrenorler] = useState([]);
  const [accordion, setActiveAccordion] = useState(-1);
  let [birlestir, setBirlestir] = useState([]);

  const Sec = async (item) => {
    await setDoc(doc(db, "BeslenmeProgrami", data.uıd), {
      gunlukogun: "",
      hedef: hedef,
      id: data.uıd,
      kalorihedef: "",
      videourl: ""
    });
    await setDoc(doc(db, "AntrenmanProgrami", data.uıd), {
      ad: "",
      baslangictarihi: "",
      hedef: hedef,
      kid: data.uıd,
      set: "",
      sure: "",
      tekrar: "",
      videourl: ""
    });
    item.kontenjan -= 1;
   
    insert2("KullaniciAntrenor", { aid: item.uıd, kid: data.uıd });

    insert("Antrenor", item);
    localStorage.removeItem("data");
 if(dataAdmin?.rol)
    {
      window.location.href = `/Admin`;
    }
    else
    {
      window.location.href = `/`;

    }


  };
  function toggleAccordion(index) {
    if (index === accordion) {
      setActiveAccordion(-1);
      return;
    }
    setActiveAccordion(index);
  }

  useEffect(() => {
    async function quickstart() {
      const antrenortemp = [];
      const admintemp = [];
      const querySnapshot = await getDocs(collection(db, "Antrenor"));
      querySnapshot.forEach((doc) => {
        if (doc.data().kontenjan > 0) {
          if (
            (hedef == "kaskazanma" && doc.data().kaskazanma == "true") ||
            (hedef == "kiloverdirme" && doc.data().kiloverdirme == "true") ||
            (hedef == "kiloaldirma" && doc.data().kiloaldirma == "true") ||
            (hedef == "kilokoruma" && doc.data().kilokoruma == "true")
          ) {
            antrenortemp.push(doc.data());
          }
        }
      });

      setAntrenorler(antrenortemp);
    }
    quickstart();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="container">
          <div>
            <h1>Seçebileceğiniz Antrenörler</h1>
          </div>
          <div className="accordion__faq">
            {antrenorler.map((item, index) => (
              <div key={index}>
                <div className="accordion__faq-heading">
                  <h3 className={accordion === index ? "active" : ""}>
                    {item.ad} {item.soyad}{" "}
                    <div
                      type="button"
                      onClick={() => Sec(item)}
                      className="btn btn-primary"
                    >
                      Antrenörü Seç
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
                    Deneyimler : {item.deneyim} <br />
                    Doğum Tarihi : {item.dogumtarihi}
                    <br />
                    Telefon Numarası : {item.telno} <br />
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

export default AntrenorSec;
