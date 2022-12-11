import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80px;
  border: 10px black;
`;

export const UmlDiagram = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  position: absolute;
  box-shadow: 5px 5px 40px #000;

  transform: translate(-50%, -50%);
`;

export const DesignNotes = styled.div`
  position: absolute;
  top: 50%;
  left: 130%;
  background-color: white;
  box-shadow: 2px 3px 17px rgb(200, 200, 200);
  height: 300px;
  width: 300px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-in 1s;
  .cross-btn {
    position: absolute;
    transform: translate(750%, -400%) rotate(45deg);
  }
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: 1px solid #aa5df2;
  }
  textarea.class {
    width: 100%;
    height: 100%;
    border: none;
    outline: 1px solid rgb(0,100,200);
  }
`;

export const HamburgerMenu = styled.div`
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

export const SiteTitle = styled.div`
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

export const Version = styled.div`
  font-size: 28px;
  font-weight: 400;
  display: flex;
  color: #555555;
  justify-content: space-evenly;
  width: 180px;
  align-items: center;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  i:hover {
    color: #8448f5;
  }
`;
