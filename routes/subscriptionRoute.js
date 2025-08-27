import { Router } from "express";
import {authorize} from '../middlewares/auth.js'
import {cancelSubscription, createSubscription,deleteSubscription,getSubscription,getUserSubscription, updateSubscription} from '../controllers/subscription.controller.js'
const subscriptionRouter = Router();

subscriptionRouter.get('/',getSubscription)

subscriptionRouter.get('/user/:id',authorize,getUserSubscription)

subscriptionRouter.post('/',authorize,createSubscription)

subscriptionRouter.put('/:id',updateSubscription)

subscriptionRouter.delete('/:id',authorize,deleteSubscription)

subscriptionRouter.post('/cancel/:id',authorize,cancelSubscription)


export default subscriptionRouter;