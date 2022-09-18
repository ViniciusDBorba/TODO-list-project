import "../../../styles/custom-input.css"

export const CustomInput = ({name, value, setter, errorMessage = "", secret = false, required = false}) => {

    const renderErrorMessage = () => {
        if (errorMessage) {
            return (<p className='input-error-message' data-testid={`${name}-error-message`}>{errorMessage}</p>)
        }
    } 

    return (
        <div className="input-group">
            <label htmlFor={name}>{name}</label>    
            <input type={secret ? "password" : "text"} 
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