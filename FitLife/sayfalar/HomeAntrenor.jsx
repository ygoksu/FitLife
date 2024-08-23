import React, { Component } from "react";
import NavbarAntrenor from "../components/NavbarAntrenor";

export default class HomeAntrenor extends Component {
  render() {
    return (
      <div>
        <div style={{ display:"flex", backgroundColor: "#7952b3"}}>
          <NavbarAntrenor />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center",width:"1500px"}}>
      <h2 className="animation" >Fitness Sayfamıza Hoş Geldiniz!</h2>
      </div>
      
        </div>
      </div>
    );
  }
}
