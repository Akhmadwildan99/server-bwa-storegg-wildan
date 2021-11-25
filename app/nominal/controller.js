const Nominal = require('./model');
module.exports = {
    index: async(req, res) => {
        try {
            const alretMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alretMessage, status: alertStatus};  
            const nominal = await Nominal.find();
            res.render('admin/nominal/view_nominal', {
                nominal,
                alert
            });
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/category');
        }
    },
    viewCreate: async(req, res) => {
        try {
          res.render('admin/nominal/create');  
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/category');
        }
    },
    actionCreate: async(req, res) => {
        try {
            const {coinName, coinQuantity, price} = req.body;
    
            let nominal = await Nominal({coinName, coinQuantity, price});
            await nominal.save(); 
            req.flash('alertMessage', 'berhasil menambah Nominal');
            req.flash('alertStatus', 'success');
            res.redirect('/nominal');
        } catch (error) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/nominal');
        }
    },
}