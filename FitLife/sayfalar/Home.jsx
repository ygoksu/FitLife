import React, { Component } from "react";
import Navbar2 from "../components/Navbar2";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ display:"flex", backgroundColor: "#7952b3"}}>
          <Navbar2 />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center",width:"1500px"}}>
      <h2 className="animation" >Fitness Sayfamıza Hoş Geldiniz!</h2>
      </div>
      
        </div>
      </div>
    );
  }
}