import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import ModalCard from "../components/ModalCard";
import { findIndex } from "../utils/Utils";

const UmlDiagram = ({ data }) => {
  const [gridTable, setGridTable] = useState(data.gridTable);
  const [objectComment, setObjectComment] = useState(data.comment);
  const [viewObjectMetadata, setViewObjectMetadata] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [insertMode, setInsertMode] = useState(true);
  const [objectIsDataclass, setObjectIsDataclass] = useState(data.dataclass);

  const addRow = (e) => {
    let grid = data.gridTable;
    grid.push({
      visibility: "+",
      signature: "",
      returnType: "",
      comment: "signature description",
      params: [{ name: "name", type: "str", comment: ["parameter comment","return comment"] }],
    });
    let gridTable = grid;
    setGridTable({ gridTable });
    setTimeout(() => {
      let umlTable =
        e.target.parentNode.classList.value === "grid-table"
          ? e.target.parentNode
          : e.target.parentNode.children.item(1);
      let signatureBox = umlTable.children.item(umlTable.children.length - 3);
      signatureBox.focus();
    }, 0);
  };

  const updateObjectComment = (comment) => {
    data.comment = comment;
    setObjectComment(data.comment);
  };

  const updateParams = (newParams) => {
    data.gridTable[currentRowIndex].params = newParams;
    setGridTable(data.gridTable);
  };

  const updateSignatureComment = (comment) => {
    data.gridTable[currentRowIndex].comment = comment;
    setGridTable(data.gridTable);
  };

  const updateParamType = (type, paramIndex) => {
    data.gridTable[currentRowIndex].params[paramIndex].type = type;
    setGridTable(data.gridTable);
  };

  const updateParamName = (name, paramIndex) => {
    data.gridTable[currentRowIndex].params[paramIndex].name = name;
    setGridTable(data.gridTable);
  };

  const updateParamComment = (comment, paramIndex, commentType) => {
    data.gridTable[currentRowIndex].params[paramIndex].comment[commentType] = comment;
    setGridTable(data.gridTable);
  };

  const toggleModalView = (index) => {
    setCurrentRowIndex(index);
    setViewObjectMetadata(!viewObjectMetadata);
  };

  const deleteRow = (e) => {
    let grid = data.gridTable;
    grid.pop();
    let gridTable = grid;
    setGridTable({ gridTable });
    let umlTable =
      e.target.parentNode.classList.value === "grid-table"
        ? e.target.parentNode
        : e.target.parentNode.children.item(1);
    let signatureBox = umlTable.children.item(umlTable.children.length - 7);
    signatureBox.focus();
  };

  const updateObjectobjectIsDataclassStatus = () => {
    data.dataclass = !objectIsDataclass;
    setObjectIsDataclass(data.dataclass);
  };

  const handleNavigation = (e) => {
    if (e.key === "Control") {
      setInsertMode(!insertMode);
    }

    if (e.key === "Enter") {
      addRow(e);
    } else if (e.keyCode === 8 && e.target.value === "") {
      deleteRow(e);
    } else {
      if (!insertMode) {
        if (e.key === "ArrowRight") {
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
      }
    }
  };

  return (
    <div className="diagram" style={{ top: 285, left: 534 }}>
      {viewObjectMetadata && (
        <ModalCard
          updateParamType={updateParamType}
          updateParamName={updateParamName}
          updateParamComment={updateParamComment}
          updateObjectComment={updateObjectComment}
          updateParams={updateParams}
          updateSignatureComment={updateSignatureComment}
          onCheckBoxClicked={updateObjectobjectIsDataclassStatus}
          // read only
          objectName={data.objectName}
          currentRowIndex={currentRowIndex}
          objectComment={objectComment}
          gridTable={data.gridTable}
          objectDataclassStatus={objectIsDataclass}
        />
      )}
      {objectIsDataclass && (
        <div className="object-type">
          <h2 className="object-type__header">{"<<Dataclass>>"}</h2>
        </div>
      )}
      <div className="uml">
        {data.gridTable.map((i, index) => {
          let offSet = index * 50 + 100;
          return (
            <Handle
              type="target"
              id={offSet + "b" + data.objectName + i.signature}
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
          style={{
            borderTop: objectIsDataclass
              ? `35px solid ${data.color}`
              : `20px solid ${data.color}`,
          }}
          onKeyDown={(e) => handleNavigation(e)}
        />
        <div className="grid-table">
          {data.gridTable.map((inputElement, index) => {
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
                  placeholder={inputElement.returnType}
                  onChange={(e) => (inputElement.returnType = e.target.value)}
                  onKeyDown={(e) => handleNavigation(e)}
                />
                <div className="arrowBtn">
                  <i
                    className="fas fa-plus"
                    aria-hidden="true"
                    onClick={() => toggleModalView(index)}
                  ></i>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {data.gridTable.map((i, index) => {
          let offSet = index * 50 + 100;
          return (
            <Handle
              type="source"
              id={offSet + "a" + data.objectName + i.signature}
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
