import "../../../styles/custom-input.css"

export const CustomInput = ({name, value, setter, secret = false, required = false}) => {

    return (
        <div className="input-group">
            <label htmlFor={name}>{name}</label>    
            <input type={secret ? "password" : "text"} 
                id={name} 
                name={name}
                value={value} 
                placeholder={`Enter ${name}`}
                onChange={(event) => {
                    if (!setter) return
                    setter(event.target.value)
                }}
                required={required} 
            />
        </div>
    )
}