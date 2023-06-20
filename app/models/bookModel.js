require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        bookTitle: { type: String, required: true },
        authorName: { type: String, required: true },
        price: { type: Number, required: true },
        
       
    },
    { timestamps: true });
module.exports = mongoose.model('Books', BookSchema);