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

router.post("/handlerRederAdmin" , function(req, res) {
  var data = "";
  if(req.body.id == "khoiTaoSV")
  {
    data = "SSSSSSSSSSSSSSS";
  }
  res.json({
    htmlStr : data
  })
})
router.get("/search",searchGiangVien,searchHuongNghienCuu,function(data,req,res,next) {
       var queryString = req.query.query;
       res.render('public/search',{
             title : "Search",
            query : queryString,
             data : data
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

function searchGiangVien(req,res,next) {
    var name = req.query.query;
    models.GiangVien.getGiangVienByName(name,function (gv) {
        if(gv){
            return next(gv);
        }else {
            return next(null);
        }
    },function (arg1) {
        res.send("Quá trình search gặp lỗi!")
    })
}

function searchHuongNghienCuu(gv,req,res,next) {
   var name = req.query.query;
       models.GiangVien.getGiangVienByHuongNghienCuu(name,models,function (huongnghiencuu) {
            var data = {
                GiangVien: gv,
                HuongNghienCuu: huongnghiencuu
            }
           return next(data)
       },function () {
           res.send("Quá trình search gặp lỗi!")
       })
}
module.exports = router; //Dòng này phải ở dưới
