module.exports = {
    index: async(req, res) => {
        try {
           res.render('index', {
               name: req.session.user.username,
               title: "Halaman dashboard"
           });
        } catch (err) {
           console.log(err) 
        }
    }
}