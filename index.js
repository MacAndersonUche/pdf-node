const express = require("express");
const { html2pdf} = require('better-html-pdf');

const app = express();

// Endpoint to generate and return a PDF
app.get("/", async (req, res) => {
    try {

const fileContentBuffer = await html2pdf('<h1>Test</h1>', { fileType: 'buffer',  width: '595',
height: '842', });
        // Close the browser
        // await browser.close();

        // Set the response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');

        // Send the PDF as the response
        res.send(fileContentBuffer);
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
