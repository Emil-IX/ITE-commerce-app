import { json } from 'express';
import connection from '../config/db.js';





//get all products
export const getAllProducts = async (req, res) => {

    try {
        const [row] = await connection.execute('SELECT * FROM Products')
        res.status(200).json(row)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }


}


export const createProduct = async (req, res) => {

    const { name, price, description, image_url, stock } = req.body



    try {
        const sql = 'INSERT INTO Products (name, price, description, image_url, stock) VALUES(?,?,?,?,?)'

        const values = [name, price, description, image_url, stock]

        const [result] = await connection.execute(sql, values)

        res.status(201).json({
            message: 'Product was created successly',
            productId: result.insertId,
            product: {   
                name, price, description, image_url, stock
            }
        })


    } catch (error) {
        res.status(500), json({ message:'Internal server error' })
    }
}