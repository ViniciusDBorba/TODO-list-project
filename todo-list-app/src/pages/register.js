import { RegisterCard } from '../features/users/register/register-card.component';
import { SimpleModal } from '../features/ui/simple-modal/simple-modal.component';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../styles/register.css'

export const Register = () => {
    const [registerResponse, setRegisterResponse] = useState(null)
    const navigate = useNavigate()

    const onRegisterResponse = (response) => {
        setRegisterResponse({
            status: response.status, 
            title: response.status === 200 ? "Success!" : "Error!",
            text: response.data
        })
    }

    const getRegisterResponseModalAction = (responseStatus) => {
        if (responseStatus === 200) {
            navigate("/login")
        } else {
            setRegisterResponse(null)
        }
    }

    const renderRegisterResponseModal = () => {
        if (registerResponse != null) {
            return (<SimpleModal 
                        title={registerResponse.title} 
                        message={registerResponse.text}
                        action={registerResponse.status === 200 ? "Login" : "Close"}
                        onAction={() => getRegisterResponseModalAction(registerResponse.status)}
                    />)
        }
    }

    return (
        <div className="Register">
            <RegisterCard onResponse={onRegisterResponse}/>
            {renderRegisterResponseModal()}
        </div>
      );
};


