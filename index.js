const express = require("express");
const puppeteer = require("puppeteer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();

// Endpoint to generate and return a PDF
app.get("/", async (req, res) => {
  try {

    // Launch Puppeteer
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to a URL or generate the PDF content programmatically

    await page.setContent(`
<html lang="en">
<body>  
    <h1>PDF</h1>
    <p>PDF</p>
</body>
</html>`);
    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Close the browser
    // await browser.close();

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');

    // Send the PDF as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});



// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
doc
  .font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100);


// Finalize PDF file
doc.end();