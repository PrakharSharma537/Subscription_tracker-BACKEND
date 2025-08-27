import { Router } from "express";
import {getUsers,getUser,createUser
       ,updateUser,deleteUser} from '../controllers/user.controller.js'
import {authorize} from '../middlewares/auth.js'

const userRouter  = Router();

userRouter.get('/',getUsers)

userRouter.get('/:id',authorize,getUser)

userRouter.post('/',createUser)

userRouter.put('/:id',authorize,updateUser)

userRouter.delete('/:id',authorize,deleteUser)

export default userRouter;