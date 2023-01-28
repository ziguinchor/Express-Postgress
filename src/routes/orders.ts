import { Router } from "express";
const router: Router = Router();

import { requireSignin } from "./../middlewares/userAuth";

import {
  createOrder,
  complteOrder,
  deleteOrder,
  getAllOrders,
} from "./../controllers/orderController";

router.post("/", [requireSignin], createOrder);
router.patch("/completed/:id", [requireSignin], complteOrder);
router.delete("/delete/:id", [requireSignin], deleteOrder);
router.get("/all", [requireSignin], getAllOrders);

export const ordersRouter: Router = router;
