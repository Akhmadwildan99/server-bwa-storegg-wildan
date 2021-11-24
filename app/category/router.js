var express = require('express');
var router = express.Router();
const {index,
    viewCategory,
    actionCreate,
    viewEdit, 
    actionEdit
} = require('./controller')

/* GET home page. */
router.get('/', index);
router.get('/create', viewCategory);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);

module.exports = router