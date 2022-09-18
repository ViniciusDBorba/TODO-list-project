import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { login, getUser } from '../users.service';
import { useAuth } from '../auth/auth.context';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export const LoginCard = () => {
    const { user, setUser } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const updateUserAndLogin = () => {
        getUser(email).then(res => {
            console.log(res)
            if (res.status === 200) {
                setUser(res.data)
                navigate('/')
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        login(email, password).then(res => {
            if (res.status === 200) {
                updateUserAndLogin()
            }
        })
    }

    const onClickRegister = () => {
        navigate("/register")
    }

    return (
        <SimpleCard title="Login" testid="login-card">
            <form onSubmit={onSubmit}>
                <CustomInput name="email" value={email} setter={setEmail} required/>
                <CustomInput name="password" value={password} setter={setPassword} secret required/>
                <div className="form-actions-wrapper">
                    <CustomButton 
                        primary={false}
                        text="Register"
                        onClick={onClickRegister}
                        testid="registerBt"
                    />
                    <CustomButton
                        testid="loginBt"
                        text="Submit"
                    />
                </div>
            </form>
        </SimpleCard>
      );
};


