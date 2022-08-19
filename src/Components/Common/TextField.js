import React from "react";
export default function TextField(props) {
    const getFormattedDate = (date) => {
        const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${date.getFullYear()}-${month}-${day}`;
    }
    const {
        name,
        value,
        error,
        onChange,
        icon,
        type,
        label,
        onKeyUp,
        className,
        placeholder = "",
        min = 1, max = 999999,
        unit,
        maxLength = 99999,
        minDate = getFormattedDate(new Date())
    } = props;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && <div className="label">{label}</div>}
            <div className={`position-relative`}>
                {icon && <img alt="" src={icon} className="input-icon" />}
                <input placeholder={placeholder} name={name} value={value} type={type !== "date" && type !== "time" ? type : "text"}
                    onChange={onChange} key={label} min={type === "date" ? minDate : min} max={max} maxLength={maxLength}
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
