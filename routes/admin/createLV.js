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

router.post("/insertKH", function (req, res) {
    models.KhoaHoc.createKH(req.body, function () {
        res.json({msg:"Thêm khóa học thành công"})
    })
}, function (err) {
    res.json({msg : "Them that bai"})
})

router.post("/checkKH", function (req, res) {
    models.KhoaHoc.getAllKH(req.body.kh, function (data) {
        if(data) {
            res.json({
                msg : "Ki hieu bi trung"
            })
        } else {
            res.json({
                msg : "Ki hieu phu hop"
            })
        }
    })
})

router.post("/getKhoaID", function (req, res) {
    models.Khoa.gettAllKhoa(function (data) {
        res.json({
            dataKhoa : data
        })
    })
})

router.post("/insertNH", function (req, res) {
    console.log(req.body)
    models.NganhHoc.createNH(req.body, function () {
        res.json({msg:"Thêm nghành học thành công"})
    })
}, function (err) {
    res.json({msg : "Them that bai"})
})

module.exports = router;
