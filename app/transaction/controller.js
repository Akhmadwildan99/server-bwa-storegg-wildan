const Transaction = require('./model');
// const Bank = require('../bank/model');
module.exports = {
    index: async(req, res) => {
        try {
            const alretMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alretMessage, status: alertStatus};  
            const transaction = await Transaction.find()
            res.render('admin/transaction/view_transaction', {
                transaction,
                alert,
                name: req.session.user.username,
                title: "Halaman transaksi"
            });
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/transaction');
        }
    },
}