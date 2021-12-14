const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const Payment = require('../payment/model');
const Bank = require('../bank/model');
module.exports = {
    landingPage: async(req, res) => {
        try {
            const voucher =  await Voucher.find()
                .select('_id name status thumbnail category')
                .populate('category');

            res.status(200).send({data: voucher});
            
        } catch (err) {
            res.status(500).send(err.message || 'internal sever error');
        }
    },
    detailPage: async(req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOne({_id: id})
                .populate('category')
                .populate('nominals')
                .populate('user', '_id username phoneNumber');

            if(!voucher) {
                res.status(404).send({message: 'voucher game tidak ditemukan'});
            }

            res.status(200).send({data: voucher})
        } catch (err) {
            res.status(500).send(err.message || 'internal sever error');
        }
    },

    category: async (req, res) => {
        try {
            const category = await Category.find();
            
            res.status(200).send({data: category})
        } catch (err) {
            res.status(500).send(err.message || 'internal sever error');
        }
    },

    checkout: async (req, res) => {
        try {
            const { voucher, nominal, bank, accountUser, payment, name} = req.body;

            const res_voucher = await Voucher.findOne({_id: voucher})
                .select('_id name category thumbnail')
                .populate('category')
                .populate('user')
            
            if(!res_voucher) return res.status(404).json({message: 'Voucher tidak ditemukan'});

            const res_nominal = await Nominal.findOne({_id: nominal});

            if(!res_nominal) return res.status(404).json({message: 'Nominal tidak ditemukan'});

            const res_payment = await Payment.findOne({_id: payment});

            if(!res_payment) return res.status(404).json({message: 'Payment tidak ditemukan'});

            const res_bank = await Bank.findOne({_id: bank});

            if(!res_bank) return res.status(404).json({message: 'Bank tidak ditemukan'});


            let tax = (10 / 100) * res_nominal._doc.price;
            let value = res_nominal._doc.price + tax;

            const payload = {
                historyVoucherTopup: {
                    gameName: res_voucher._doc.name,
                    category: res_voucher._doc.category,
                    thumbnail: res_voucher._doc.thumbnail,
                    coinName: res_nominal._doc.coinName,
                    coinQuantity: res_nominal._doc.coinQuantity,
                    price: res_nominal._doc.price
                },
                historyPayment: {
                    name: res_bank._doc.name,
                    type: res_payment._doc.type,
                    bankName: res_bank._doc.bankName,
                    noRekening: res_bank._doc.noRekening,
                },

                name: name,
                accountUser: accountUser,
                player: req.player.id,
                tax: tax,
                value: value,
                historyUser: {
                    name: req.player.name,
                    phoneNumber: req.player.phoneNumber,
                },
                category: res_voucher._doc.category?._id,
                user: res_voucher._doc.user?._id,
            }

            res.status(200).send({data: payload});

        } catch (err) {
            res.status(500).send(err.message || 'internal sever error');
        }
    }
}