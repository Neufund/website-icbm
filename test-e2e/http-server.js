const { join } = require("path");
const express = require("express");
const proxy = require("http-proxy-middleware");

const PORT = 8080

const app = express();

app.use("/node", proxy({ target: "http://localhost:8545", changeOrigin: true }));
app.use("/pdfrenderer", proxy({ target: "https://neufund.net/pdfrender/", changeOrigin: true }));
app.use("/", express.static(join(__dirname, "../dist"), { extensions: ["html"] }));

console.log(`Serving on ${PORT}`)
app.listen(PORT);


