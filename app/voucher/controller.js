const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const config = require('../../config/index');
const fs = require('fs');
const path = require('path');
module.exports = {
    index: async(req, res) => {
        try {
            const alretMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alretMessage, status: alertStatus};  
            const voucher = await Voucher.find()
            .populate('category')
            .populate('nominals');
            console.log(voucher);
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
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dst = fs.createWriteStream(target_path);

                src.pipe(dst);

                src.on('end', async () => {
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnial: filename
                        });
                        await voucher.save();
                        req.flash('alertMessage', 'berhasil menambah voucher');
                        req.flash('alertStatus', 'success');
                        res.redirect('/voucher');
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                    }
                });
            } else {
                const voucher = new Voucher({
                    name,
                    category,
                    nominals
                });
                await voucher.save();
                req.flash('alertMessage', 'berhasil menambah voucher');
                req.flash('alertStatus', 'success');
                res.redirect('/voucher');
            }
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/voucher');
        }
    },
    viewEdit: async(req, res) => {
        try {
            const {id} = req.params;
            const category = await Category.find();
            const nominal = await Nominal.find();
            const voucher = await Voucher.findOne({_id: id})
                .populate('nominals')
                .populate('category')
            res.render('admin/voucher/edit', {
                nominal,
                voucher,
                category
            });
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/nominal');
        }
    },
    actionEdit: async(req, res) => {
        try {
            const {id} = req.params;
            const {name, category, nominals} = req.body;
            if(req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dst = fs.createWriteStream(target_path);

                src.pipe(dst);

                src.on('end', async () => {
                    try {
                        const voucher = await Voucher.findOne({_id: id});
                        const currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnial}`;
                        if(fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }
                        await Voucher.findOneAndUpdate(
                            {_id: id},
                            {
                                name,
                                category,
                                nominals,
                                thumbnial: filename
                            })
                        req.flash('alertMessage', 'berhasil mengubah voucher');
                        req.flash('alertStatus', 'success');
                        res.redirect('/voucher');
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                    }
                });
            } else {
                await Voucher.findOneAndUpdate(
                    {_id: id},
                    {
                        name,
                        category,
                        nominals,
                    })
                req.flash('alertMessage', 'berhasil mengubah voucher');
                req.flash('alertStatus', 'success');
                res.redirect('/voucher');
            }
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/voucher');
        }
    },
    actionDelete: async(req, res) => {
        try {
            const {id} = req.params;
            const voucher = await Voucher.findOneAndRemove({_id: id});
            const currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnial}`;
            if(fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage);
            }
            req.flash('alertMessage', 'berhasil menghapus voucher');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/voucher');
        }
    },
    actionStatus: async(req, res) => {
        try {
            const { id } = req.params;
            let voucher = await Voucher.findOne({_id: id});

            let status = voucher.status === "Y" ? "N" : "Y";

            voucher = await Voucher.findByIdAndUpdate(
                {_id: id},
                {status}
            );
            req.flash('alertMessage', 'berhasil mengubah status');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    }
}