import "./App.css";
import Main from "./sayfalar/Main";
import Home from "./sayfalar/Home";
import Navbar from "./components/Navbar";
import React, { Component } from "react";
import { useEffect } from "react";
import { signUp, signIn } from "./config/firebase";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./sayfalar/profile";
import Admin from "./sayfalar/Admin";
import Antrenor from "./sayfalar/Antrenor";
import Danisan from "./sayfalar/Danisan";
import KayıtOl from "./sayfalar/KayıtOl";
import Antrenman from "./sayfalar/Antrenman";
import Kullanicilar from "./sayfalar/Kullanicilar";
import Antrenor2 from "./sayfalar/Antrenor2";
import Antrenman2 from "./sayfalar/Antrenman2";
import SifremiUnuttum from "./sayfalar/SifremiUnuttum";
import AntrenorOzellik from "./sayfalar/AntrenorOzellik";
import DanisanOzellik from "./sayfalar/DanisanOzellik";
import HomeDanisan from "./sayfalar/HomeDanisan";
import ProfilDanisan from "./sayfalar/ProfilDanisan";
import IlerlemeDanisan from "./sayfalar/IlerlemeDanisan";
import ProgramlarDanisan from "./sayfalar/ProgramlarDanisan";
import GrafikBoy from "./sayfalar/GrafikBoy";
import GrafikKas from "./sayfalar/GrafikKas";
import GrafikKilo from "./sayfalar/GrafikKilo";
import GrafikKitleIndeks from "./sayfalar/GrafikKitleIndeks";
import GrafikYag from "./sayfalar/GrafikYag";
import ProfileAdmin from "./sayfalar/ProfileAdmin";
import Danisan2 from "./sayfalar/Danisan2";
import Beslenme from "./sayfalar/Beslenme";
import ProfilAntrenor from "./sayfalar/ProfilAntrenor";
import HomeAntrenor from "./sayfalar/HomeAntrenor";
import AntrenorSec from "./sayfalar/AntrenorSec";
import ChatDanisan from "./sayfalar/ChatDanisan";
import ChatAntrenor from "./sayfalar/ChatAntrenor";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="ProfilAntrenor" element={<ProfilAntrenor />} />
          <Route path="KayıtOl" element={<KayıtOl />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Danisan" element={<Danisan />} />
          <Route path="Antrenor" element={<Antrenor />} />
          <Route path="Home" element={<Home />} />
          <Route path="HomeAntrenor" element={<HomeAntrenor />} />
          <Route path="Antrenman" element={<Antrenman />} />
          <Route path="SifremiUnuttum" element={<SifremiUnuttum />} />
          <Route path="AntrenorOzellik" element={<AntrenorOzellik />} />
          <Route path="DanisanOzellik" element={<DanisanOzellik />} />
          <Route path="HomeDanisan" element={<HomeDanisan />} />
          <Route path="ProfilDanisan" element={<ProfilDanisan />} />
          <Route path="IlerlemeDanisan" element={<IlerlemeDanisan />} />
          <Route path="ProgramlarDanisan" element={<ProgramlarDanisan />} />
          <Route path="GrafikBoy" element={<GrafikBoy />} />
          <Route path="GrafikKas" element={<GrafikKas />} />
          <Route path="GrafikKilo" element={<GrafikKilo />} />
          <Route path="GrafikKitleIndeks" element={<GrafikKitleIndeks />} />
          <Route path="GrafikYag" element={<GrafikYag />} />
          <Route path="Antrenman2" element={<Antrenman2 />} />
          <Route path="Kullanicilar" element={<Kullanicilar />} />
          <Route path="Antrenor2" element={<Antrenor2 />} />
          <Route path="ProfileAdmin" element={<ProfileAdmin />} />
          <Route path="Danisan2" element={<Danisan2 />} />
          <Route path="Beslenme" element={<Beslenme />} />
          <Route path="AntrenorSec" element={<AntrenorSec />} />
          <Route path="ChatDanisan" element={<ChatDanisan />} />
          <Route path="ChatAntrenor" element={<ChatAntrenor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
