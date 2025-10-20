import express  from 'express'
import  { connectDB } from './config/db.js'
import productoRoute from './routes/product.routes.js'
import { swaggerUi, swaggerSpec } from "./swagger.js";
import { corsMiddleware } from './config/cors.js';



//This is the server app from express
const app = express()

//cors
app.use(corsMiddleware)

//mySQL db
connectDB()

//For json
app.use(express.json())

//documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use('/api/products', productoRoute )




export default app