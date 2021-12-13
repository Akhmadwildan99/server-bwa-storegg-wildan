const Player = require('../player/model');
const config = require('../../config/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


module.exports = {
    signup: async(req, res, next) => {
        try {
            const payload = req.body;

            if( req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dst = fs.createWriteStream(target_path);

                src.pipe(dst);
                src.on('end', async () => {
                    try {
                        let player = new Player({...payload, avatar: filename});
                        await player.save();

                        delete player._doc.password;
                
                        res.status(201).json({ data: player });
                    } catch (err) {
                        if (err && err.name === 'validationError') {
                            res.status(422).json({
                                error: 1,
                                message: err.message
                            })
                        }

                        next(err);
                        console.log(err)
                    }
                });

                
            } else {
                let player = new Player(payload);

                await player.save();

                delete player._doc.password;
                
                res.status(201).json({
                    data: player
                })
            }
            
        } catch (err) {
            if (err && err.name === 'validationError') {
                res.status(422).json({
                    error: 1,
                    message: err.message,
                })
            }

            next(err);
        }
    },

    signin: (req, res, next) => {
        const { email, password } = req.body;

        Player.findOne({email: email}).then((player) => {
            if ( player ) {
                const checkPassword = bcrypt.compareSync(password, player.password);

                if( checkPassword ) {
                    const token = jwt.sign({
                        player: {
                            id: player._id,
                            username: player.username,
                            email: player.email,
                            name: player.name,
                            avatar: player.avatar,
                            phoneNumber: player.phoneNumber,
                        }
                    }, config.jwtKey);

                    res.status(200).json({token})
                } else {
                    res.status(422).json({
                        message: 'Passsword yang anda masukan salah!'
                    });
                }
            } else {
                res.status(422).json({
                    message: 'Email anda belum terdaftar!'
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: err.message || 'Internal server error'
            });

            next()
        })

        
    }
}