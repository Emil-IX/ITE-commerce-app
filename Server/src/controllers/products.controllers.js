import { json } from 'express';
import connection from '../config/db.js';
import cloudinary from "../config/cloudinary.js";





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

        const resultCloudinary = await cloudinary.uploader.upload(req.file.path, {
            folder: 'e-commerce'
        })

        const { name, price, description, category, stock } = req.body



        if (!name || !price || !description || !resultCloudinary || !category || !stock) {
            return res.status(400).json({ message: 'All field Must be filled' })
        }

        const sql = 'INSERT INTO Products (name, price, description, image_url, category, public_id, stock) VALUES(?,?,?,?,?,?,?)'

        const values = [name, price, description, resultCloudinary.secure_url, resultCloudinary.public_id, category,stock]

        const [result] = await connection.execute(sql, values)

        res.status(201).json({
            message: 'Product was created successly',
            product: {
                id: result.insertId,
                name,
                price,
                description,
                category,
                stock,
                image_url: resultCloudinary.secure_url,
                public_id: resultCloudinary.public_id,
                log:' It is done'
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error })
    }
}



//Update products
export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params
        const { name, price, description, category, stock } = req.body

        if (!name && !price && !description && !category && !stock) {
            return res.status(400).json({ message: 'Must have atleast one field completed' })
        }

        let sql = 'UPDATE Products SET '
        const value = []

        if (name) {
            sql += 'name = ?, '
            value.push(name)
        }

        if (price) {
            sql += 'price = ?, '
            value.push(price)
        }
        if (description) {
            sql += 'description = ?, '
            value.push(description)
        }
        if (category) {
            sql += 'category = ?, '
            value.push(category)
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

        const { id } = req.params;


        const [rows] = await connection.execute(
            "SELECT public_id FROM Products WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const publicId = rows[0].public_id;


        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }


        const [result] = await connection.execute(
            "DELETE FROM Products WHERE id = ?",
            [id]
        );

        res.status(200).json({ message: "Product was deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Internar server error:', error })
    }

}