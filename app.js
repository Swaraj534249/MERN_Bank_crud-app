require("dotenv").config();
const express = require ("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cors = require("cors");

const users = require("./models/userSchema")
const router = require("./routes/router")

const port = process.env.PORT || 8003 ;

app.use(cors());
app.use(express.json());

app.use(router);

if(process.env.Node_ENV == "production"){
    app.use(express.static("bank/build"))
}

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})