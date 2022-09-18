import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import { Register } from './register';
import {registerUser } from '../features/users/users.service';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../features/users/auth/auth.context';

jest.mock('../features/users/users.service')
jest.mock('../features/users/auth/auth.context')
jest.mock('react-router-dom')



const fillRegisterForm = (nameValue, emailValue, passwordValue) => {
    const registerForm = screen.getByTestId('register-form')
    const nameInput = getByTestId(registerForm, "name")
    fireEvent.change(nameInput, {target: { value: nameValue }})
    const emailInput = getByTestId(registerForm, "email")
    fireEvent.change(emailInput, {target: { value: emailValue }})
    const passwordInput = getByTestId(registerForm, "password")
    fireEvent.change(passwordInput, {target: { value: passwordValue }})
}

const clickButton = (testId) => {
    const button = screen.getByTestId(testId)
    fireEvent.click(button)
}

describe('Register Page', () => {
    let navigateMock
    beforeEach(() => {
        navigateMock = jest.fn().mockImplementation(() => {})
        useNavigate.mockImplementation(() => {return navigateMock})
        useAuth.mockReturnValue({user: null})
        render(<Register />)
    });

    it('Should navigate to login page when click cancel', () => {
        clickButton("cancelBt")
        expect(navigateMock).toHaveBeenCalledWith('/login')
    })

    it('Should submit user to api if form is filled and email is valid', async () => {
        
        registerUser.mockReturnValue(Promise.resolve(({status: 200, data:""})))
        fillRegisterForm('Teste', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
    
        await waitFor(() => screen.getByTestId('simple-modal'))
        expect(registerUser).toHaveBeenCalledTimes(1)
    })

    it('Should show modal on submit user to api', async () => {
        registerUser.mockReturnValue(Promise.resolve(({status: 200, data:"Teste"})))
        fillRegisterForm('Teste', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
    
        const modal = await waitFor(() => screen.getByTestId('simple-modal'))
        expect(modal).toBeInTheDocument()
    })

    it('Should navigate to login page when click on modal action if register response status is 200', async () => {
        registerUser.mockReturnValue(Promise.resolve(({status: 200, data:"Teste"})))
        fillRegisterForm('Teste', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
    
        const modalAction = await waitFor(() => screen.getByTestId('simple-modal-action'))
        fireEvent.click(modalAction)
        expect(navigateMock).toHaveBeenCalledWith('/login')
    })

    it('Should close modal when click on modal action if register response status is diferent than 200', async () => {
        registerUser.mockReturnValue(Promise.resolve(({status: 400, data:"Teste"})))
        fillRegisterForm('Teste', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
    
        
        const modal = await waitFor(() => screen.getByTestId('simple-modal'))
        const modalAction = getByTestId(modal, 'simple-modal-action')
        fireEvent.click(modalAction)
        expect(modal).not.toBeInTheDocument()
        expect(screen.getByTestId('register-card')).toBeInTheDocument()
    })

    it('Should not submit user to api if name form input is empty', () => {
        fillRegisterForm(' ', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
    
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should show error message if submit with name form input empty', () => {
        fillRegisterForm(' ', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
        
        expect(screen.getByTestId('name-error-message')).toBeInTheDocument()
    })

    it('Should not submit user to api if email form input is empty', () => {
        fillRegisterForm('Teste', ' ', 'TestePassword')
        clickButton("registerBt")
    
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should not submit user to api if email form input value is invalid', () => {
        fillRegisterForm('Teste', 'email@email.c', 'Teste')
        clickButton("registerBt")
        expect(registerUser).toHaveBeenCalledTimes(0)

        fillRegisterForm('Teste', 'email@email.', 'Teste')
        clickButton("registerBt")
        expect(registerUser).toHaveBeenCalledTimes(0)

        fillRegisterForm('Teste', 'email@.com', 'Teste')
        clickButton("registerBt")
        expect(registerUser).toHaveBeenCalledTimes(0)

        fillRegisterForm('Teste', '@email.com', 'Teste')
        clickButton("registerBt")
        expect(registerUser).toHaveBeenCalledTimes(0)

        fillRegisterForm('Teste', 'emailemail.com', 'Teste')
        clickButton("registerBt")
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should show error message if submit with envalid email form input value', () => {
        fillRegisterForm('Teste', '@email.com', 'TestePassword')
        clickButton("registerBt")
        
        expect(screen.getByTestId('email-error-message')).toBeInTheDocument()
    })

    it('Should show error message if submit with email form input empty', () => {
        fillRegisterForm('Teste', ' ', 'TestePassword')
        clickButton("registerBt")
        
        expect(screen.getByTestId('email-error-message')).toBeInTheDocument()
    })

    it('Should not submit user to api if password form input is empty', () => {
        fillRegisterForm('Teste', 'email@email.com', ' ')
        clickButton("registerBt")
    
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should show error message if submit with password form input empty', () => {
        fillRegisterForm('Teste', 'email@email.com', ' ')
        clickButton("registerBt")
        
        expect(screen.getByTestId('password-error-message')).toBeInTheDocument()
    })

    

})


