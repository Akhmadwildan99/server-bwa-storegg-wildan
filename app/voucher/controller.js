const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const config = require('../../config/index');
module.exports = {
    index: async(req, res) => {
        try {
            const alretMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alretMessage, status: alertStatus};  
            const voucher = await Voucher.find();
            res.render('admin/voucher/view_voucher', {
                voucher,
                alert
            });
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/voucher');
        }
    },
    viewCreate: async(req, res) => {
        try {
            const category = await Category.find();
            const nominal = await Nominal.find();
            res.render('admin/voucher/create',{
                category,
                nominal
            }); 
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/category');
        }
    },
    actionCreate: async(req, res) => {
        try {
            const {name, category, nominals} = req.body;
            if(req.file) {
                let tmp_path = req.file.path;
                console.log("temp_path>>", tmp_path);
                let originalExt = req.file.originalname.split('.')[req.file.originalname.length - 1];
                console.log("originalExt>>", originalExt);
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `../../public/uploads/${filename}`);
            }
            // let nominal = await Nominal({coinName, coinQuantity, price});
            // await nominal.save(); 
            // req.flash('alertMessage', 'berhasil menambah Nominal');
            // req.flash('alertStatus', 'success');
            // res.redirect('/nominal');
        } catch (error) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/nominal');
        }
    },
    // viewEdit: async(req, res) => {
    //     try {
    //         const {id} = req.params;
    //         const nominal = await Nominal.findOne({_id: id});
    //         res.render('admin/nominal/edit', {
    //             nominal
    //         });
    //     } catch (err) {
    //        req.flash('alertMessage', `${err.message}`);
    //        req.flash('alertStatus', 'danger');
    //        res.redirect('/nominal');
    //     }
    // },
    // actionEdit: async(req, res) => {
    //     try {
    //         const {id} = req.params;
    //         const {coinName, coinQuantity, price} = req.body;
    //         await Nominal.findOneAndUpdate({
    //             _id: id
    //         }, {coinName, coinQuantity, price});
    //         req.flash('alertMessage', 'berhasil mengubah nominal');
    //         req.flash('alertStatus', 'success');
    //         res.redirect('/nominal');
    //     } catch (err) {
    //        req.flash('alertMessage', `${err.message}`);
    //        req.flash('alertStatus', 'danger');
    //        res.redirect('/nominal');
    //     }
    // },
    // actionDelete: async(req, res) => {
    //     try {
    //         const {id} = req.params;
    //         await Nominal.findOneAndRemove({_id: id});
    //         req.flash('alertMessage', 'berhasil menghapus nominal');
    //         req.flash('alertStatus', 'success');
    //         res.redirect('/nominal');
    //     } catch (err) {
    //        req.flash('alertMessage', `${err.message}`);
    //        req.flash('alertStatus', 'danger');
    //        res.redirect('/nominal');
    //     }
    // }
}