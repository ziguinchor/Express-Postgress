import { requireSignin } from './../middlewares/userAuth';
import { Router } from 'express'
const router: Router = Router()


import { createProduct, deleteProduct, getAllProduct, showProduct, updateProduct } from './../controllers/productController';



router.post('/create',createProduct)
router.get('/all',[requireSignin],getAllProduct)
router.get('/:id',[requireSignin],showProduct)
router.put('/update/:id',[requireSignin],updateProduct)
router.delete('/delete/:id',[requireSignin],deleteProduct)


export const productsRouter: Router = router;



