import "../../../styles/custom-input.css"

export const CustomInput = ({name, value, setter}) => {

    return (
        <div className="input-group">
            <label htmlFor={name}>{name}</label>    
            <input type="text" 
                id={name} 
                name={name}
                value={value} 
                placeholder={`Enter ${name}`}
                onChange={(event) => {
                    if (!setter) return
                    setter(event.target.value)
                }}    
            />
        </div>
    )
}