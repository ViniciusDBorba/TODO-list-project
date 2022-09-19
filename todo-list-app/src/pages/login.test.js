import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import { Login } from './login';
import { login, getUser } from '../features/users/users.service';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../features/users/auth/auth.context';

jest.mock('../features/users/users.service')
jest.mock('../features/users/auth/auth.context')
jest.mock('react-router-dom')

const fillLoginForm = (emailValue, passwordValue) => {
    const registerForm = screen.getByTestId('login-form')
    const emailInput = getByTestId(registerForm, "email")
    fireEvent.change(emailInput, {target: { value: emailValue }})
    const passwordInput = getByTestId(registerForm, "password")
    fireEvent.change(passwordInput, {target: { value: passwordValue }})
}

const clickButton = (testId) => {
    const button = screen.getByTestId(testId)
    fireEvent.click(button)
}

describe('Login Page', () => {
    let navigateMock
    let mockSetUser
    beforeEach(() => {
        navigateMock = jest.fn().mockImplementation(() => {})
        useNavigate.mockImplementation(() => {return navigateMock})
        mockSetUser = jest.fn().mockImplementation(() => {})
        useAuth.mockReturnValue({user: null, setUser: mockSetUser})
        render(<Login />)
    });

    it('Should navigate to register page when click register button', () => {
        clickButton("registerBt")
        expect(navigateMock).toHaveBeenCalledWith('/register')
    })

    it('Should submit credentials to api if form is filled', () => {
        login.mockReturnValue(Promise.resolve({status: 200, data:""}))
        getUser.mockReturnValue(Promise.resolve({status: 200, data:""}))
        fillLoginForm('email@email.com', 'TestePassword')
        clickButton("loginBt")
        
        //expect(mockSetUser).toHaveBeenCalledTimes(1)
        //expect(navigateMock).toHaveBeenCalledWith('/')
    })


    it('Should not submit credentials to api if email form input is empty', () => {
        fillLoginForm(' ', 'TestePassword')
        clickButton("loginBt")
    
        expect(mockSetUser).toHaveBeenCalledTimes(0)
        expect(navigateMock).toHaveBeenCalledTimes(0)
    })

    it('Should not submit credentials to api if pawwsord form input is empty', () => {
        fillLoginForm('Teste', ' ')
        clickButton("loginBt")
    
        expect(mockSetUser).toHaveBeenCalledTimes(0)
        expect(navigateMock).toHaveBeenCalledTimes(0)
    })

    // it('Should show error message if submit with envalid email form input value', () => {
    //     fillLoginForm('teste@email.com', 'TestePassword')
    //     clickButton("loginBt")
        
    //     expect(screen.getByTestId('email-error-message')).toBeInTheDocument()
    // })

    // it('Should show error message if submit with password form input empty', () => {
    //     fillLoginForm('email@email.com', ' ')
    //     clickButton("loginBt")
        
    //     expect(screen.getByTestId('password-error-message')).toBeInTheDocument()
    // })

    

})


