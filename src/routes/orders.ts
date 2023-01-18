import { Router } from "express";
const router: Router = Router()


import { requireSignin } from './../middlewares/userAuth';



import { createOrder, complteOrder, deleteOrder, getAllOrders } from './../controllers/orderController';



router.post('/create/:productId',[requireSignin],createOrder)
router.patch('/completed/:id',[requireSignin],complteOrder)
router.delete('/delete/:id',[requireSignin],deleteOrder)
router.get('/all',getAllOrders)



export const ordersRouter: Router = router;