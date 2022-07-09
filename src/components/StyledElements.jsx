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
  left: 50%;
  background-color: white;
  height: 350px;
  width: 500px;
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
`;
