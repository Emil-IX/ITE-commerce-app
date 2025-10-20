import { json } from 'express';
import connection from '../config/db.js';





//Get all products
export const getAllProducts = async (req, res) => {

    try {
        const [row] = await connection.execute('SELECT * FROM Products')
        res.status(200).json(row)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error:', error })
    }


}

//Get a single product by id
export const getOneproduct = async (req, res) => {

    try {
        const { id } = req.params

        const sql = 'SELECT * FROM Products WHERE id = ?'
        const value = []
        value.push(id)

        const [result] = await connection.execute(sql, value)

        if (result.length === 0) {
            return res.status(404).json({ message: 'Products not faund' })
        }

        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ message: 'Internar server error:', error })
    }
}


//Create a new product
export const createProduct = async (req, res) => {

    try {
        const { name, price, description, image_url, stock } = req.body

        if (!name || !price || !description || !image_url || !stock) {
            return res.status(400).json({ message: 'All field Must be filled' })
        }

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
        res.status(500), json({ message: 'Internal server error:', error })
    }
}



//Update products
export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params
        const { name, price, description, image_url, stock } = req.body

        if (!name && !price && !description && !image_url && !stock) {
            return res.status(400).json({ message: 'Must have atleast one field completed' })
        }

        let sql = 'UPDATE Products SET '
        const value = []

        if (name) {
            sql += 'name = ?,'
            value.push(name)
        }

        if (price) {
            sql += 'price = ?,'
            value.push(price)
        }
        if (description) {
            sql += 'description = ?,'
            value.push(description)
        }
        if (image_url) {
            sql += 'image_url = ?,'
            value.push(image_url)
        }
        if (stock) {
            sql += 'stock = ?, '
            value.push(stock)
        }

        sql = sql.slice(0, -2)
        sql += ' WHERE id = ?'
        value.push(id)

        const [result] = await connection.execute(sql, value)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Products not faund' })
        }

        res.status(200).json({ message: 'Product was updated successly' })


    } catch (error) {
        res.status(500).json({ message: 'Internar server error:', error })
    }

}


//Delete product by id
export const deleteProducts = async (req, res) => {

    try {

        const { id } = req.params

        const sql = 'DELETE FROM Products WHERE id = ?'

        const value = []
        value.push(id)

        const [result] = await connection.execute(sql, value)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Products not faund' })
        }

        res.status(201).json({ message: 'Product was deleted successly', })


    } catch (error) {
        res.status(500).json({ message: 'Internar server error:', error })
    }

}