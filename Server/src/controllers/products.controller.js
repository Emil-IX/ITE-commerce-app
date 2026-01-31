import connection from '../config/db.js';
import cloudinary from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const { rows } = await connection.query('SELECT * FROM Products');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error });
    }
}

export const getOneproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await connection.query('SELECT * FROM Products WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error });
    }
}

export const createProduct = async (req, res) => {
    try {
        const resultCloudinary = await cloudinary.uploader.upload(req.file.path, {
            folder: 'e-commerce'
        });

        const { name, price, description, category, stock } = req.body;

        if (!name || !price || !description || !resultCloudinary || !category || !stock) {
            return res.status(400).json({ message: 'All field Must be filled' });
        }

        const sql = 'INSERT INTO Products (name, price, description, image_url, public_id, category, stock) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id';
        const values = [name, price, description, resultCloudinary.secure_url, resultCloudinary.public_id, category, stock];

        const { rows } = await connection.query(sql, values);

        res.status(201).json({
            message: 'Product was created successfully',
            product: {
                id: rows[0].id,
                name,
                price,
                description,
                category,
                stock,
                image_url: resultCloudinary.secure_url,
                public_id: resultCloudinary.public_id
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, stock } = req.body;

        if (!name && !price && !description && !category && !stock) {
            return res.status(400).json({ message: 'Must have at least one field completed' });
        }

        let sql = 'UPDATE Products SET ';
        const values = [];
        let count = 1;

        if (name) { sql += `name = $${count++}, `; values.push(name); }
        if (price) { sql += `price = $${count++}, `; values.push(price); }
        if (description) { sql += `description = $${count++}, `; values.push(description); }
        if (category) { sql += `category = $${count++}, `; values.push(category); }
        if (stock) { sql += `stock = $${count++}, `; values.push(stock); }

        sql = sql.slice(0, -2);
        sql += ` WHERE id = $${count}`;
        values.push(id);

        const result = await connection.query(sql, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product was updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error });
    }
}

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await connection.query("SELECT public_id FROM Products WHERE id = $1", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (rows[0].public_id) {
            await cloudinary.uploader.destroy(rows[0].public_id);
        }

        await connection.query("DELETE FROM Products WHERE id = $1", [id]);
        res.status(200).json({ message: "Product was deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error });
    }
}