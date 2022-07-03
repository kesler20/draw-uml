import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";

const UmlDiagram = ({ data }) => {
  const [gridTable, setGridTable] = useState(data.gridTable);
  // create a style for the sources and a style for the targets and append the sources and the targets onclick of the bottom
  const sourceHandleStyle = { width: 20, height: 20,backgroundColor: 'green' };
  const targetHandleStyle = { width: 20, height: 20,backgroundColor: 'yellow' };

  const addRow = (e) => {
    let grid = data.gridTable;
    grid.push({ visibility: "+", signature: "", type: "" });
    console.log(grid);
    let gridTable = grid;
    setGridTable({ gridTable });
    setTimeout(() => {
      let umlTable =
        e.target.parentNode.classList.value === "grid-table"
          ? e.target.parentNode
          : e.target.parentNode.children.item(1);
      let signatureBox = umlTable.children.item(umlTable.children.length - 3);
      console.log(signatureBox);
      signatureBox.focus();
    }, 0);
  };

  const deleteRow = (e) => {
    let grid = data.gridTable;
    grid.pop();
    console.log(grid);
    let gridTable = grid;
    setGridTable({ gridTable });
    let umlTable =
      e.target.parentNode.classList.value === "grid-table"
        ? e.target.parentNode
        : e.target.parentNode.children.item(1);
    let signatureBox = umlTable.children.item(umlTable.children.length - 7);
    signatureBox.focus();
  };

  const handleConnection = (e) => {
    let handle =
      e.target.parentNode.parentNode.parentNode.children.item(0).classList
        .value === "handle"
        ? e.target.parentNode.parentNode.parentNode.children.item(0)
        : e.target.parentNode.parentNode.children.item(0);
    console.log(handle);
  };

  const findIndex = (collection, item) => {
    let i = 0;
    for (let j of collection) {
      if (j === item) return i;
      i++;
    }
  };

  const handleNavigation = (e) => {
    if (e.key === "Enter") {
      addRow(e);
    } else if (e.keyCode === 8 && e.target.value === "") {
      deleteRow(e);
    } else if (e.key === "ArrowRight") {
      try {
        let nextRow = e.target.parentNode.children.item(
          findIndex(e.target.parentNode.children, e.target) + 1
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else if (e.key === "ArrowLeft") {
      try {
        let nextRow = e.target.parentNode.children.item(
          findIndex(e.target.parentNode.children, e.target) - 1
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else if (e.key === "ArrowUp") {
      try {
        let nextRow = e.target.parentNode.children.item(
          findIndex(e.target.parentNode.children, e.target) - 4
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else if (e.key === "ArrowDown") {
      try {
        let nextRow = e.target.parentNode.children.item(
          findIndex(e.target.parentNode.children, e.target) + 4
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(e.key);
    }
  };

  return (
    <div className="diagram" style={{ top: 285, left: 534 }}>
      <div className="uml">
        <Handle
          className="handle"
          type="target"
          position={Position.Right}
          style={targetHandleStyle}
        />
        <input
          type="text"
          placeholder="Object Name"
          className="object-name"
          style={{ borderTop: `25px solid ${data.color}` }}
          onKeyDown={(e) => handleNavigation(e)}
        />
        <div className="grid-table">
          {data.gridTable.map((inputElement) => {
            return (
              <React.Fragment key={inputElement.visibility}>
                <input
                  value={inputElement.visibility}
                  onChange={(e) => (inputElement.visibility = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <input
                  onChange={(e) => (inputElement.signature = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <input
                  onChange={(e) => (inputElement.type = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <div className="arrowBtn" onClick={(e) => handleConnection(e)}>
                  <i className="fas fa-plus" aria-hidden="true"></i>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <Handle
          className="handle"
          type="source"
          position={Position.Left}
          id="a"
          style={sourceHandleStyle}
        />
      </div>
    </div>
  );
};

export default UmlDiagram;
