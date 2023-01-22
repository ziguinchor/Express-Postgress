import express, { Request, response, Response } from "express";
export const app = express();
import supertest from 'supertest';


const request  = supertest(app)

describe('orders endpoints', () => {

    describe('endpoint /api/orders/create/:productId', () => {
        it('add order to database', async () => {
            const response = await request.post('/api/orders/create/2')
            expect(response.status)
        })
    })

    describe('endpoint /api/orders/completed/:id', () => {
        it('status order', async () => {
            const response = await request.patch('/api/orders/completed/1')
            expect(response.status)
        })
    })

    describe('endpoint /api/orders/delete/:id', () => {
        it('delete order', async () => {
            const response = await request.delete('/api/orders/delete/1')
            expect(response.status)
        })
    })

    describe('endpoint /api/orders/all', () => {
        it('retrieve all orders from database', async () => {
            const response = await request.get('/api/orders/all')
            expect(response.status)
        })
    })
})
