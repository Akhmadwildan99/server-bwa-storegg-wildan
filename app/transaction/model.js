const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName: {type: String, require: [true, 'nama game harus diisi!']},
        category: {type: String, require: [true, 'kategori game harus diisi!']},
        thumbnail: {type: String},
        coinName: {type: String, require: [true, 'nama koin harus diisi!']},
        coinQuantity: {type: Number, require: [true, 'jumlah koin harus diisi!']},
        price: {type: Number}
    },
    historyPayment: {
        name: {type: String, require: [true, 'nama harus diisi!']},
        type: {type: String, require: [true, 'type pembayaran harus diisi!']},
        bankName: {type: String, require: [true, 'nama bank harus diisi!']},
        noRekening: {type: String, require: [true, 'nomor rekening harus diisi!']},
    },
    name: {
        type: String, 
        require: [true, 'akun harus diisi'],
        maxlength: [225, 'panjan akun harus diantara 3 - 225'],
        minlength: [3, 'panjan akun harus diantara 3 - 225'],
    },
    accountUser: {
        type: String, 
        require: [true, 'nama harus diisi'],
        maxlength: [225, 'panjan nama harus diantara 3 - 225'],
        minlength: [3, 'panjan nama harus diantara 3 - 225'],
    },
    tax: {
        type: Number,
        default: 0
    },
    value: {
        type: Number,
        default: 0
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    historyUser: {
        name: {type: String, require: [ true, 'nama harus disi']},
        phoneNumber: {
            type: Number,
            require: [true, 'nomor akun harus disi!'],
            maxlength: [13, 'panjang nomor antara 9 - 13'],
            minlength: [9, 'panjang nomor antara 9 -  13']
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

module.exports = mongoose.model('Transaction', transactionSchema);