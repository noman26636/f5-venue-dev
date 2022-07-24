import React from 'react';
import Select from 'react-select'

const MultiselectDD = (props) => {
    const { options, name, } = props
    return (
        <Select options={options} isMulti name={name} className="multi-select" classNamePrefix="multi-select" />
    );
};

export default MultiselectDD;