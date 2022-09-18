import "../../../styles/custom-button.css"

export const CustomButton = ({text, onClick, testid, primary = true}) => {
    return ( 
        <input 
            type={primary ? "submit" : "button"}
            value={text}
            data-testid={testid}
            onClick={() =>{
                if (!onClick) return
                onClick()
            }}
        />
    )
}