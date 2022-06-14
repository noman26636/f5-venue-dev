import React, { useState } from "react";
export default function FormDropdown(props) {
  const {
    name,
    label,
    value,
    title,
    error = null,
    onChange,
    options = [],
    icon,
    order,
    key
  } = props;
  let text = "";
  if (value !== null && value !== "") {
    const index = options.map(function (e) { return e.description; }).indexOf(value);
    text = options[index].description;
  }
  const [showDropdown, setshowDropdown] = useState(false);
  return (
    <div className="dropdownBlock" style={{ order: `${order}` }} key={key}>

    </div >
  );
}
