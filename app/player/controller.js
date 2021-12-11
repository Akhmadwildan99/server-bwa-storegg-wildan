const Voucher = require('../voucher/model');
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
    }
}