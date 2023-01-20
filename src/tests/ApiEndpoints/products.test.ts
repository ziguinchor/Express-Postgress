import express, { Request, response, Response } from "express";
const app = express();
import supertest from 'supertest';


const request  = supertest(app)




describe("products endpoints", () => {

    describe("endpoint /api/products/all", () => {
       it('retrieve all products', async () => {
          const response = await request.get('/api/products/all')
          expect(response.status)
       })
    })

    describe("endpoint /api/products/:id", () => {
        it('retreive one product by id', async () => {
            const response = await request.get('/api/products/2')
            expect(response.status) 
        })
    })

    describe("endpoint /api/products/delete/:id", () => {
        it('delete product by id', async () => {
            const response = await request.delete('/api/products/delete/2')
            expect(response.status)
        })
    })

    describe("endpoint /api/products/create", () => {
        it('add product to database', async () => {
          const response = await request.post('/api/products/create')
          expect(response.status)
        })
    })

    describe("endpoint /api/products/update/:id", () => {
        it('update product', async () => {
          const response = await request.put('/api/products/2')
          expect(response.status)
        })
    })

})