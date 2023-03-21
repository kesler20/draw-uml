import React from "react";
import { CheckBoxElement } from "./StyledElements";

const CheckBox = (props) => {
  return (
    <CheckBoxElement>
      <label className="container">
        <input type="checkbox" checked={"checked" ? props.checked : ""} />
        <span className="checkmark" onClick={props.onCheckBoxClicked}></span>
        <p>{props.label}</p>
      </label>
    </CheckBoxElement>
  );
};

export default CheckBox;
