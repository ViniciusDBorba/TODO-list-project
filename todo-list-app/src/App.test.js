import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App'

const clickButton = (testId) => {
    const button = screen.getByTestId(testId)
    fireEvent.click(button)
}

describe('App', () => {

    beforeEach(() => {
        render(<App />)
    });

    it('Should open register page when click on register button', () => {
        clickButton("registerBt")
    
        expect(screen.getByTestId("register-card")).toBeInTheDocument()
    })

    it('Should return to login page if click in cancel button on register page', () => {
        clickButton("registerBt")
        clickButton("cancelBt")
    
        expect(screen.getByTestId("login-card")).toBeInTheDocument()
    })

})


