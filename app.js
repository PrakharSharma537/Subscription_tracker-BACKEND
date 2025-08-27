import express from 'express';
import authRoute from './routes/authRoute.js'
import subscriptionRoute from './routes/subscriptionRoute.js'
import userRoute from './routes/userRoute.js'
import dotenv from 'dotenv'
import connectDb from './config/database.js';
import cookieParser from 'cookie-parser';
import securityMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.js';
dotenv.config()
const app = express()
const port = process.env.PORT;
connectDb();


app.use(express.json());
app.use(cookieParser())
app.use(securityMiddleware)

// Define specific routes first
app.use('/api/v1/users',userRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/subscription',subscriptionRoute);
app.use('/api/v1/workflow',workflowRouter);
// Define the catch-all route last
app.use('/',(req,res)=>{
  res.send("Welcome to Subscription tracker");
})

app.listen(port,()=>{
 console.log(`server started `)
})