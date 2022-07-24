import React, { useEffect } from 'react';


export default function ToggleBtn(props) {
    const {
        name,
        label,
        value,
        onChange,
    } = props;
    return (
        <div className="toggle-btn-wrap">
            {/* <div className="title">{label}</div> */}
            <input type="checkbox" name={name} className="toggle-btn" value={value} onChange={onChange} key={name} />
        </div>
    );
}
