var express = require('express');
var router = express.Router();
var utility = require('../Utility/utility')
var models = require('../models')
/* GET home page. */
router.get('/',function(req, res) {
    models.Khoa.getAllKhoaAndDonVi(models,function (data) {
        res.render('index', {
            title: 'Hệ thống đăng kí khóa luận',
            allKhoa : data,
        });
    })
});

//Intro khoa
router.get("/introKhoa", utility.reqIsAuthen , function(req, res) {
  models.Khoa.getAllKhoaAndDonVi(models,function (data) {
      res.render("public/intro", {
          title : "Intro Khoa",
          allKhoa : data,
      });
  })
})

//Profile khoa
router.get("/profileKhoa", utility.reqIsAuthen , function(req, res) { // tạo 1 trang profileKhoa
    res.render("public/khoaprofile", { //nó sẽ lấy file intro.ejs để sinh ra trang mình cần
        title : "Profile Khoa", //Dữ liệu đi kèm để hiển thị
        Object : "khoa"
    })
})

//Setting khoa
router.get("/settingKhoa", utility.reqIsAuthen , function(req, res) {
    res.render("public/khoa_setting", {
        title : "Setting khoa",
        Object : "khoa"
    })
})

//Nhiều tin
router.get("/uetNews", utility.reqIsAuthen , function(req, res) {
    res.render("public/uetnews", {
        title : "Tin Tức",
        Object : "khoa"
    })
})

//Một tin
router.get("/aNews", utility.reqIsAuthen , function(req, res) {
    res.render("public/anews", {
        title : "Tin Tức",
        Object : "khoa"
    })
})
module.exports = router; //Dòng này phải ở dưới
