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
    models.LinhVuc.getChildLevel1OfParent(idLV,function (data) {
        res.render("public/introLinhVuc", {
            title : "Intro Linh vuc",
            linhvucData : data
        });
    })
})

module.exports = router;
