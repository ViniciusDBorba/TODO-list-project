import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const LoginCard = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()

        const {email, password} = document.forms[0]
        console.log(`${email.value} ${password.value}`)
    }

    const onClickRegister = () => {
        navigate("/register")
    }

    return (
        <SimpleCard title="Login">
            <form onSubmit={onSubmit}>
                <CustomInput name="email" value={email} setter={setEmail} required/>
                <CustomInput name="password" value={password} setter={setPassword} secret required/>
                <div className="form-actions-wrapper">
                    <CustomButton 
                        primary={false}
                        text="Register"
                        onClick={onClickRegister}
                    />
                    <CustomButton
                        text="Submit"
                    />
                </div>
            </form>
        </SimpleCard>
      );
};


