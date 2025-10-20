import { Router } from "express";
import { getAllProducts } from "../controllers/products.controllers.js";

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







export default router