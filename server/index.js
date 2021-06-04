// server/index.js
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
const root = require("path").join(__dirname, "./../client/build");

app.use(express.static(root));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => { req; res.sendFile("index.html", { root }); });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});