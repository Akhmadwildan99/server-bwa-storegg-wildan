const User = require('./model');
const bcrypt = require('bcryptjs')
module.exports = {
    viewSignin: async(req, res) => {
        try {
            const alretMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alretMessage, status: alertStatus};
            if (req.session.user === null || req.session.user === undefined) {
            res.render('admin/users/view_signin', {
                alert
            });
        } else {
            res.redirect('/dashboard');
        } 
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/');
        }
    },
    actionSignin: async(req, res) => {
        try {
            const {email, password} = req.body;

            const check = await User.findOne({email});
            console.log(check.email)
            if (check) {
                if (check.status === 'Y') {
                    const checkPasswod = await bcrypt.compare(password, check.password);
                    if (checkPasswod) {
                        req.session.user = {
                            email: check.email,
                            id: check._id,
                            status: check.status,
                            username: check.username
                        }
                        res.redirect('/dashboard')
                    } else {
                        req.flash('alertMessage', `Password yang anda masukan salah`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/'); 
                    }
                } else {
                    req.flash('alertMessage', `Mohon maaf status anda belum aktif`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/'); 
                }
            } else {
                req.flash('alertMessage', `Email belum terdaftar`);
                req.flash('alertStatus', 'danger');
                res.redirect('/'); 
            }
        } catch (err) {
           req.flash('alertMessage', `${err.message}`);
           req.flash('alertStatus', 'danger');
           res.redirect('/'); 
        }
    }
}