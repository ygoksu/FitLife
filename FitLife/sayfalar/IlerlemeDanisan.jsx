import React, { Component, useState, useEffect } from 'react'
import NavbarDanisan from '../components/NavbarDanisan';
import { auth, insert2, vericek } from '../config/firebase';

const IlerlemeDanisan = () => {


    let data = JSON.parse(localStorage.getItem("data"));
    console.log("Deneme")
    console.log(data.rol);
    console.log("Deneme")
    console.log(data);

    const [authData, setAuthData] = useState({ uıd: data.uıd, ad: data.ad, soyad: data.soyad, cinsiyet: data.cinsiyet, dogumtarihi: data.dogumtarihi, email: data.email, rol: data.rol, telno: data.telno, sifre: data.sifre, fotoyol: data.fotoyol, kas: data.kas, kilo: data.kilo, kitleindeks: data.kitleindeks, yag: data.yag, boy: data.boy, tarih: "" });

    const [kiloflag, setkiloflag] = useState(0);

    const [boyflag, setboyflag] = useState(0);

    const [kasflag, setkasflag] = useState(0);

    const [kitleindeksflag, setkitleindeksflag] = useState(0);

    const [yagflag, setyagflag] = useState(0);

    const onChangeFunc = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    };

    const [tabloVerileri, setTabloVerileri] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from the database
            const kullaniciDurumVeri = await vericek('KullaniciDurum');
            console.log(kullaniciDurumVeri);
            const kullaniciDurumVeriFilter = kullaniciDurumVeri.filter((item) => item.uid == authData.uıd);

            const sonveri = kullaniciDurumVeriFilter.sort((a, b) => new Date(a.tarih) - new Date(b.tarih));


            setTabloVerileri(sonveri);
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const tabloyaekle = async () => {

        /*let a = await vericek("KullaniciDurum");
        console.log("aynen000");
        console.log(a);
        for (const item of a) {
            console.log(item.kas)
        }*/
        setTabloVerileri([...tabloVerileri, authData]);

        //const veri1 = { ...authData, uid: authData.uıd };

        const { tarih, ...veri } = authData;
        insert2("KullaniciDurum", { uid: authData.uıd, kilo: authData.kilo, boy: authData.boy, kas: authData.kas, kitleindeks: authData.kitleindeks, yag: authData.yag, tarih: authData.tarih });

        if (data.kilo > veri.kilo) {
            setkiloflag(-1);
        }
        else if (data.kilo < veri.kilo) {
            setkiloflag(1);
        }
        else {
            setkiloflag(0);
        }

        if (data.kas > veri.kas) {
            setkasflag(-1);
        } else if (data.kas < veri.kas) {
            setkasflag(1);
        } else {
            setkasflag(0);
        }

        if (data.kitleindeks > veri.kitleindeks) {
            setkitleindeksflag(-1);
        } else if (data.kitleindeks < veri.kitleindeks) {
            setkitleindeksflag(1);
        } else {
            setkitleindeksflag(0);
        }

        if (data.yag > veri.yag) {
            setyagflag(-1);
        } else if (data.yag < veri.yag) {
            setyagflag(1);
        } else {
            setyagflag(0);
        }

        if (data.boy > veri.boy) {
            setboyflag(-1);
        } else if (data.boy < veri.boy) {
            setboyflag(1);
        } else {
            setboyflag(0);
        }


        data.kilo = veri.kilo;
        data.boy = veri.boy;
        data.yag = veri.yag;
        data.kitleindeks = veri.kitleindeks;
        data.kas = veri.kas;


        localStorage.setItem("data", JSON.stringify(data));


    }

    const yonlendirgrafik = async (grafikkey) => {
        localStorage.setItem("grafikveri", JSON.stringify(tabloVerileri));
        
        setTimeout(() => {
            console.log(grafikkey)
            window.location = "/"+grafikkey;
          }, 1000);

    }


    return (
        <div>
            <div div style={{ display: "flex" }}>
                <NavbarDanisan />



                <div
                    className="row justify-content-center align-items-center"
                    style={{ height: "80vh", marginLeft: "30px" }}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                        <div className="card" style={{ width: "400px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff", marginBottom: "30px" }}>
                            <h4> Kullanıcı Bilgileri </h4>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px" }}>
                                    🚶‍♂️
                                </span>
                                <h6>Kilo : {data.kilo}</h6>
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px", color: "green", backgroundColor: kiloflag === 1 ? "lightgreen" : (kiloflag === 0 ? "yellow" : "red") }}>
                                    {kiloflag === 1 ? "↑" : (kiloflag === 0 ? "-" : "↓")}
                                </span>
                            </div>


                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px" }}>
                                    🚶‍♂️
                                </span>
                                <h6>Boy  : {data.boy}</h6>
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px", color: "green", backgroundColor: boyflag === 1 ? "lightgreen" : (boyflag === 0 ? "yellow" : "red") }}>
                                    {boyflag === 1 ? "↑" : (boyflag === 0 ? "-" : "↓")}
                                </span>
                            </div>

                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px" }}>
                                    🚶‍♂️
                                </span>
                                <h6>Vücut Yağ Oranı : {data.yag}</h6>
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px", color: "green", backgroundColor: yagflag === 1 ? "lightgreen" : (yagflag === 0 ? "yellow" : "red") }}>
                                    {yagflag === 1 ? "↑" : (yagflag === 0 ? "-" : "↓")}
                                </span>
                            </div>

                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px" }}>
                                    🚶‍♂️
                                </span>
                                <h6>Kas Kütlesi : {data.kas}</h6>
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px", color: "green", backgroundColor: kasflag === 1 ? "lightgreen" : (kasflag === 0 ? "yellow" : "red") }}>
                                    {kasflag === 1 ? "↑" : (kasflag === 0 ? "-" : "↓")}
                                </span>
                            </div>

                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px" }}>
                                    🚶‍♂️
                                </span>
                                <h6>Vücut Kitle İndeksi : {data.kitleindeks}</h6>
                                <span className="input-group-text" id="addon-wrapping" style={{ fontSize: "12px", color: "green", backgroundColor: kitleindeksflag === 1 ? "lightgreen" : (kitleindeksflag === 0 ? "yellow" : "red") }}>
                                    {kitleindeksflag === 1 ? "↑" : (kitleindeksflag === 0 ? "-" : "↓")}
                                </span>
                            </div>

                        </div>

                        <div className="card" style={{ width: "400px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#e6f7ff" }}>
                            <h4> İlerleme Kaydet </h4>


                            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
                                <span className="input-group-text" id="addon-wrapping" style={{ width: '200px' }}>
                                    Boy:
                                </span>

                                <input
                                    name="boy"
                                    value={authData.boy}
                                    onChange={onChangeFunc}
                                    type="text"
                                    className="form-control "
                                    placeholder="Boyunuzu Giriniz"
                                />
                            </div>

                            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
                                <span className="input-group-text" id="addon-wrapping" style={{ width: '200px' }}>
                                    Kilo:
                                </span>

                                <input
                                    name="kilo"
                                    value={authData.kilo}
                                    onChange={onChangeFunc}
                                    type="text"
                                    className="form-control "
                                    placeholder="Kilonuzu Giriniz"
                                />
                            </div>

                            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
                                <span className="input-group-text" id="addon-wrapping" style={{ width: '200px' }}>
                                    Vücut Yağ Oranı:
                                </span>

                                <input
                                    name="yag"
                                    value={authData.yag}
                                    onChange={onChangeFunc}
                                    type="text"
                                    className="form-control "
                                    placeholder="Vücut Yağ Oranını Giriniz"
                                />
                            </div>

                            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
                                <span className="input-group-text" id="addon-wrapping" style={{ width: '200px' }}>
                                    Kas Kütlesi:
                                </span>

                                <input
                                    name="kas"
                                    value={authData.kas}
                                    onChange={onChangeFunc}
                                    type="text"
                                    className="form-control "
                                    placeholder="Kas Kütlesi Giriniz"
                                />
                            </div>

                            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
                                <span className="input-group-text" id="addon-wrapping" style={{ width: '200px' }}>
                                    Vücut Kitle İndeksi:
                                </span>

                                <input
                                    name="kitleindeks"
                                    value={authData.kitleindeks}
                                    onChange={onChangeFunc}
                                    type="text"
                                    className="form-control "
                                    placeholder="Vücut Kitle İndeksi Giriniz"
                                />
                            </div>

                            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
                                <span className="input-group-text" id="addon-wrapping" style={{ width: '100px' }}>
                                    Tarih:
                                </span>

                                <input
                                    name="tarih"
                                    value={authData.tarih}
                                    onChange={onChangeFunc}
                                    type="date"
                                    className="form-control "
                                    placeholder="Vücut Kitle İndeksi Giriniz"
                                />
                            </div>

                            <div type="button" onClick={tabloyaekle} className="btn btn-success">
                                Kaydet
                            </div>

                        </div>

                    </div>
                </div>

                <div style={{ height: "50vh", marginLeft: "30px" }}>

                    <table border="1" style={{ marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Boy</th>
                                <th>Kilo</th>
                                <th>Vücut Yağ Oranı</th>
                                <th>Kas Kütlesi</th>
                                <th>Vücut Kitle İndeksi</th>
                                <th>Tarih</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabloVerileri.map((veri, index) => (
                                <tr key={index}>
                                    <td>{veri.boy}</td>
                                    <td>{veri.kilo}</td>
                                    <td>{veri.yag}</td>
                                    <td>{veri.kas}</td>
                                    <td>{veri.kitleindeks}</td>
                                    <td>{veri.tarih}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px", marginLeft: "20px", marginTop: "30px"}}>
                    <div type="button" onClick={() =>yonlendirgrafik("GrafikBoy")} className="btn btn-success" style={ {marginBottom: "30px",width: "100%"}}>
                        Boy Grafiği
                    </div>
                    <div type="button" onClick={() =>yonlendirgrafik("GrafikKilo")} className="btn btn-success" style={ {marginBottom: "30px",width: "100%"}}>
                        Kilo Grafiği
                    </div>
                    <div type="button" onClick={() => yonlendirgrafik("GrafikKitleIndeks")} className="btn btn-success" style={ {marginBottom: "30px",width: "100%"}}>
                        Vücut Yağ Oranı Grafiği
                    </div>
                    <div type="button" onClick={() =>yonlendirgrafik("GrafikKas")} className="btn btn-success" style={ {marginBottom: "30px",width: "100%"}}>
                        Kas Kütlesi Grafiği
                    </div>
                    <div type="button" onClick={() =>yonlendirgrafik("GrafikKitleIndeks")} className="btn btn-success" style={ {marginBottom: "30px",width: "100%"}}>
                        Vücut Kitle İndeksi Grafiği
                    </div>
                </div>

            </div>



        </div>

    )



}


export default IlerlemeDanisan;