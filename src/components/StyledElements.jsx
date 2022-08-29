import styled from "styled-components";

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
