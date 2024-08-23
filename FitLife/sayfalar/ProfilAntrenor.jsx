import React, { Component, useEffect, useState } from "react";
import { db, firebaseConfig, storage } from "../config/firebase";
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
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import NavbarAntrenor from "../components/NavbarAntrenor";

const ProfilAntrenor = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [foto, setFoto] = useState(null);
  const [bar, setBar] = useState(false); //yüklenme yazısını gösteren değişken

  let [authData, setAuthData] = useState({
    uıd: "",
    ad: "",
    soyad: "",
    cinsiyet: "Kadın",
    dogumtarihi: "",
    fotoyol: "",
    email: "",
    rol: "",
    telno: "",
    sifre: "",
  });
  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
    console.log(data);
  };
  useEffect(() => {
    setAuthData(data);
    const app = initializeApp(firebaseConfig);
    if (data.fotoyol != "") {
      const storage = getStorage(app);

      const photoRef = ref(storage, `files/${data.fotoyol}`);
      getDownloadURL(photoRef).then((url) => {
        setFoto(url);
      });
    }
  }, []);

  const dbupdate = async () => {
    const dbRef = doc(db, data.rol, data.uıd);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(authData));
    await updateDoc(dbRef, authData);
  };

  function fotoupload(e) {
    authData.fotoyol = e.target.files[0].name;

    setFoto(URL.createObjectURL(e.target.files[0]));
    //console.log(foto);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    console.log(file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <NavbarAntrenor />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1500px",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <img src={foto} style={{ width: "150px", height: "200px" }} />
          <h5>
            {bar ? "" : "Yükleme barı:"}{" "}
            {!imgUrl && (
              <div className="outerbar">
                <div
                  className="innerbar"
                  style={{ width: `${progresspercent}%` }}
                >
                  {progresspercent}%
                </div>
              </div>
            )}
          </h5>
          <form onSubmit={handleSubmit} className="form">
            <input type="file" onChange={fotoupload} />
            <button
              type="submit"
              onClick={() => setBar(!bar)}
              className="btn btn-primary"
            >
              Yükle
            </button>
          </form>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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
              placeholder="Şifrenizi giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
            <span
              className="input-group-text"
              id="addon-wrapping"
              style={{ width: "170px" }}
            >
              E-Mail:
            </span>

            <input
              name="email"
              value={authData.email}
              onChange={onChangeFunc}
              type="email"
              className="form-control"
              placeholder="E-mail giriniz"
            />
          </div>

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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

          <div className="input-group-prepend" style={{ marginBottom: "2px" }}>
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
          <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
          <span className="input-group-text" id="addon-wrapping" style={{ width: '170px' }}>
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


      <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
          <span className="input-group-text" id="addon-wrapping" style={{ width: '125px' }} >
              Kilo Aldırma:
          </span>

          <select name="kiloaldirma" style={{ width: '300px' }} value={authData.kiloaldirma} onChange={onChangeFunc}>
              <option value = {true} >Var</option>
              <option value= {false} >Yok</option>
          </select>

      </div>


      <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
          <span className="input-group-text" id="addon-wrapping" style={{ width: '125px' }} >
              Kilo Verdirme:
          </span>

          <select name="kiloverdirme" style={{ width: '300px' }} value={authData.kiloverdirme} onChange={onChangeFunc}>
              <option value = {true} >Var</option>
              <option value= {false} >Yok</option>
          </select>

      </div>

      <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
          <span className="input-group-text" id="addon-wrapping" style={{ width: '125px' }} >
              Kilo Koruma:
          </span>

          <select name="kilokoruma" style={{ width: '300px' }} value={authData.kilokoruma} onChange={onChangeFunc}>
              <option value = {true} >Var</option>
              <option value= {false} >Yok</option>
          </select>

      </div>

      <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
          <span className="input-group-text" id="addon-wrapping" style={{ width: '125px' }} >
              Kas Kazanma:
          </span>

          <select name="kaskazanma" style={{ width: '300px' }} value={authData.kaskazanma} onChange={onChangeFunc}>
              <option value = {true} >Var</option>
              <option value= {false} >Yok</option>
          </select>

      </div>



          <div type="button" onClick={dbupdate} className="btn btn-success">
            Güncellemeleri Kaydet
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilAntrenor;
