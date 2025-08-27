import { Router } from "express";
import {signup,signin,signout} from '../controllers/auth.controller.js'
const authRoute = Router();


authRoute.post('/signup',signup)
authRoute.post('/signin',signin);
authRoute.post('/signout',signout)

export default authRoute;