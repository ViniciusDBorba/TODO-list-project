
const { createUser } = require('../services/user-service')

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
})