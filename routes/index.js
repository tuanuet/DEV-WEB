var express = require('express');
var router = express.Router();
var utility = require('../Utility/utility')
var models = require('../models')
/* GET home page. */
router.get('/',function(req, res) {

    models.Khoa.getAllKhoaAndDonVi(models,function (data) {
        res.render('index', {
            title: 'Hệ thống đăng kí khóa luận',
            data : data
        });
    })
});

//Intro khoa
router.get("/introKhoa", utility.reqIsAuthen , function(req, res) {
    res.render("public/intro", {
        title : "Intro Khoa",
        Object : "khoa"
    })
})

module.exports = router;
