// controllers/invoiceController.js
import PDFDocument from "pdfkit";
import moment from "moment";


export const invoiceGenerator = (req, res) => {
  try {
    const { customerName = "Costumer", cartItems = [] } = req.body || {};
    console.log("[invoice] request received", { customerName, items: cartItems.length });


    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");

    const doc = new PDFDocument({ margin: 50, size: "A4" });

 
    doc.on("error", (err) => {
      console.error("[invoice] PDFDocument error:", err);
   
      try {
        if (!res.headersSent) {
          res.status(500).json({ message: "PDF generation error", error: err.message });
        } else {
          
          res.end();
        }
      } catch (e) {
        console.error("[invoice] error while sending error response:", e);
      }
    });

  
    res.on("close", () => {
      console.warn("[invoice] client connection closed/cancelled");
      try {
        doc.destroy(); 
      } catch (e) {}
    });

    
    doc.pipe(res);

    
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    // Header blue
    doc.rect(50, 50, 500, 80).fill("#333");
    doc.fillColor("#FFFFFF").fontSize(22).font("Helvetica-Bold").text("ITE-Commerce", 60, 70);
    doc.fontSize(12).font("Helvetica").text("Invoice", 460, 70, { align: "right" });
    doc.text(`Date: ${date}`, 460, 90, { align: "right" });

    // Client
    doc.fillColor("#000000").fontSize(12).text(`Customer: ${customerName}`, 60, 140).moveDown();

    // Table header
    const tableTop = 170;
    doc.fontSize(12).fillColor("#FFFFFF").rect(50, tableTop, 500, 25).fill("#1DAA1D");
    doc.fillColor("#FFFFFF").font("Helvetica-Bold").text("Item", 60, tableTop + 7);
    doc.text("Qty", 280, tableTop + 7);
    doc.text("Price", 340, tableTop + 7);
    doc.text("Subtotal", 440, tableTop + 7);

    // Body
    doc.fillColor("#000000").font("Helvetica");
    let y = tableTop + 35;
    let total = 0;

    cartItems.forEach((item, index) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      const subTotal = price * qty;
      total += subTotal;

      // cut names if its so longer
      const name = String(item.name || "").slice(0, 20);

      // add new page if it need it
      if (y > 700) {
        doc.addPage();
        y = 60;
      }

      doc.fontSize(11).text(`${index + 1}. ${name}`, 60, y, { width: 200 });
      doc.text(qty.toString(), 290, y, { width: 40 });
      doc.text(`$${price.toFixed(2)}`, 340, y, { width: 60 });
      doc.text(`$${subTotal.toFixed(2)}`, 440, y, { width: 80, align: "right" });

      y += 22;
    });

    // total
    doc.moveTo(50, y + 5).lineTo(550, y + 5).strokeColor("#BDBDBD").stroke();
    y += 20;
    doc.fontSize(14).font("Helvetica-Bold").text(`Total: $${total.toFixed(2)}`, 400, y, {
      align: "right",
    });

    // Footer
    doc.fontSize(10).fillColor("#757575").text("Thank you for your purchase!", 0, 760, {
      align: "center",
    });


    doc.end();

    console.log("[invoice] doc.end() called — streaming to client");
  } catch (err) {
    console.error("[invoice] unexpected error:", err);
    try {
      if (!res.headersSent) res.status(500).json({ message: "Unexpected server error", error: err.message });
      else res.end();
    } catch (e) {}
  }
};
