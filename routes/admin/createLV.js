<!-- -->
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models')

router.post("/getAllLV", function (req, res) {
    models.LinhVuc.showAllLinhVuc(function (data) {
        res.json(data);
    })
})

router.post("/insertLV", function(req, res) {
  models.LinhVuc.themLinhVuc( req.body.nameLV, req.body.idParent , function() {
    res.json({
        msg : "Thanh cong",
        data : req.body.nameLV
    })
  }), function() {
    res.json({
        msg : "Thất bại"
    })
  }
})

module.exports = router;
