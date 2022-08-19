import React from "react";
import dropdownIcon from "../../Assets/icons/dropdownArrow.svg";

export default function FormDropdown(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options = [],
    icon,
  } = props;
  return (
    <div className="dropdownBlock" key={label}>
      <select name={name} onChange={onChange} value={value}>
        {label && <option value={0}>{label}</option>}
        {options?.map((item, i) => <option value={item.id} key={i}>{item.name}</option>
        )
        }
      </select>
      {icon && <img alt="" src={icon} className="input-icon" />}
      <img alt="" src={dropdownIcon} className="dropdownIcon" />
      {error && <div className="error-msg">{error}</div>}
    </div >
  );
}
