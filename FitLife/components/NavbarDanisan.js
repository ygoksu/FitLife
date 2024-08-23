import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar2.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faChartBar, faDumbbell, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
export default class NavbarDanisan extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/HomeDanisan">
            <FontAwesomeIcon icon={faHome} style={{position: "relative", top: "10px", left: "5px"}} />
          </Link>
          <Link to="/ProfilDanisan">
          <FontAwesomeIcon icon={icon({ name: "user", style: "regular" })} style={{position: "relative", top: "10px", left: "5px"}}/>
          </Link>
          <Link to="/IlerlemeDanisan">
          <FontAwesomeIcon icon={faDumbbell} style={{position: "relative", top: "10px", left: "3px"}} />
          </Link>
          <Link to="/ProgramlarDanisan">
          <FontAwesomeIcon icon={faSitemap}  style={{position: "relative", top: "10px", left: "5px"}}/>
          </Link>
          <Link to="/ChatDanisan">
          <FontAwesomeIcon icon={faChartBar}  style={{position: "relative", top: "10px", left: "5px"}}/>
          </Link>
        </div>
      </div>
    );
  }
}
