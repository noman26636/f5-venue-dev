import React from "react";
export default function TextField(props) {
    const {
        name,
        value,
        error,
        onChange,
        icon,
        type,
        label,
        disabled,
        onKeyUp,
    } = props;

    return (
        <div className="input-wrapper">
            <div>{label}</div>
            <input className="" name={name} value={value} type={type} onChange={onChange} key={label} onKeyUp={onKeyUp} />
            <img src={icon} className="input-icon" />
            {error && <div className="error-msg">{error}</div>}
        </div>
    );
}
