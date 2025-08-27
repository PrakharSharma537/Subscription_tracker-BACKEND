import {Router} from 'express'
import { sendReminders } from '../controllers/workflow.controller.js';
const workflowRouter = Router();

workflowRouter.get('/send',sendReminders)
export default workflowRouter;