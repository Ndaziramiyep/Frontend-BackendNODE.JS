require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 4000;
mongoose.connect(process.env.DB_YRL, {useNewParse: true});
const db = mongoose.connection;
db.on('error', (error) => console.log("The connection successfully!"));
db.once('open', console.log("Connected to database!"))
app.get("/", (req,res) => {
    res.send("Hello world!");
})

app.listen( PORT, () => {
    console.log(`The server is running on: https://localhost:${PORT}`);
})

//  npm i multer dotenv