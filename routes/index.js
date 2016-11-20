var express = require('express');
var router = express.Router();
var utility = require('../Utility/utility')

/* GET home page. */
router.get('/',utility.reqIsAuthen ,function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
