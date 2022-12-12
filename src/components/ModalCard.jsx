import React, { useState, useEffect } from "react";
import { DesignNotes } from "./StyledElements";
import { Badge } from "./StyledElements";

const ModalCard = (props) => {
  const [params, setParams] = useState(props.rowData.params);

  useEffect(() => {
    console.log(props)
  })
  const findIndex = (collection, item) => {
    let i = 0;
    for (let j of collection) {
      if (j === item) return i;
      i++;
    }
  };

  const handleNavigation = (e) => {
    let next;
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
      let nextF = findIndex(
        e.target.parentNode.parentNode.children,
        e.target.parentNode
      );
      next = e.target.parentNode.parentNode.children
        .item(nextF + 1)
        .children.item(nextF % 2 === 0 ? 0 : 1);
    } else if (e.key === "ArrowUp") {
      let nextF = findIndex(
        e.target.parentNode.parentNode.children,
        e.target.parentNode
      );
      next = e.target.parentNode.parentNode.children
        .item(nextF - 1)
        .children.item(nextF % 2 === 0 ? 0 : 1);
    } else if (e.key === "Backspace") {
      setParams((prevParams) =>
        prevParams.filter(
          (param) => prevParams.indexOf(param) == prevParams.length - 1
        )
      );
      props.onChangeParams(params, props.index);
    } else if (e.key === "Enter") {
      setParams((prevParams) => [
        ...prevParams,
        { name: "name", type: "type" },
      ]);
      props.onChangeParams(params, props.index);
    } else {
      console.log(e.key);
    }
    try {
      next.focus();
    } catch (e) {
      console.log(e);
    }
  };

  const onBtnClicked = () => {
    setParams((prevParams) => [...prevParams, { name: "name", type: "type" }]);
    props.onChangeParams(params, props.index);
  };

  return (
    <DesignNotes>
      <h3>{props.objectData.objectName}</h3>
      <div class="flex-row-start">
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
        placeholder={props.objectData.comment}
        onChange={(e) => props.onChangeObjectComment(e.target.value)}
      />
      <div class="flex-row-start">
        <Badge>
          <img
            src="https://uploads-ssl.webflow.com/612b579592e3bf93283444b6/612b69f61d22d5ca878550af_chevron-right.svg"
            loading="lazy"
            alt=""
            className="image-2-copy-copy"
          />
        </Badge>
        <p>
          {props.rowData.signature === ""
            ? "signature"
            : props.rowData.signature}{" "}
          params
        </p>
      </div>
      <textarea
        onChange={(e) => console.log(e.target.value)}
        placeholder={props.rowData.comment}
      />
      {params.map((param, index) => {
        return (
          <div key={index} className="flex-row-around margin-small">
            <input
              placeholder={param.name}
              onKeyDown={(e) => handleNavigation(e)}
            ></input>
            <input
              placeholder={param.type}
              onKeyDown={(e) => handleNavigation(e)}
            ></input>
            <div className="add-row-btn" onClick={onBtnClicked}>
              <i className="fas fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        );
      })}
    </DesignNotes>
  );
};

export default ModalCard;
