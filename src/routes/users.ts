import { requireSignin } from "./../middlewares/userAuth";
import { Router } from "express";
const router: Router = Router();

import {
  createUser,
  getAllUsers,
  showUser,
  deleteUser,
} from "./../controllers/userController";

router.post("/create", createUser);
router.get("/all", [requireSignin], getAllUsers);
router.get("/:id", [requireSignin], showUser);
router.delete("/delete/:id", [requireSignin], deleteUser);

export const userRouter: Router = router;
