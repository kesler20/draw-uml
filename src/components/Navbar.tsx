import * as React from "react";
import Logo from "../assets/logo.svg";
import {
  HamburgerMenu,
  LinksCard,
  NavBar,
  SideBar,
  SiteTitle,
  Version,
} from "./StyledElements";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy, FaPaste, FaPlus } from "react-icons/fa";

type NavbarProps = {
  sideBarView: boolean;
  downloadableLinks: string[];
  downloadableServerLinks: string[];
  linksView: boolean;
  linksServerView: boolean;
  viewFileUpload: boolean;
  onEventCreateTable: () => void;
  onEventCopyDiagram: () => void;
  onEventPasteDiagram: () => void;
  onEventToggleSidebar: () => void;
  onEventToggleLinksView: () => void;
  onEventToggleLinksServerView: () => void;
  onEventUploadFile: (contents: string) => void;
};

export default function NavbarComponent(props: NavbarProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      props.onEventUploadFile(String(reader.result ?? ""));
    };
    reader.readAsText(file);
  };

  const renderSideBar = (toRender: boolean) => {
    if (toRender) {
      return (
        <SideBar style={{ margin: "10px", color: "#e17bef" }}>
          <div className="avatar" data-tooltip="Copy Diagram">
            <FaCopy onClick={props.onEventCopyDiagram} />
          </div>
          <div className="avatar" data-tooltip="Paste Diagram">
            <FaPaste onClick={props.onEventPasteDiagram} />
          </div>
        </SideBar>
      );
    }

    return null;
  };

  return (
    <div className="nav">
      <NavBar>
        <HamburgerMenu onClick={props.onEventToggleSidebar}>
          <GiHamburgerMenu color="gray" size={30} />
        </HamburgerMenu>
        <SiteTitle>
          <img src={Logo} alt="site logo" />
          <p>drawAPI</p>
        </SiteTitle>
        <Version>
          <p>version: {process.env.REACT_APP_VERSION}</p>
        </Version>
        <button className="btn create-table-btn" onClick={props.onEventCreateTable}>
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
      {props.linksView && (
        <LinksCard>
          <div className="add-row-btn" onClick={props.onEventToggleLinksView}>
            <FaPlus />
          </div>
          <h3>Click on a Link</h3>
          {props.downloadableLinks.map((link, index) => {
            return (
              <a
                className="link"
                key={`${link}-${index}`}
                href={`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files/${link}`}
                download
              >
                {link}
              </a>
            );
          })}
        </LinksCard>
      )}
      {props.linksServerView && (
        <LinksCard>
          <div className="add-row-btn" onClick={props.onEventToggleLinksServerView}>
            <FaPlus />
          </div>
          <h3>Click on a Link</h3>
          {props.downloadableServerLinks.map((link, index) => {
            return (
              <a
                className="link"
                key={`${link}-${index}`}
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
      {renderSideBar(props.sideBarView)}
      {props.viewFileUpload && (
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ margin: "5px", border: "1px solid rgb(130,71,246)" }}
        />
      )}
    </div>
  );
}
