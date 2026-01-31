import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'
import chalk from 'chalk';

const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432, 
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const connection = new Pool(poolConfig);

const connectDB = async () => {
    try {
        await connection.query('SELECT 1');
        console.log(chalk.blue.bold(`PostgreSQL Pool connected successfully`));
    } catch (error) {
        console.log(chalk.red.bold('DB Error:'), error);
        process.exit(1);
    }
}

export default connection;
export { connectDB };