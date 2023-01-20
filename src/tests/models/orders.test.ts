import { Order } from "../../models/order";
const order = new Order()


describe('Model Order', () => {

    describe('create order', () => {
        it('add order to database', () => {
            const response = order.createOrder({quanity:10},1,1)
            expect(response)
        })
    })
 
    describe('delete', () => {
        it('delete order from database', () => {
            const response = order.delete(1)
            expect(response)
        })
    })

    describe('update', () => {
        it('change status to order', () => {
            const response = order.update(1)
            expect(response)
        })
    })

    describe('get orders', () => {
        it('retrieve orders list from database', () => {
            const response = order.getOrders()
            expect(response)
        })
    })
})