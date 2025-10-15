import app from "./server.js";
import  Chalk  from "chalk";
import dotenv  from 'dotenv'
dotenv.config()




const port = process.env.PORT || 3000


app.listen(port, ()=> {

    console.log( Chalk.white.bold(`Server is running on port: ${port}`))
})