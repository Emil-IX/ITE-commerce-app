import PDFDocument from "pdfkit";
import moment from "moment";
import fs from "fs";
import path from "path";



export const invoiceGenerator = async (req, res) => {
    try {

        const { customerName, cartItems } = req.body
        const date = moment().format("YYYY-MM-DD HH:mm")

        //here is where is create the PDF
        const doc = new PDFDocument({ margin: 50 })
        const filePath = path.resolve(`./invoices/invoice_${Date.now()}.pdf`)
        const stream = fs.createWriteStream(filePath)

        doc.pipe(stream)

        //Document Header
        doc
            .fontSize(20)
            .text("Purchase Date", { align: "center" })
            .moveDown()

        doc.fontSize(12).text(`Customer: ${customerName}`)
        doc.text(`Date:${date}`)
        doc.moveDown()

        // invoice body
        doc.fontSize(14).text("Purchase details")
        doc.moveDown(0.5)

        let total = 0
        cartItems.forEach((item, index) => {
            const subTotal = item.price * item.quantity
            total += subTotal

            doc
                .fontSize(12)
                .text(
                    `${index + 1}. ${item.name} - Quantity: ${item.quantity} - Price: ${item.price} - Subtotal: $${subTotal}`
                )
        });

        doc.moveDown()
        doc.fontSize(14).text(`Total to pay: $${total}`, { align: "right" })

        //Footer
        doc.moveDown(2)
        doc.fontSize(10).text("Thank you for your purchase", { align: "center" })

        doc.end()

        //final steps
        stream.on("finish", () => {
            res.dowload(filePath, "Bill.pdf", () => {
                fs.unlinkSync(filePath)
            })

        })

    } catch (error) {
        res.status(500).json({ message: 'Error generating invoice', error })
    }

}