const Player = require('../player/model');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');

module.exports = {
    isLoginAdmin: (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            req.flash('alertMessage', `Mohon maaf session anda telah habis`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
        } else {
            next();
        }
    }, 

    isLoginPlayer: async (req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

            const data = jwt.verify(token, config.jwtKey);

            const player = await Player.findOne({_id: data.player.id});
            console.log(player)

            if(!player) {
                throw new Error();
            }

            req.player = player;
            req.tken = token;

            next();
        } catch (err) {
            res.status(401).json({
                message: 'Not authorized to access this resource!'
            })
        }
    }
}