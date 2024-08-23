import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const GrafikKitleIndeks = () => {

    let data = JSON.parse(localStorage.getItem("grafikveri"));

    console.log(data);

    const yonlendir = async () => {

      let data = JSON.parse(localStorage.getItem("data"));
      let key = "";

      if(data.rol == "Antrenor")
      {
        key = "/Antrenor"
        setTimeout(() => {
          window.location = key;
        }, 1000);
      }
      else if (data.rol == "Danisan")
      {
        key = "IlerlemeDanisan";
        setTimeout(() => {
          window.location = key;
        }, 1000);
      } 
      else if (data.rol == "Admin")
      {
        setTimeout(() => {
          window.location = "/Admin";
        }, 1000);
      }

       

    }

    /*const data = [
        { name: 'Veri 1', boy: 180, kilo: 80 },
        { name: 'Veri 2', boy: 170, kilo: 70 },
        { name: 'Veri 3', boy: 160, kilo: 60 },
        { name: 'Veri 4', boy: 150, kilo: 50 },
        { name: 'Veri 5', boy: 140, kilo: 40 },
        { name: 'Veri 6', boy: 130, kilo: 30 },
        { name: 'Veri 7', boy: 120, kilo: 20 },
        { name: 'Veri 8', boy: 110, kilo: 10 },
        { name: 'Veri 9', boy: 100, kilo: 5 },
        { name: 'Veri 10', boy: 90, kilo: 1 },
        <Line type="monotone" dataKey="kilo" stroke="#82ca9d" />
      <Line type="monotone" dataKey="kas" stroke="#DC143C" />
      <Line type="monotone" dataKey="yag" stroke="#FF8C00" />
      <Line type="monotone" dataKey="kitleindeks" stroke="#FF00FF" />
      ];*/

    return (
      <div style={{marginTop: "100px"}}>

    <LineChart width={1000} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="tarih" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="kitleindeks" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
    <div type="button" onClick={yonlendir} className="btn btn-success">
                    Geri
                </div>
    
      </div>
    )
  
}

export default  GrafikKitleIndeks;
