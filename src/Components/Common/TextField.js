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
        className,
        placeholder = "",
        min, max,
        unit
    } = props;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && <div className="label">{label}</div>}
            <div className={`position-relative`}>
                {icon && <img src={icon} className="input-icon" />}
                <input placeholder={placeholder} name={name} value={value} type={type !== "date" && type !== "time" ? type : "text"} onChange={onChange} key={label} min={min} max={max}
                    onFocus={(e) => { if (type === "date" || type === "time") e.target.type = type; }}
                    onKeyUp={onKeyUp ? onKeyUp :
                        (type === "number" ?
                            ({ target, key }) => {
                                if (key === "." || key === "e" || key === "E" || key === "+" || key === "-") {
                                    target.value = "";
                                    return;
                                }
                            }
                            :
                            () => { return; })}
                />
                {unit && <div className="unit-block">
                    <span className="unit-text">{unit}</span>
                </div>}
            </div>
            {error && <div className="error-msg">{error}</div>}
        </div>
    );
}
