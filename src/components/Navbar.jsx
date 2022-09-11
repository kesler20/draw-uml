import React from "react";
import styled from "styled-components";
import Logo from "../logo.svg";
import { useState } from "react";

const Navbar = ({
  onCreateTable,
  onSaveDiagram,
  onDownloadDiagram,
  onCopyDiagram,
  onPrintDiagram,
  onPasteDiagram,
}) => {
  const [sideBarView, setSideBarView] = useState([false]);
  // true if there is storage data and false if there is not
  const [storageData, setStorageData] = useState([]);

  const handleStorage = () => {
    if (!storageData) {
      localStorage.clear();
      setStorageData(true);
    } else {
      alert("By clicking this button Again you might lose all your files");
      setStorageData(false);
    }
  };

  const changeBarView = () => {
    let currentView = !sideBarView;
    setSideBarView(currentView);
  };

  const renderSideBar = (toRender) => {
    if (toRender) {
      return (
        <SideBar style={{ margin: "10px", color: "#e17bef" }}>
          <div className="avatar" data-tooltip="Save Diagram">
            <i className="fas fa-save fa-2x" onClick={onSaveDiagram} />
          </div>
          <div className="avatar" data-tooltip="Empty Storage">
            <i className="fas fa-trash fa-2x" onClick={handleStorage}></i>
          </div>
          <div className="avatar" data-tooltip="Load Diagram">
            <i className="fas fa-upload fa-2x" onClick={onDownloadDiagram}></i>
          </div>
          <div className="avatar" data-tooltip="Copy Diagram">
            <i className="fas fa-copy fa-2x" onClick={onCopyDiagram}></i>
          </div>
          <div className="avatar" data-tooltip="Print Diagram">
            <i className="fas fa-print fa-2x" onClick={onPrintDiagram}></i>
          </div>
          <div className="avatar" data-tooltip="Paste Diagram">
            <i className="fas fa-paste fa-2x" onClick={onPasteDiagram}></i>
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

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80px;
  border: 10px black;
`;

const HamburgerMenu = styled.div`
  border: 0.1px solid rgb(186, 202, 183);
  width: 57px;
  height: 42px;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;

  :hover {
    box-shadow: 1px 1px 1px 10px rgb(245, 255, 229);
  }

  .hamburger {
    border-bottom: solid 3px grey;
    width: 28px;
  }
`;
const SiteTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  width: 280px;
  display: flex;
  justify-content: space-evenly;
  p {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 255, 1) 0%,
      rgba(238, 130, 238, 1) 100%
    );
    background-repeat: no-repeat;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: 900;

    :hover {
      background-size: 80%;
      animation: animate 5s infinite;
    }
  }

  img {
    width: 59px;
    height: 53px;
    border-radius: 20px;
  }
`;

const Version = styled.div`
  font-size: 28px;
  font-weight: 400;
  display: flex;
  color: #555555;
  justify-content: space-evenly;
  width: 180px;
  align-items: center;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  i:hover {
    color: #8448f5;
  }
`;

export default Navbar;
