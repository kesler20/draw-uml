import { CheckBoxElement } from "./StyledElements";

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onEventToggle: () => void;
};

const CheckBox = (props: CheckBoxProps) => {
  return (
    <CheckBoxElement>
      <label className="container">
        <input type="checkbox" checked={props.checked} readOnly />
        <span className="checkmark" onClick={props.onEventToggle}></span>
        <p>{props.label}</p>
      </label>
    </CheckBoxElement>
  );
};

export default CheckBox;
