var express = require('express');
var router = express.Router();
const {index, viewCategory, actionCreate} = require('./controller')

/* GET home page. */
router.get('/', index);
router.get('/create', viewCategory);
router.post('/create', actionCreate);

module.exports = router