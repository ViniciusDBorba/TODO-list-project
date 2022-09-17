import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { registerUser } from '../users.service';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const RegisterCard = ({onResponse}) => {
    const [email, setEmail] = useState("")
    const [invalidEmail, setInvalidEmail] = useState(false)
    const navigate = useNavigate()

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const onSubmit = (event) => {
        event.preventDefault()
        
        const {name, email, password} = document.forms[0]
        
        if (isValidEmail(email.value)) {
            setInvalidEmail(false)
            registerUser(name.value, email.value, password.value).then(res => {
                onResponse(res)
            }).catch(err => {
                onResponse(err.response)
            })
        } else {
            setInvalidEmail(true)
        }
    }

    const onChangeEmail = (value) => {
        if (isValidEmail(value) && invalidEmail) {
            setInvalidEmail(false)
        } else if (!invalidEmail) {
            setInvalidEmail(true)
        }
        setEmail(value)
    }

    const onCancel = () => {
        navigate("/login")
    }

    return (
        <SimpleCard title="Register">
            <form onSubmit={onSubmit}>
                <CustomInput name="name" required/>
                <CustomInput name="email" value={email} setter={onChangeEmail} required/>
                {invalidEmail ? <p className='input-error-message'>Invalid email</p> : ""}
                <CustomInput name="password" secret required/>
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


