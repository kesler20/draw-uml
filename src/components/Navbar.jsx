import React from "react";
import Logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import {
  HamburgerMenu,
  NavBar,
  SiteTitle,
  Version,
  SideBar,
  LinksCard,
} from "./StyledElements";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";

const NavbarComponent = ({ onCreateTable, onCopyDiagram, onPasteDiagram }) => {
  const [sideBarView, setSideBarView] = useState([false]);
  const [downloadableLinks, setDownloadableLinks] = useState([]);
  const [downloadableServerLinks, setDownloadableServerLinks] = useState([]);
  const [linksView, setLinksView] = useState(false);
  const [linksServerView, setLinksServerView] = useState(false);
  const [viewFileUpload, setViewFileUpload] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files`)
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((res) => {
              console.log(res);
              setDownloadableLinks(res.response);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/servers`)
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((res) => {
              console.log(res);
              setDownloadableServerLinks(res.response);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeBarView = () => {
    let currentView = !sideBarView;
    setSideBarView(currentView);
  };

  const uploadCode = (e) => {
    const url = `${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files/existing`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(e.target.value),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let nav = document.querySelector(".nav");
    let elem2 = document.querySelector(".elem2");
    nav.removeChild(elem2);
  };

  const renderSideBar = (toRender) => {
    if (toRender) {
      return (
        <SideBar style={{ margin: "10px", color: "#e17bef" }}>
          <div className="avatar" data-tooltip="Copy Diagram">
            <FaCopy onClick={onCopyDiagram} />
          </div>
          <div className="avatar" data-tooltip="Paste Diagram">
            <FaPaste onClick={onPasteDiagram} />
          </div>
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
          <GiHamburgerMenu color="gray" size={30} />
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
      {linksView && (
        <LinksCard>
          <div
            className="add-row-btn"
            onClick={() => setLinksView((prevState) => !prevState)}
          >
            <FaPlus />
          </div>
          <h3>Click on a Link</h3>
          {downloadableLinks.map((link, index) => {
            return (
              <a
                className="link"
                key={index}
                href={`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files/${link}`}
                download
              >
                {link}
              </a>
            );
          })}
        </LinksCard>
      )}
      {linksServerView && (
        <LinksCard>
          <div
            className="add-row-btn"
            onClick={() => setLinksServerView((prevState) => !prevState)}
          >
            <FaPlus />
          </div>
          <h3>Click on a Link</h3>
          {downloadableServerLinks.map((link, index) => {
            return (
              <a
                className="link"
                key={index}
                href={`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/servers/${link}`}
                download
              >
                {link}
              </a>
            );
          })}
        </LinksCard>
      )}
      <div />
      {renderSideBar(sideBarView)}
      {viewFileUpload && (
        <input
          type="file"
          onChange={uploadSQLCode}
          style={{ margin: "5px", border: "1px solid rgb(130,71,246)" }}
        />
      )}
    </div>
  );
};

export default NavbarComponent;
