import React from 'react';
import PropTypes from 'prop-types';

// the most interesting thing here is what happens afetr the onChange
// handler is clicked.
// When is this invoked?
const Picker = ({ value, onChange, options }) => {
    debugger;
    return (
        <span>
            <h1>{value}</h1>
            <select onChange={e => onChange(e.target.value)} value={value}>
                {options.map(option => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </span>
    );
};

Picker.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Picker;
