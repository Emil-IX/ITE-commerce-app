import express  from 'express'
import connectDB from './config/db.js'
import productoRoute from './routes/product.routes.js'
 ''



//This is the server app from express
const app = express()

//mySQL db
connectDB()

//For json
app.use(express.json())




app.use('/api/products', productoRoute )




export default app