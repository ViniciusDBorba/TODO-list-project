import "../../../styles/custom-checkbox.css"

export const CustomCheckbox = ({name, checked, onChange, className = ""}) => {

    return (
        <input 
                type="checkbox" 
                className={`custom-checkbox ${className}`}
                id={name} 
                name={name}
                data-testid={name}
                defaultChecked={checked}
                onChange={() => {
                    if (!onChange) return
                    onChange(!checked)
                }}
            />
    )
}