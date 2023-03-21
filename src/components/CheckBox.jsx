import React from "react";
import { CheckBoxElement } from "./StyledElements";

const CheckBox = (props) => {
  return (
    <CheckBoxElement>
      <label className="container">
        <input type="checkbox" checked={"checked" ? props.clicked : ""} />
        <span className="checkmark" onClick={props.onCheckBoxClicked}></span>
        <p>{props.label}</p>
      </label>
    </CheckBoxElement>
  );
};

export default CheckBox;
