import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const RegisterCard = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()

        const {name, email, password} = document.forms[0]
        console.log(`${name.value} ${email.value} ${password.value}`)
    }

    const onCancel = () => {
        navigate("/login")
    }

    return (
        <SimpleCard title="Register">
            <form onSubmit={onSubmit}>
                <CustomInput name="name" value={name} setter={setName}/>
                <CustomInput name="email" value={email} setter={setEmail}/>
                <CustomInput name="password" value={password} setter={setPassword}/>
                <div className="form-actions-wrapper">
                    <CustomButton 
                        primary={false}
                        text="Cancel"
                        onClick={onCancel}
                    />
                    <CustomButton
                        text="Submit"
                    />
                </div>
            </form>
        </SimpleCard>
      );
};


