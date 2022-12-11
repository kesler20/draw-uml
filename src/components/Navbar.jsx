import React from "react";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import { HamburgerMenu, NavBar, SiteTitle, Version, SideBar } from "./StyledElements";

const NavbarComponent = ({ onCreateTable, onCopyDiagram }) => {
  
  const [sideBarView, setSideBarView] = useState([false]);

  const changeBarView = () => {
    let currentView = !sideBarView;
    setSideBarView(currentView);
  };

  const renderSideBar = (toRender) => {
    if (toRender) {
      return (
        <SideBar style={{ margin: "10px", color: "#e17bef" }}>
          <div className="avatar" data-tooltip="Copy Diagram">
            <i className="fas fa-copy fa-2x" onClick={onCopyDiagram}></i>
          </div>
          <a
            className="avatar"
            data-tooltip="Get Python"
            href={`${process.env.REACT_APP_BACKEND_URL_PROD}/draw-uml/python_file`}
            download
          >
            <i className="fas fa-download fa-2x"></i>
          </a>
          <a
            className="avatar"
            data-tooltip="Get Test Python"
            href={`${process.env.REACT_APP_BACKEND_URL_PROD}/draw-uml/python_test_file`}
            download
          >
            <i className="fas fa-download fa-2x"></i>
          </a>
          <a
            className="avatar"
            data-tooltip="Get Javascript"
            href={`${process.env.REACT_APP_BACKEND_URL_PROD}/draw-uml/javascript_file`}
            download
          >
            <i className="fas fa-download fa-2x"></i>
          </a>
        </SideBar>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="nav">
      <NavBar>
        <HamburgerMenu onClick={() => changeBarView()}>
          <i className="fa fa-bars fa-2x" style={{ color: "grey" }}></i>
        </HamburgerMenu>
        <SiteTitle>
          <img src={Logo} alt="site logo" />
          <p>drawUML</p>
        </SiteTitle>
        <Version>
          <p>version: {process.env.REACT_APP_VERSION}</p>
        </Version>
        <button className="btn create-table-btn" onClick={onCreateTable}>
          Create Table
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            width="12"
            height="12"
            style={{ marginLeft: "0.33em" }}
          >
            <g
              stroke="currentColor"
              strokeWidth="1.75"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M4.497 1H3a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-1.5h0"
                opacity=".6"
              ></path>
              <path d="M9 1.008L14 1v5M14 1L6 9"></path>
            </g>
          </svg>
        </button>
      </NavBar>
      <div />
      {renderSideBar(sideBarView)}
    </div>
  );
};

export default NavbarComponent;
