import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    getFirestore
  } from "firebase/firestore";
  import { db, firebaseConfig, storage } from "../config/firebase";
import NavbarAntrenor from "../components/NavbarAntrenor";
const Beslenme = () => {
  let item = JSON.parse(localStorage.getItem("item"));

  let [authData, setAuthData] = useState({
    gunlukogun: "",
    hedef: "kiloverdirme",
    id: item.uıd,
    kalorihedef: "",
    videourl: "",
  });

  useEffect(() => {
    async function fetchData() {
      //beslenmeprogrami tablosuna geçiş
      const querySnapshot = await getDocs(collection(db, "BeslenmeProgrami"));

      querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());

        if (doc.data().id == item.uıd) {
          setAuthData(doc.data());
        }
      });
    }

    fetchData();
  }, []);

  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const dbupdate = async () => {
    const db = getFirestore(); 
    setAuthData((prevData) => ({
      ...prevData,
      id: item.uıd,
    }));
    const dbRef = doc(db, "BeslenmeProgrami", item.uıd); 
    await setDoc(dbRef, authData); 
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
        style={{ height: "100vh", backgroundColor: "#e21c47" }}
      >
        <div
          className="card"
          style={{ width: "400px", backgroundColor: "#bfbfbf" }}
        >
          <h2 style={{ textAlign: "center" }}>Beslenme Programı</h2>

     

        

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
              Günlük Öğün:
            </span>

            <input
              name="gunlukogun"
              value={authData.gunlukogun}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Günlük öğünü giriniz"
            />
          </div>
          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Beslenme video url:
            </span>

            <input
              name="videourl"
              value={authData.videourl}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Beslenme video urlsini giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              Kalori Hedefi:
            </span>

            <input
              name="kalorihedef"
              value={authData.kalorihedef}
              onChange={onChangeFunc}
              type="text"
              className="form-control"
              placeholder="Kalori hedefini giriniz"
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
export default Beslenme;