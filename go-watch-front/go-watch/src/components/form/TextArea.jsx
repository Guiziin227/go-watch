export function TextArea(props) {

    const {name,title,value, onChange, errorDiv, errorMsg} = props

    return(
        <div className="mb-3">

            <label htmlFor={name} className="form-label">
                {title}
            </label>

            <textarea className="form-control" id={name} name={name}cols="30" rows="10" value={value} onChange={onChange}/>
            <div className={errorDiv}>{errorMsg}</div>
        </div>
    )

}