import express  from 'express'
import connectDB from './config/db.js'



//This is the server app from express
const app = express()

//mySQL db
connectDB()

//For json
app.use(express.json())








export default app