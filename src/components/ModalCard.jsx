import React, { useState } from "react";
import { DesignNotes } from "./StyledElements";
import { Badge } from "./StyledElements";
import { findIndex } from "../utils/Utils";
import CheckBox from "./CheckBox";

const ModalCard = (props) => {
  const [params, setParams] = useState(
    props.gridTable[props.currentRowIndex].params
  );

  const [signatureComment, setSignatureComment] = useState(
    props.gridTable[props.currentRowIndex].comment
  );

  /**
   * handle the navigation by focusing the right input element depending on
   * the targeted input element and the key that has been pressed
   * @param {*} e - onKeyPressed event from the input element
   */
  const handleNavigation = (e) => {
    // initialize next which is the next HTMLelement which we want to focus
    // (we are going to call the .focus method on it)
    // the following code block will therefore follow the following structure
    // if (we are in the left input element of the card && the key pressed is the ArrowRight)
    // then next is the right inputElement
    let next = { focus: () => "placeholder" };
    if (
      e.target === e.target.parentNode.children.item(0) &&
      e.key === "ArrowRight"
    ) {
      next = e.target.parentNode.children.item(1);
    } else if (
      e.target === e.target.parentNode.children.item(1) &&
      e.key === "ArrowLeft"
    ) {
      next = e.target.parentNode.children.item(0);
    } else if (e.key === "ArrowDown") {
      // first find the row in which the input elements are targeted
      let nextF = findIndex(
        e.target.parentNode.parentNode.children,
        e.target.parentNode
      );
      // then next will be the HTML element in the n + 1 row
      // and you can decide to focus on the right or the left one
      // depending on whether the starting one is even or odd
      next = e.target.parentNode.parentNode.children
        .item(nextF + 1)
        .children.item(nextF % 2 === 0 ? 0 : 1);
    } else if (e.key === "ArrowUp") {
      // algorithm to move the focus up similar to the one to move it down
      let nextF = findIndex(
        e.target.parentNode.parentNode.children,
        e.target.parentNode
      );
      next = e.target.parentNode.parentNode.children
        .item(nextF - 1)
        .children.item(nextF % 2 === 0 ? 0 : 1);
    } else if (e.key === "Backspace") {
      if (e.target.value === "") {
        deleteRow();
      }
    } else if (e.key === "Enter") {
      addRow();
    } else {
      next = { focus: () => "placeholder" };
    }
    try {
      next.focus();
    } catch (e) {
      console.log(e);
    }
  };

  const addRow = () => {
    props.updateParams([...params, { name: "name", type: "type" }]);
    setParams((prevParams) => [...prevParams, { name: "name", type: "type" }]);
  };

  const deleteRow = () => {
    props.updateParams(
      params.filter((param) => params.indexOf(param) == prevParams.length - 1)
    );
    setParams((prevParams) =>
      prevParams.filter(
        (param) => prevParams.indexOf(param) == prevParams.length - 1
      )
    );
  };

  const updateParamNameView = (name, paramIndex) => {
    props.updateParamName(name, paramIndex);
    setParams((prevParams) => {
      return prevParams.map((param, index) => {
        if (index === paramIndex) {
          param.name = name;
        }
        return param;
      });
    });
  };

  const updateParamTypeView = (type, paramIndex) => {
    props.updateParamType(type, paramIndex);
    setParams((prevParams) => {
      return prevParams.map((param, index) => {
        if (index === paramIndex) {
          param.type = type;
        }
        return param;
      });
    });
  };

  const updateSignatureCommentView = (comment) => {
    props.updateSignatureComment(comment);
    setSignatureComment(comment);
  };

  return (
    <DesignNotes>
      <h3>{props.objectName}</h3>
      <div className="flex-row-start">
        <Badge>
          <img
            src="https://uploads-ssl.webflow.com/612b579592e3bf93283444b6/612b69f61d22d5ca878550af_chevron-right.svg"
            loading="lazy"
            alt=""
            className="image-2-copy-copy"
          />
        </Badge>
        <p>Description</p>
      </div>
      <textarea
        className="class"
        value={props.objectComment}
        onChange={(e) => props.updateObjectComment(e.target.value)}
      />
      <div className="flex-row-around">
        <CheckBox
          label="set dataclass"
          checked={props.objectDataclassStatus}
          onCheckBoxClicked={props.onCheckBoxClicked}
        />
      </div>
      <div className="flex-row-start">
        <Badge>
          <img
            src="https://uploads-ssl.webflow.com/612b579592e3bf93283444b6/612b69f61d22d5ca878550af_chevron-right.svg"
            loading="lazy"
            alt=""
            className="image-2-copy-copy"
          />
        </Badge>
        <p>
          {props.gridTable[props.currentRowIndex].signature === ""
            ? "signature"
            : props.gridTable[props.currentRowIndex].signature}{" "}
          params
        </p>
      </div>
      <textarea
        value={signatureComment}
        onChange={(e) => updateSignatureCommentView(e.target.value)}
      />
      {params.map((param, index) => {
        return (
          <div key={index} className="flex-row-around margin-small">
            <input
              value={param.name}
              onChange={(e) => updateParamNameView(e.target.value, index)}
              onKeyDown={(e) => handleNavigation(e)}
            ></input>
            <input
              value={param.type}
              onChange={(e) => updateParamTypeView(e.target.value, index)}
              onKeyDown={(e) => handleNavigation(e)}
            ></input>
            <div className="add-row-btn" onClick={addRow}>
              <i className="fas fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        );
      })}
    </DesignNotes>
  );
};

export default ModalCard;

//TODO: for readability the handleNavigation method can be turned into a dictionary
