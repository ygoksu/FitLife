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
  faPerson,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default class Navbar2AdminAll extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/Profile">
            <FontAwesomeIcon
              icon={icon({ name: "user", style: "regular" })}
              style={{ position: "relative", top: "10px", left: "5px" }}
            />
          </Link>

          <Link to="/Antrenor2">
            <FontAwesomeIcon
            icon={faDumbbell}
            style={{ position: "relative", top: "10px", left: "5px" }}
            />
          </Link>

          <Link to="/Admin">
            <FontAwesomeIcon
              icon={faRotateLeft}
              style={{ position: "relative", top: "10px", left: "5px" }}
            />
          </Link>
        </div>
      </div>
    );
  }
}
