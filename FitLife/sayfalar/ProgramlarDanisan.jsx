import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../sayfalar/profile";
import NavbarDanisan from "../components/NavbarDanisan";
import { vericek } from "../config/firebase";

const ProgramlarDanisan = () => {

    let data = JSON.parse(localStorage.getItem("data"));
    const [antrenmanveri, setantrenmanveri] = useState({ ad: "", baslangictarihi: "", hedef: "", kid: "", set: "", sure: "", tekrar: "", videourl: "" })
    const [beslenmeveri, setbeslenmveri] = useState({ gunlukogun: "", hedef: "", id: "", kalorihedef: "",videourl:"" })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kullaniciDurumVeri = await vericek('AntrenmanProgrami');
                console.log(kullaniciDurumVeri);
                console.log(data.uıd);
                const kullaniciDurumVeriFilter = kullaniciDurumVeri.filter((item) => item.kid == data.uıd);
                console.log(kullaniciDurumVeriFilter);
    
                if (kullaniciDurumVeriFilter) {
                    setantrenmanveri({
                        ad: kullaniciDurumVeriFilter[0].ad,
                        baslangictarihi: kullaniciDurumVeriFilter[0].baslangictarihi,
                        hedef: kullaniciDurumVeriFilter[0].hedef,
                        kid: kullaniciDurumVeriFilter[0].kid,
                        set: kullaniciDurumVeriFilter[0].set,
                        sure: kullaniciDurumVeriFilter[0].sure,
                        tekrar: kullaniciDurumVeriFilter[0].tekrar,
                        videourl : kullaniciDurumVeriFilter[0].videourl
                    });
    
    
                }
            } catch (error) {
                return;
            }
            // Fetch data from the database
          

            // kullaniciDurumVeriFilter tek bir veri gönderiyor. Bunu antrenmarveriye atayıp divler içerisinde kullanmak istiyorum nasıl yapabilirim ?

        };

        const fetchData2 = async () => {
            try {
                const kullaniciDurumVeri = await vericek('BeslenmeProgrami');
                console.log(kullaniciDurumVeri);
                const kullaniciDurumVeriFilter = kullaniciDurumVeri.filter((item) => item.id == data.uıd);
                console.log(kullaniciDurumVeriFilter);
    
                if (kullaniciDurumVeriFilter) {
                    setbeslenmveri({
                        gunlukogun: kullaniciDurumVeriFilter[0].gunlukogun,
                        hedef: kullaniciDurumVeriFilter[0].hedef,
                        kalorihedef: kullaniciDurumVeriFilter[0].kalorihedef,
                        videourl: kullaniciDurumVeriFilter[0].videourl,
                    });
                    console.log(beslenmeveri);
                }
            } catch (error) {
                return;
            }
            // Fetch data from the database
          

            // kullaniciDurumVeriFilter tek bir veri gönderiyor. Bunu antrenmarveriye atayıp divler içerisinde kullanmak istiyorum nasıl yapabilirim ?

        };

        // Call the fetchData function when the component mounts
        fetchData();
        fetchData2();
    }, []);




    const AntrenmanVideoYonlendir = async () => {
        window.open(antrenmanveri.videourl, '_blank');
    };

    const BeslenmeVideoYonlendir = async () => {
        window.open(beslenmeveri.videourl, '_blank');

    };

    return (
        <div>
            <div div style={{ display: "flex" }}>
                <NavbarDanisan />



                <div
                    className="row justify-content-center align-items-center"
                    style={{ height: "60vh", marginLeft: "30px" }}
                >
                    <div style={{ display: "flex" }}>

                        <div className="card" style={{ width: "400px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff", marginBottom: "30px", marginRight: "150px" }}>
                            <h2> Antrenman Programı </h2>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🏋️
                                </span>
                                <h4> Antrenman Adı : {antrenmanveri.ad}</h4>
                            </div>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🏋️
                                </span>
                                <h4> Başlangıç Tarihi : {antrenmanveri.baslangictarihi}</h4>
                            </div>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🏋️
                                </span>
                                <h4> Hedef : {antrenmanveri.hedef}</h4>
                            </div>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🏋️
                                </span>
                                <h4> Set Sayısı : {antrenmanveri.set}</h4>
                            </div>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🏋️
                                </span>
                                <h4> Süre : {antrenmanveri.sure}</h4>
                            </div>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🏋️
                                </span>
                                <h4> Tekrar : {antrenmanveri.tekrar}</h4>
                            </div>

                            <div type="button" onClick={AntrenmanVideoYonlendir} className="btn btn-success">
                                Antrenman Videosu
                            </div>
                        </div>

                        <div className="card" style={{ width: "400px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff", marginBottom: "30px" }}>
                            <h2> Beslenme Programı </h2>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🍗
                                </span>
                                <h4> Hedef : {beslenmeveri.hedef}</h4>
                            </div>

                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🥦
                                </span>
                                <h4> Kalori Hedefi: {beslenmeveri.kalorihedef}</h4>
                            </div>

                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "15px" }}>
                                    🥗
                                </span>
                                <h4> Günlük Öğün : {beslenmeveri.gunlukogun}</h4>
                            </div>

                            <div className="mt-auto">
                                <div type="button" onClick={BeslenmeVideoYonlendir} className="btn btn-success"  style={{ width: "100%" }}>
                                    Beslenme Videosu
                                </div>
                            </div>
                            

                        </div>


                    </div>

                </div>

            </div>

        </div>

    );
};

export default ProgramlarDanisan;
