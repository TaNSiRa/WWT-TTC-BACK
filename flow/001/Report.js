const PDFDocument = require("pdfkit");
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/WWT/CreateReport", async (req, res) => {
  console.log("CreateReport");
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    // --- path ที่ต้องการบันทึก ---
    const savePath = "C:\\AutomationProject\\WWT\\ReportPDF\\test.pdf";

    // --- สร้าง stream สำหรับเขียนไฟล์ ---
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const writeStream = fs.createWriteStream(savePath);

    // pipe PDF ลงไฟล์
    doc.pipe(writeStream);

    // ---- เขียนเนื้อหา PDF ----
    doc.text("Hello PDF");

    doc.end(); // ต้องมี

    // --- รอให้ไฟล์เขียนเสร็จ ---
    writeStream.on("finish", () => {
      const bitmap = fs.readFileSync(savePath);
      res.json(bitmap.toString("base64"));
    });

    writeStream.on("error", (err) => {
      console.error("WriteStream error:", err);
      res.status(500).send("Error writing PDF file");
    });

  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
