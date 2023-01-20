import { User } from "../../models/user";
const user = new User()


describe('Model User', () => {

   describe('create user', () => {
    it('add new user to database', () => {
        const response = user.createUser({firstName:"fouad", lastName:"ziko", email: "fouad@email.com", password: "00000"})
            expect(response)
    })
   })

   describe('get Users', () => {
    it('retrieve Users list', () => {
        const response = user.gestUsers()
        expect(response)
    })
   })

   describe('user by id', () => {
    it('retrieve User by id', () => {
        const response = user.userById(1)
        expect(response)
    })
   })

   describe('user delete', () => {
    it('delete user from database', () => {
        const response = user.userDelete(1)
        expect(response)
    })
   })
   
   describe('hash password ', () => {
    it('hash_password', () => {
        const response = user.hash_password("0000")
        expect(response)
    })
   })

})