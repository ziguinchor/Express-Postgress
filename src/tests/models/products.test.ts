import { Product } from "../../models/product";
const product = new Product()


describe('Product Model', () => {
    
     describe('function create', () => {
         it('add product to database',  () => {
            const response = product.create({name:"pc", price:40, category: "electronique"})
            expect(response)
         })         
     })

     describe('function getProducts', () => {
        it('retrieve products list from database',  () => {
           const response = product.getProducts()
           expect(response)
        })         
    })

    describe('function getProductById', () => {
        it('retrieve one product from database by id',  () => {
           const response = product.getProductById(1)
           expect(response)
        })         
    })

    describe('function delete', () => {
        it('delete product from database',  () => {
           const response = product.delete(1)
           expect(response)
        })         
    })

    describe('function update', () => {
        it('update product',  () => {
           const response = product.update({name:"pc", price:40, category: "electronique"},1)
           expect(response)
        })         
    })
})

