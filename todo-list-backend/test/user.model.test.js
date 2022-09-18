const { saveUser, getUser, clearUserCollection } = require('../models/user.model')

describe('User model', () => {

    beforeEach(() => {
        clearUserCollection()
    })

    it('Should save user data if email is not null or empty', async () => {
        const user = {name: 'Teste', email: 'teste@teste.com', password: 'Teste'}
        const returnedEmail = await saveUser(user)
        expect(returnedEmail).toBe(user.email)
        expect(getUser(returnedEmail)).not.toBe(null)
    })
    
    it('Should not save user data if email is null or empty', async () => {
        const user = {name: 'Teste', email: '', password: 'Teste'}
        await saveUser(user).catch(e => {
            expect(e).toBe('Null or empty email')
        })
        expect(getUser(user.email)).toBe(undefined)
    })
    
})