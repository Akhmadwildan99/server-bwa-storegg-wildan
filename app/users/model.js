const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'JEmail harus diisi!']
    },
    username: {
        type: String,
        require: [true, 'Nama harus diisi!']
    },
    password: {
        type: String,
        require: [true, 'Password harus diisi!']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin',
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor handphone harus diisi']
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);