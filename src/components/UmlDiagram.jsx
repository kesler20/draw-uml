import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { DesignNotes } from "./StyledElements";

const findIndex = (collection, item) => {
  let i = 0;
  for (let j of collection) {
    if (j === item) return i;
    i++;
  }
};

const UmlDiagram = ({ data }) => {
  const [gridTable, setGridTable] = useState(data.gridTable);
  const [viewComment, setViewComment] = useState(false);
  const [objectComment, setObjectComment] = useState(false);

  const addRow = (e) => {
    let grid = data.gridTable;
    grid.push({
      visibility: "+",
      signature: "",
      type: "",
      comment: "signature description",
    });
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

  const handleObjectClick = (e) => {
    if (e.detail == 2) {
      setObjectComment(!objectComment);
    }
  };

  return (
    <div className="diagram" style={{ top: 285, left: 534 }}>
      <div className="uml">
        {data.gridTable.map((i) => {
          let offSet = data.gridTable.indexOf(i) * 50 + 100;
          return (
            <Handle
              type="target"
              id={offSet + "b" + i.objectName}
              position={Position.Right}
              style={{
                width: 20,
                height: 20,
                top: offSet,
                backgroundColor: "yellow",
              }}
            />
          );
        })}
        <input
          type="text"
          placeholder={data.objectName}
          onChange={(e) => (data.objectName = e.target.value)}
          className="object-name"
          style={{ borderTop: `25px solid ${data.color}` }}
          onKeyDown={(e) => handleNavigation(e)}
          onClick={(e) => handleObjectClick(e)}
        />
        {objectComment ? (
          <DesignNotes>
            <textarea className="class"
              onChange={(e) => (data.comment = e.target.value)}
              placeholder={data.comment}
            />
          </DesignNotes>
        ) : (
          <React.Fragment />
        )}
        <div className="grid-table">
          {data.gridTable.map((inputElement) => {
            return (
              <React.Fragment key={inputElement.visibility}>
                <input
                  placeholder={inputElement.visibility}
                  onChange={(e) => (inputElement.visibility = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <input
                  placeholder={inputElement.signature}
                  onChange={(e) => (inputElement.signature = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <input
                  placeholder={inputElement.type}
                  onChange={(e) => (inputElement.type = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <div className="arrowBtn">
                  <i
                    className="fas fa-plus"
                    aria-hidden="true"
                    onClick={() => setViewComment(!viewComment)}
                  ></i>
                  {viewComment ? (
                    <DesignNotes>
                      <textarea
                        onChange={(e) =>
                          (inputElement.comment = e.target.value)
                        }
                        placeholder={inputElement.comment}
                      />
                    </DesignNotes>
                  ) : (
                    <React.Fragment />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {data.gridTable.map((i) => {
          let offSet = data.gridTable.indexOf(i) * 50 + 100;
          return (
            <Handle
              type="source"
              id={offSet + "a" + i.objectName}
              position={Position.Left}
              style={{
                width: 20,
                height: 20,
                top: offSet,
                backgroundColor: "green",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UmlDiagram;
