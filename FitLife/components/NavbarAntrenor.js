import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar2.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faChartBar,
  faDumbbell,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default class NavbarAntrenor extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/HomeAntrenor">
            <FontAwesomeIcon
              icon={faHome}
              style={{ position: "relative", top: "10px", left: "5px" }}
            />
          </Link>
          <Link to="/ProfilAntrenor">
            <FontAwesomeIcon
              icon={icon({ name: "user", style: "regular" })}
              style={{ position: "relative", top: "10px", left: "5px" }}
            />
          </Link>
          <Link to="/Antrenor">
            <FontAwesomeIcon
              icon={faDumbbell}
              style={{ position: "relative", top: "10px", left: "3px" }}
            />
          </Link>

          
        </div>
      </div>
    );
  }
}
