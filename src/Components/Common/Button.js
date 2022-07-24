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
    wrapperClass,
    ...other
  } = props;
  return (
    <div className={`btn-wrap ${wrapperClass}`}>
      <button type="button" className={`button-primary ${className}`} onClick={onClick} disabled={disabled}>{
        showBtnLoader ?
          <img src={Preloader} className="btn-loader" alt="" /> :
          label
      }</button>
      {icon && <img src={icon} className="btn-icon" />}
    </div>
  );
}
