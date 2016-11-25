var express = require('express');
var router = express.Router();
var utility = require('../Utility/utility')

/* GET home page. */
router.get('/',utility.reqIsAuthen ,function(req, res) {
  res.render('index', { title: 'Hệ thống đăng kí khóa luận' });
});

//Intro khoa
router.get("/introKhoa", utility.reqIsAuthen , function(req, res) {
    res.render("public/intro", {
        title : "Intro Khoa",
        Object : "khoa"
    })
})

module.exports = router;
