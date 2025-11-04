import { Router } from "express";
import {
    createProduct,
    deleteProducts,
    getAllProducts,
    getOneproduct,
    updateProduct
} from "../controllers/products.controller.js";
import multer from "multer";




const router = Router()
const upload = multer({dest:'uploads/'})    




/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products 
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Error getting users
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product by its ID
 *     tags:
 *       - Products
 *     description: Returns all details of a specific product from the database based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Wireless Mouse"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 25.99
 *                 description:
 *                   type: string
 *                   example: "Ergonomic wireless mouse with 2.4GHz connection."
 *                 image_url:
 *                   type: string
 *                   example: "https://api.store.com/images/mouse.jpg"
 *                 stock:
 *                   type: integer
 *                   example: 50
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found.
 *       500:
 *         description: Internal server error or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
router.get('/:id', getOneproduct)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: This endpoint creates a new product and uploads its image to Cloudinary. It stores the product data and image URL in the database.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - stock
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product.
 *                 example: "Sports T-shirt"
 *               price:
 *                 type: number
 *                 description: Price of the product.
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 description: Product description.
 *                 example: "Lightweight and breathable training T-shirt."
 *               category:
 *                 type: string
 *                 description: product category
 *                 example: "Gaming"
 *               stock:
 *                 type: integer
 *                 description: Quantity in stock.
 *                 example: 100
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image file to upload to Cloudinary.
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product was created successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "Sports T-shirt"
 *                     price:
 *                       type: number
 *                       example: 29.99
 *                     description:
 *                       type: string
 *                       example: "Lightweight and breathable training T-shirt."
 *                     category:
 *                       type: string
 *                       example: "Gaming"
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     image_url:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v17300000/tshirt.jpg"
 *                     public_id:
 *                       type: string
 *                       example: "e-commerce/tshirt_abc123"
 *       400:
 *         description: Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields must be filled"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Error message from server"
 */

router.post('/', upload.single('image') ,createProduct)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update an existing product
 *     description: Update one or more product fields (name, price, description, stock) by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to update
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       description: Product data to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Product Name"
 *               price:
 *                 type: number
 *                 example: 99.99
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               category:
 *                 type: string
 *                 example: "Gaming"
 *               stock:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product was updated successfully"
 *       400:
 *         description: Invalid body or no fields provided
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', updateProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by its ID and removes its image from Cloudinary.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *         example: 12
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product was deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Error message from server"
 */

router.delete('/:id', deleteProducts)





export default router