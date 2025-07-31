import { Router } from "express";
import { userController } from "../controllers/user.controller";
const router = Router();

router.post("/", async (req, res) => {userController.registerUser(req, res)});

router.get("/", async (req, res) => {});

export default router;
