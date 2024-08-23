import React, { Component } from "react";
import NavbarDanisan from "../components/NavbarDanisan";

export default class HomeDanisan extends Component {
  render() {
    return (
      <div>
        <div style={{ display:"flex", backgroundColor: "#7952b3"}}>
          <NavbarDanisan />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center",width:"1500px"}}>
      <h2 className="animation" >Fitness Sayfamıza Hoş Geldiniz!</h2>
      </div>
      
        </div>
      </div>
    );
  }
}
