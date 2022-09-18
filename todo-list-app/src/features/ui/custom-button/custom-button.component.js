import "../../../styles/custom-button.css"

export const CustomButton = ({text, onClick, testid, primary = true, className = ""}) => {
    return ( 
        <input 
            type={primary ? "submit" : "button"}
            className={`custom-buttom ${className}`}
            value={text}
            data-testid={testid}
            onClick={() =>{
                if (!onClick) return
                onClick()
            }}
        />
    )
}