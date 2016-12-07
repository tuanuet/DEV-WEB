<!-- -->
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models')

//Intro khoa
router.get("/khoa/:khoa" , function(req, res) {
  var idKhoa = req.params.khoa;
  models.Khoa.getGiangVienOfDonViOfKhoa(idKhoa,models,function (data) {
      res.render("public/introKhoa", {
          title : "Intro Khoa",
          khoa : data
      });
  })
})


router.get("/linhvuc/:idLV", function (req, res) {
    var idLV = req.params.idLV;
    models.LinhVuc.getChildLevel1OfParent(idLV, models, function (data) {
        console.log("Noi gi di : " + data);
        res.render("public/introLinhVuc", {
            title : "Intro Linh vuc",
            linhvucData : data
        });
    },function (err) {
        res.json(err)
    })
})

router.post("/fetchGV", function (req, res) {
    models.LinhVuc.findGiangVien(req.body.id, models, function (data) {
        res.json(data)
    })
})

router.get("/giangvien/:idGV", function (req, res) {
    var idGV = req.params.idGV;
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(idGV,models,function (gv) {
        res.render('public/profileGV-public',{
            title : "Thông tin giảng viên",
            data : gv.dataValues
        })

    },function (err) {
        res.json(err)
    })
})

module.exports = router;
