import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { useState } from 'react';

export const LoginCard = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const {email, password} = document.forms[0]
        console.log(`${email.value} ${password.value}`)
    }

    return (
        <SimpleCard title="Login">
            <form onSubmit={handleSubmit}>
                <CustomInput name="email" value={email} setter={setEmail}/>
                <CustomInput name="password" value={password} setter={setPassword}/>
                <div className="form-actions-wrapper">
                    <CustomButton 
                        primary={false}
                        text="Register"
                    />
                    <CustomButton
                        text="Submit"
                    />
                </div>
            </form>
        </SimpleCard>
      );
};


