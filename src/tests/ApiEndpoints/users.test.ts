import express, { Request, response, Response } from "express";
const app = express();
import supertest from 'supertest';


const request  = supertest(app)


describe('users endpoints', () => {

    describe('endpoint /api/users/all', () => {
        it('retrieve all users from database', async () => {
            const response = await request.get('/api/users/all')
            expect(response.status)
        })
    })

    describe('endpoint /api/users/:id', () => {
        it('retrieve one user from database by id', async () => {
            const response = await request.get('/api/users/2')
            expect(response.status)
        })
    })

    describe('endpoint /api/users/create', () => {
        it('add user to database', async () => {
            const response = await request.post('/api/users/create')
            expect(response.status)
        })
    })

    describe('endpoint /api/users/delete/:id', () => {
        it('delete user from database', async () => {
            const response = await request.delete('/api/users/delete/2')
            expect(response.status)
        })
    })

})