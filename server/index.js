// server/index.js
const express = require("express");
const dotenv = require('dotenv');
const userRouter = require('./src/route/user.route.js');
const { errorMiddleware } = require('./src/utils.min.js');
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
// Have Node serve the files for our built React app
const root = require("path").join(__dirname, "./../client/build");

app.use(express.json());
app.use(express.static(root));

app.use(`/api`, userRouter);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use( '/api-docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument) );

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => { req; res.sendFile("index.html", { root }); });

// Error middleware
app.use(errorMiddleware);



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});