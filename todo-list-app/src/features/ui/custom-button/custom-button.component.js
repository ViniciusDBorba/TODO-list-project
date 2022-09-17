import "../../../styles/custom-button.css"

export const CustomButton = ({text, onClick, primary = true}) => {
    return ( 
        <input 
            type={primary ? "submit" : "button"}
            value={text}
            onClick={() =>{
                if (!onClick) return
                onClick()
            }}
        />
    )
}