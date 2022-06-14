import React from "react";
import Preloader from '../../Assets/images/loaderWhite.svg';
export default function Button(props) {
  let {
    label,
    onClick,
    icon,
    disabled = false,
    showBtnLoader = false,
    className,
    ...other
  } = props;
  return (
    <span className="btn-wrap">
      <button type="button" className={`button-primary ${className}`} onClick={onClick}>{label}</button>
      {icon && <img src={icon} className="btn-icon" />}
      {showBtnLoader && <img src={Preloader} className="btn-loader" alt="" />}
    </span>
  );
}
