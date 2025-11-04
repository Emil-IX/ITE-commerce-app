import { Router } from "express";
import { invoiceGenerator } from "../controllers/invoice.controller.js";



const router = Router()


/**
 * @swagger
 * /api/invoice:
 *   post:
 *     summary: Generate a purchase invoice (PDF)
 *     description: Creates a PDF invoice with the provided customer and cart data.
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - cartItems
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Mouse"
 *                     price:
 *                       type: number
 *                       example: 19.99
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Successfully generated invoice PDF.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error generating invoice.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error generating invoice"
 */

router.post('/invoice', invoiceGenerator)





export default router