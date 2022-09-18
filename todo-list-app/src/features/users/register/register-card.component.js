import { SimpleCard } from '../../ui/simple-card/simple-card.component';
import { CustomInput } from '../../ui/custom-input/custom-input.component';
import { CustomButton } from '../../ui/custom-button/custom-button.component';
import { useAuth } from '../auth/auth.context';
import { registerUser } from '../users.service';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export const RegisterCard = ({onResponse}) => {
    const { user } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalidName, setInvalidName] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const isValueValid = (value) => {
        return value && value.trim()
    }
    
    const formIsComplete = () => {
        let formIsComplete = true

        if (!isValueValid(name)) {
            setInvalidName(true)
            formIsComplete = false
        } else {
            setInvalidName(false)
        }

        if (!isValueValid(email)) {
            setInvalidEmail(true)
            formIsComplete = false
        }

        if (!isValueValid(password)) {
            setInvalidPassword(true)
            formIsComplete = false
        } else {
            setInvalidPassword(false)
        }

        return formIsComplete
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S{2,}/.test(email);
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if (!formIsComplete()) {
            return;
        }
                
        if (isValidEmail(email)) {
            setInvalidEmail(false)
            registerUser(name, email, password).then(res => {
                onResponse(res)
            }).catch(err => {
                onResponse(err.response)
            })
        } else {
            setInvalidEmail(true)
        }
    }

    const onChangeName = (value) => {
        if (invalidName) {
            setInvalidName(false)
        } 
        setName(value)
    }

    const onChangeEmail = (value) => {
        if (isValidEmail(value) && invalidEmail) {
            setInvalidEmail(false)
        } 
        setEmail(value)
    }

    const onChangePassword = (value) => {
        if (invalidPassword) {
            setInvalidPassword(false)
        } 
        setPassword(value)
    }

    const onCancel = () => {
        navigate("/login")
    }

    return (
        <SimpleCard title="Register" testid="register-card">
            <form onSubmit={onSubmit}>
                <CustomInput name="name" value={name} setter={onChangeName} errorMessage={invalidName ? "Invalid name" : ""} required/>
                <CustomInput name="email" value={email} setter={onChangeEmail} errorMessage={invalidEmail ? "Invalid email" : ""} required/>
                <CustomInput name="password" value={password} setter={onChangePassword} errorMessage={invalidPassword ? "Invalid password" : ""} secret required/>
                <div className="form-actions-wrapper">
                    <CustomButton 
                        testid="cancelBt"
                        primary={false}
                        text="Cancel"
                        onClick={onCancel}
                    />
                    <CustomButton
                        testid="registerBt"
                        text="Submit"
                    />
                </div>
            </form>
        </SimpleCard>
      );
};


