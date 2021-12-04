const Payment = require('./model');
const Bank = require('../bank/model');
module.exports = {
    index: async(req, res) => {
        try {
            const alretMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alretMessage, status: alertStatus};  
            const payment = await Payment.find().populate('banks');
            res.render('admin/payment/view_payment', {
                payment,
                alert
            });
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    },
    viewCreate: async(req, res) => {
        try {
          const banks = await Bank.find();
          res.render('admin/payment/create', {
              banks
          });  
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    },
    actionCreate: async(req, res) => {
        try {
            const {type, banks} = req.body;
    
            let payment = await Payment({type, banks});
            await payment.save(); 
            req.flash('alertMessage', 'berhasil menambah jenis pembayaran');
            req.flash('alertStatus', 'success');
            res.redirect('/payment');
        } catch (error) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    },
    viewEdit: async(req, res) => {
        try {
            const {id} = req.params;
            const payment = await Payment.findOne({_id: id}).populate('banks');
            const banks = await Bank.find();
            res.render('admin/payment/edit', {
                banks,
                payment
            });
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    },
    actionEdit: async(req, res) => {
        try {
            const {id} = req.params;
            const {type, banks} = req.body;
            await Payment.findOneAndUpdate({
                _id: id
            }, {type, banks});
            req.flash('alertMessage', 'berhasil mengubah payment');
            req.flash('alertStatus', 'success');
            res.redirect('/payment');
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    },
    actionDelete: async(req, res) => {
        try {
            const {id} = req.params;
            await Payment.findOneAndRemove({_id: id});
            req.flash('alertMessage', 'berhasil menghapus payment');
            req.flash('alertStatus', 'success');
            res.redirect('/payment');
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    },
    actionStatus: async(req, res) => {
        try {
            const {id} = req.params;
            let payment = await Payment.findOne({_id: id});
            let status = payment.status === 'Y' ? 'N' : 'Y'
            payment = await Payment.findByIdAndUpdate({
                _id: id
            }, {status});
            req.flash('alertMessage', 'berhasil mengubah status');
            req.flash('alertStatus', 'success');
            res.redirect('/payment');
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/payment');
        }
    }
}