import { Router } from "express";
import {
    createProduct,
    deleteProducts,
    getAllProducts,
    getOneproduct,
    updateProduct
} from "../controllers/products.controllers.js";

const router = Router()






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
 *     description: This endpoint allows you to create a new product in the database, including its name, price, description, image URL, and stock quantity.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - image_url
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sports T-shirt"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 example: "Lightweight and breathable training T-shirt"
 *               image_url:
 *                 type: string
 *                 example: "https://my-store.com/images/tshirt.jpg"
 *               stock:
 *                 type: integer
 *                 example: 100
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
 *                 productId:
 *                   type: integer
 *                   example: 12
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Sports T-shirt"
 *                     price:
 *                       type: number
 *                       example: 29.99
 *                     description:
 *                       type: string
 *                       example: "Lightweight and breathable training T-shirt"
 *                     image_url:
 *                       type: string
 *                       example: "https://my-store.com/images/tshirt.jpg"
 *                     stock:
 *                       type: integer
 *                       example: 100
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
 */
router.post('/', createProduct)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update an existing product
 *     description: Updates one or more fields of a product by its ID. At least one field must be provided in the request body.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 79.99
 *               description:
 *                 type: string
 *                 example: "Updated description of the product"
 *               image_url:
 *                 type: string
 *                 example: "https://my-store.com/images/updated-product.jpg"
 *               stock:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product was updated successfully"
 *       400:
 *         description: Invalid request — at least one field must be provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Must have at least one field completed"
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
 *         description: Internal server error while updating the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating product"
 */
router.put('/:id', updateProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     description: Deletes a product from the database by its ID. Returns 404 if the product does not exist.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { "affectedRows": 1 }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products not found"
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
 */
router.delete('/:id', deleteProducts)





export default router