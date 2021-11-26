const mongoose = require('mongoose');
let voucherSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama game harus diisi!']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    thumbnial: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    nominal: {
        type: mongoose.Schema.ObjectId,
        ref: 'Nominal'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Voucher', voucherSchema);