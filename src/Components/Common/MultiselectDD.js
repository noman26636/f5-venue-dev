import React from 'react';
import Select from 'react-select'

const MultiselectDD = (props) => {
    const { options, name, isMulti = true, onChange, value, isClearable = true, placeholder } = props;

    return (
        <Select options={options} isMulti={isMulti} name={name} className="multi-select" classNamePrefix="multi-select"
            onChange={onChange} value={value} isClearable={isClearable} placeholder={placeholder}
        />
    );
};

export default MultiselectDD;