import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../sayfalar/profile";
import Navbar2 from "../components/Navbar2";
import { vericek, insert2 } from "../config/firebase";
import NavbarAntrenor from "../components/NavbarAntrenor";

const ChatAntrenor = () => {

    let data = JSON.parse(localStorage.getItem("data"));

    let gondericiid = JSON.parse(localStorage.getItem("gondericiid"));
    let aliciid = JSON.parse(localStorage.getItem("aliciid"));

    const [yeniMesaj, setYeniMesaj] = useState('');

    const [mesajverileri, setmesajverileri] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from the database

            const kullaniciMesajVeri = await vericek('Mesajlasma');
            console.log(gondericiid);
            const kullaniciMesajVeriFilter = kullaniciMesajVeri.filter((item) => item.gonderici == gondericiid || item.alici == gondericiid);
            console.log(kullaniciMesajVeriFilter)
            const sonveri = kullaniciMesajVeriFilter.sort((a, b) => {
                const dateA = new Date(a.zaman.seconds * 1000);
                const dateB = new Date(b.zaman.seconds * 1000);
                return dateA - dateB;
            });


            setmesajverileri(sonveri);
            console.log(sonveri)
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const handleMesajGonder = async () => {
        if (yeniMesaj.trim() !== '') {
            // Yeni mesajı Firestore'a ekleyin
            await insert2("Mesajlasma", {
                alici: aliciid,
                gonderici: gondericiid,
                mesaj: yeniMesaj,
                zaman: new Date(),
            })

            // Yeni mesajı ekledikten sonra tekrar veriyi çekin ve güncelleyin
            const kullaniciMesajVeri = await vericek('Mesajlasma');
            const kullaniciMesajVeriFilter = kullaniciMesajVeri.filter((item) => item.gonderici == gondericiid || item.alici == gondericiid);
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
                <NavbarAntrenor />
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

                                    <div key={index} className="card" style={{
                                        width: "250px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff", marginBottom: "30px",
                                        marginLeft: mesaj.gonderici === gondericiid ? "auto" : "0",
                                        marginRight: mesaj.gonderici === gondericiid ? "0" : "auto",
                                        backgroundColor: mesaj.gonderici === gondericiid ? "lightgreen" : "white",
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

export default ChatAntrenor;
