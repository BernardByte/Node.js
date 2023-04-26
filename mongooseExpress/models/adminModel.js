const connectDB = require('../config/db')
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Admin',adminSchema)