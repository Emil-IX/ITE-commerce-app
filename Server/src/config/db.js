import mysql from 'mysql2/promise'
import 'dotenv/config'
import  Chalk  from "chalk";
import chalk from 'chalk';




const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        })
        console.log(chalk.yellow.bold(`MySQL connection was success`))
        return connection

    } catch (error) {
        console.log('DB error:', error)
        process.exit(1)
    }
}




export default connectDB