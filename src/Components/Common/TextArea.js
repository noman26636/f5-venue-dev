import React from "react";
export default function TextArea(props) {
    const {
        name,
        value,
        error,
        onChange,
        icon,
        label,
        onKeyUp,
        onFocus,
        className,
        placeholder = "",
        rows,
    } = props;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && <div className="label">{label}</div>}
            {icon && <img alt="" src={icon} className="input-icon" />}
            <textarea placeholder={placeholder} name={name} value={value} onChange={onChange} key={label} rows={rows}
                onKeyUp={onKeyUp ? onKeyUp : () => { return; }} 
                onFocus={onFocus ? onFocus : () => { return; }}
                />
            {error && <div className="error-msg">{error}</div>}
        </div>
    );
}
