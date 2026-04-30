const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./dbconnection/db');


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/forms", require("./routes/formRoutes"));
app.use("/api/responses", require("./routes/responseRoutes"));

connectDB().then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
});