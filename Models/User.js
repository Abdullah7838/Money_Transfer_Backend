const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true, 
        match: [/^\d{11}$/, 'Please enter a valid 10-digit phone number'], 
    },
    passcode: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 10,
    }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
