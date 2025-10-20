import mysql from 'mysql2/promise'
import 'dotenv/config'
import chalk from 'chalk';

//Define the Pool configuration
const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

//Create the Connection Pool 
const connection = mysql.createPool(poolConfig);

// Function to test the connection (optional, called in the main server file)
const connectDB = async () => {
    try {
        await connection.execute('SELECT 1');
        console.log(chalk.yellow.bold(`MySQL Pool connected successfully`));
    } catch (error) {
        console.log(chalk.red.bold('DB Error:'), error);
        process.exit(1);
    }
}


export default connection;


export { connectDB };