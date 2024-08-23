import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar2.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faDumbbell, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default class Navbar2 extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/Home">
            <FontAwesomeIcon icon={faHome} style={{position: "relative", top: "10px", left: "5px"}} />
          </Link>
          <Link to="/Profile">
          <FontAwesomeIcon icon={icon({ name: "user", style: "regular" })} style={{position: "relative", top: "10px", left: "5px"}}/>
          </Link>
          <Link to="/Antrenman">
          <FontAwesomeIcon icon={faDumbbell} style={{position: "relative", top: "10px", left: "3px"}} />
          </Link>
          <Link to="/Antrenor">
            <FontAwesomeIcon
              icon={icon({ name: "twitter", style: "brands" })}style={{position: "relative", top: "10px", left: "5px"}}
            />
          </Link>
          <Link to="/Beslenme">
          <FontAwesomeIcon icon={faBurger}  style={{position: "relative", top: "10px", left: "5px"}}/>
          </Link>
        </div>
      </div>
    );
  }
}
