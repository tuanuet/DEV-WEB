<!-- -->
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models')

//Intro khoa
router.get("/:donvi" , function(req, res) {
  var idDonVi = req.params.donvi;
  models.Khoa.getGiangVienOfDonViOfKhoa(idDonVi,models,function (data) {
      res.render("public/intro", {
          title : "Intro Khoa",
          khoa : data
      });
  })
})

module.exports = router;
