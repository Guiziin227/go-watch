import PropTypes from "prop-types";


export function Select(props){

    const {name, title, value, onChange, placeHolder, options, errorDiv, errorMsg} = props

    return(

        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {title}
            </label>

            <select className="form-select" name={name} id={name} value={value} onChange={onChange}>
                <option value="">{placeHolder}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </select>
        <div className={errorDiv}>{errorMsg}</div>
        </div>

    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeHolder: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.string.isRequired
        })
    ).isRequired,
    errorDiv: PropTypes.string,
    errorMsg: PropTypes.string,
};

Select.defaultProps = {
    placeHolder: '',
    errorDiv: '',
    errorMsg: '',
};