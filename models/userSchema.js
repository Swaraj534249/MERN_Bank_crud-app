const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    accNo: {
        type: Number,
        require: true,
    },
    bank: {
        type: String,
        require: true,
    },
    add1: {
        type: String,
    },
    add2: {
        type: String,
    },
    city: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    zip: {
        type: Number,
        require: true,
    }
})

const users = new mongoose.model("users", userSchema)
module.exports = users;