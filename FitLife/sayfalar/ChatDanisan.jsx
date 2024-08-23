import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../sayfalar/profile";
import NavbarDanisan from "../components/NavbarDanisan";
import { vericek, insert2 } from "../config/firebase";

const ChatDanisan = () => {

    let data = JSON.parse(localStorage.getItem("data"));
    const [authData, setAuthData] = useState({ uıd: data.uıd, ad: data.ad, soyad: data.soyad, cinsiyet: data.cinsiyet, dogumtarihi: data.dogumtarihi, email: data.email, rol: data.rol, telno: data.telno, sifre: data.sifre, fotoyol: data.fotoyol, kas: data.kas, kilo: data.kilo, kitleindeks: data.kitleindeks, yag: data.yag, boy: data.boy });
    const [kid, setKid] = useState();
    const [yeniMesaj, setYeniMesaj] = useState('');

    const [mesajverileri, setmesajverileri] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from the database

            const a = await vericek("KullaniciAntrenor");
            const b = a.filter((item) => item.kid == authData.uıd);
            console.log(b);
            console.log(authData.uıd);
            if (b.length > 0) {
                const c = b[0].aid;
                setKid(c);
                console.log("Kid Değeri:", c);
            } else {
                console.log("Aid değeri 0 olan öğe bulunamadı.");
            }

            const kullaniciMesajVeri = await vericek('Mesajlasma');
            console.log(kullaniciMesajVeri);
            const kullaniciMesajVeriFilter = kullaniciMesajVeri.filter((item) => item.gonderici == authData.uıd || item.alici ==authData.uıd);
            console.log(kullaniciMesajVeriFilter)
            const sonveri = kullaniciMesajVeriFilter.sort((a, b) => {
                const dateA = new Date(a.zaman.seconds * 1000);
                const dateB = new Date(b.zaman.seconds * 1000);
                return dateA - dateB;
            });


            setmesajverileri(sonveri);
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const handleMesajGonder = async () => {
        if (yeniMesaj.trim() !== '') {
            // Yeni mesajı Firestore'a ekleyin
            await insert2("Mesajlasma", {
                alici: kid,
                gonderici: authData.uıd,
                mesaj: yeniMesaj,
                zaman: new Date(),
            })

            // Yeni mesajı ekledikten sonra tekrar veriyi çekin ve güncelleyin
            const kullaniciMesajVeri = await vericek('Mesajlasma');
            const kullaniciMesajVeriFilter = kullaniciMesajVeri.filter((item) => item.gonderici == authData.uıd || item.alici ==authData.uıd);
            const sonveri = kullaniciMesajVeriFilter.sort((a, b) => {
                const dateA = new Date(a.zaman.seconds * 1000);
                const dateB = new Date(b.zaman.seconds * 1000);
                return dateA - dateB;
            });
            setmesajverileri(sonveri);
            setYeniMesaj('');
        }
    };


    return (
        <div>
            <div style={{ display: "flex" }}>
                <NavbarDanisan/>
                {/* ... (Diğer JSX kodları buraya ekleyin) */}
                <div
                    className="row justify-content-center align-items-center"
                    style={{ height: "80vh", marginLeft: "300px" }}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h2> Sohbet Ekranı </h2>
                        <div className="card" style={{ width: "400px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff", marginBottom: "30px" }}>

                            <div>


                                {mesajverileri.map((mesaj, index) => (

                                    <div key={index} className="card" style={{ width: "250px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff", marginBottom: "30px",
                                    marginLeft: mesaj.gonderici === authData.uıd ? "auto" : "0",
                                    marginRight: mesaj.gonderici === authData.uıd ? "0" : "auto",
                                    backgroundColor: mesaj.gonderici === authData.uıd ? "lightgreen" : "white",
                                     }}>
                                        {mesaj.mesaj}   </div>


                                ))}



                                {/* Yeni mesaj girişi */}
                                <input
                                 className="form-control"
                                    type="text"
                                    value={yeniMesaj}
                                    onChange={(e) => setYeniMesaj(e.target.value)}
                                />
                               <div type="button" onClick={handleMesajGonder} className="btn btn-success" style={{width:"100%"}}>
                                Mesaj Gönder
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </div>
    );
};

export default ChatDanisan;
