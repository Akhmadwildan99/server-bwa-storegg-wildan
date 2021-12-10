const Voucher = require('../voucher/model');
module.exports = {
    landingPage: async(req, res) => {
        try {
            const voucher =  await Voucher.find()
                .select('_id name status thumbnail category')
                .populate('category');

            res.status(200).send({data: voucher});
            
        } catch (err) {
            res.status(500).send(err.message || 'Terjadi kesalahan pada server');
        }
    }
}