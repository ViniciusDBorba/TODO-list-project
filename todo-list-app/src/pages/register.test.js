import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import {registerUser} from '../features/users/users.service';
import App from '../App'

jest.mock('../features/users/users.service')

const fillRegisterForm = (nameValue, emailValue, passwordValue) => {
    const nameInput = screen.getByTestId("name")
    fireEvent.change(nameInput, {target: { value: nameValue }})
    const emailInput = screen.getByTestId("email")
    fireEvent.change(emailInput, {target: { value: emailValue }})
    const passwordInput = screen.getByTestId("password")
    fireEvent.change(passwordInput, {target: { value: passwordValue }})
}

const clickButton = (testId) => {
    const button = screen.getByTestId(testId)
    fireEvent.click(button)
}

describe('Register Page', () => {

    beforeEach(() => {
        render(<App />)
        clickButton("registerBt")
    });

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
        expect(screen.getByTestId("login-card")).toBeInTheDocument()
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

    it('Should not submit user to api if name form input is empty', async () => {
        fillRegisterForm(' ', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
    
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should show error message if submit with name form input empty', async () => {
        fillRegisterForm(' ', 'email@email.com', 'TestePassword')
        clickButton("registerBt")
        
        expect(screen.getByTestId('name-error-message')).toBeInTheDocument()
    })

    it('Should not submit user to api if email form input is empty', async () => {
        fillRegisterForm('Teste', ' ', 'TestePassword')
        clickButton("registerBt")
    
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should not submit user to api if email form input value is invalid', async () => {
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

    it('Should show error message if submit with envalid email form input value', async () => {
        fillRegisterForm('Teste', '@email.com', 'TestePassword')
        clickButton("registerBt")
        
        expect(screen.getByTestId('email-error-message')).toBeInTheDocument()
    })

    it('Should show error message if submit with email form input empty', async () => {
        fillRegisterForm('Teste', ' ', 'TestePassword')
        clickButton("registerBt")
        
        expect(screen.getByTestId('email-error-message')).toBeInTheDocument()
    })

    it('Should not submit user to api if password form input is empty', async () => {
        fillRegisterForm('Teste', 'email@email.com', ' ')
        clickButton("registerBt")
    
        expect(registerUser).toHaveBeenCalledTimes(0)
    })

    it('Should show error message if submit with password form input empty', async () => {
        fillRegisterForm('Teste', 'email@email.com', ' ')
        clickButton("registerBt")
        
        expect(screen.getByTestId('password-error-message')).toBeInTheDocument()
    })

    

})


