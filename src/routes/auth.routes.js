import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post('/register', validateSchema, register);
router.post('/login', validateSchema, login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
export default router;