const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'JEmail harus diisi!']
    },

    name: {
        type: String,
        require: [true, 'Name harus diisi!'],
        maxlength: [225, 'panjang name harus diantara 3 - 225 karakter'],
        minlength: [3, 'panjang name harus diantara 3 - 225 karakter'],
    },

    username: {
        type: String,
        require: [true, 'Username harus diisi!'],
        maxlength: [225, 'panjang username harus diantara 3 - 225 karakter'],
        minlength: [3, 'panjang username harus diantara 3 - 225 karakter'],
    },

    password: {
        type: String,
        require: [true, 'Password harus diisi!'],
        maxlength: [225, 'panjang password harus diantara 3 - 225 karakter'],
        minlength: [3, 'panjang password harus diantara 3 - 225 karakter'],
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },

    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
    },

    phoneNumber: {
        type: String,
        require: [true, 'Nomor handphone harus diisi'],
        maxlength: [13, 'panjang nomor telepon antara 9 - 13 karakter'],
        minlength: [9, 'panjang nomor telepon antara 9 - 13 karakter']
    },

    avatar: {
        type: String
    },
    filename: {
        type: String
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps: true});

playerSchema.path('email').validate( async function(value) {
    try {
        const count = await this.model('Player').countDocuments({email: value});
        return !count
    } catch (err) {
        throw err;
    }
})

playerSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

module.exports = mongoose.model('Player', playerSchema);