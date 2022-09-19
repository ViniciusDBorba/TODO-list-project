const { createUser } = require('../services/user.service')

jest.mock('express-validator')

describe('User service', () => {
    it('Should return save user and return saved email if user data is valid', async () => {
        const user = {
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'Teste'
        }
        const returnedEmail = await createUser(user)
        expect(returnedEmail).toBe(user.email)
    })

    it('Should not create user if name is null or empty', async () => {
        const user = {name: ' ', email: 'teste@teste.com', password: 'Teste'}
        await createUser(user).catch(e => {
            expect(e).toBe('User name can not be null or empty')
        })
    })

    it('Should not create user if email is null or empty', async () => {
        const user = {name: 'Teste', email: ' ', password: 'Teste'}
        await createUser(user).catch(e => {
            expect(e).toBe('User email can not be null or empty')
        })
    })

    it('Should not create user if password is null or empty', async () => {
        const user = {name: 'Teste', email: 'teste@teste.com', password: ' '}
        await createUser(user).catch(e => {
            expect(e).toBe('User password can not be null or empty')
        })
    })
})