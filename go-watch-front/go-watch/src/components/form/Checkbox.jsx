import React from 'react';
import PropTypes from 'prop-types';

export function Checkbox(props) {
    const { name, value, onChange, checked, title } = props;

    return (
        <div className="form-check">
            <input
                id={name}
                className="form-check-input"
                type="checkbox"
                value={value}
                name={name}
                onChange={onChange}
                checked={checked}
            />
            <label className="form-check-label" htmlFor={name}>
                {title}
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

