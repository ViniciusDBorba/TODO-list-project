import "../../../styles/custom-input.css"

export const CustomInput = ({name, value, setter, errorMessage = "",  needLabel = true ,secret = false, required = false, className = "", inputClassName = ""}) => {

    const renderErrorMessage = () => {
        if (errorMessage) {
            return (<p className='input-error-message' data-testid={`${name}-error-message`}>{errorMessage}</p>)
        }
    } 

    const renderLabel = () => {
        if (needLabel) {
            return (
                <label htmlFor={name}>{name}</label> 
            )
        }
    }

    return (
        <div className={`input-group ${needLabel ? "" : "no-label" } ${className}`}>
            {renderLabel()}
            <input 
                type={secret ? "password" : "text"} 
                className={`custom-input ${inputClassName}`}
                id={name} 
                name={name}
                data-testid={name}
                value={value} 
                placeholder={`Enter ${name}`}
                onChange={(event) => {
                    if (!setter) return
                    setter(event.target.value)
                }}
                required={required} 
            />
            {renderErrorMessage()}
        </div>
    )
}