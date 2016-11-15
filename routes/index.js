var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  req.flash('success_msg','hello world')
  res.redirect('/');
});

module.exports = router;
