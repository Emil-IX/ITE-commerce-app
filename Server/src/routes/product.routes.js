import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/products.controllers.js";

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







export default router