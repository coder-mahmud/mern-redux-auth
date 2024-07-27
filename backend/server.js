import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import { notFound,errHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';

connectDB();
let PORT = process.env.PORT

const app = express();
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users/', userRoutes)

app.get('/',(req,res) =>{
  res.status(200).json({"message":"Oi mia koi?"})
})


app.use(notFound);
app.use(errHandler);


app.listen(PORT, ()=>{console.log(`Server Running on port ${PORT}`)})