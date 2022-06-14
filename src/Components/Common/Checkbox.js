import * as React from 'react';
export default function Checkbox(props) {
    const { value, handleChange, label, name } = props;
    return (
        <label className="checkbox-wrap">
            {label}
            <input type="checkbox" value={value} onChange={handleChange} name={name} key={label} />

            <span className="checkmark"></span>
        </label>

    );
}
