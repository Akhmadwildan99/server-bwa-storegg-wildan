const mongoose = require('mongoose');
let bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama pemilik harus diisi!']
    },
    bankName: {
        type: String,
        require: [true, 'Nama bamk harus diisi!']
    },
    noRekening: {
        type: String,
        require: [true, 'Nama bamk harus diisi!']
    },
},{timestamps: true});

module.exports = mongoose.model('Bank', bankSchema);