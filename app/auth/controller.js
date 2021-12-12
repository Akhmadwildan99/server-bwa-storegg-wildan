const Player = require('../player/model');
const config = require('../../config/index');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
   cloud_name: 'wildanakhmad3584',
   api_key: '481815712393864',
   api_secret: 'efhLh69mDdk0vacfQHdj3II6qUM',
   secure: true,
})
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

                cloudinary.uploader.upload(target_path, 
                    function (error, result) {
                        console.log(error, result)
                    }
                );
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
    }
}