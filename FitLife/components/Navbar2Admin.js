import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar2.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faDumbbell,
  faHome,
  faUser,
  faRotateLeft,
  faPerson,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default class Navbar2Admin extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/ProfileAdmin">
            <FontAwesomeIcon
              icon={icon({ name: "user", style: "regular" })}
              style={{ position: "relative", top: "10px", left: "9px" }}
            />
          </Link>
          <Link to="/Kullanicilar">
            <FontAwesomeIcon
              icon={icon({ name: "users", style: "solid" })}
              style={{ position: "relative", top: "10px", left: "5px" }}
            />
          </Link>
          
          <Link to="/KayıtOl">
            <FontAwesomeIcon
              icon={faPlus}
              style={{ position: "relative", top: "10px", left: "9px" }}
            />
          </Link>
          <Link to="/Admin">
            <FontAwesomeIcon
              icon={faRotateLeft}
              style={{ position: "relative", top: "10px", left: "8px" }}
            />
          </Link>
        </div>
      </div>
    );
  }
}
