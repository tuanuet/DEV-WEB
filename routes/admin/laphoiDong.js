/**
 * Created by DucToan on 14/12/2016.
 */

var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');

router.get("/laphoidong", function (req, res) {
    models.ChucVu.getAllChucVu(function (data) {
        res.render("admin/laphoidong", {
            title: "Lập hội đồng",
            chucvu: data
        })
    })
})

router.post("/getAllGVOfKhoa", function (req, res) {
    models.Khoa.getGiangVienOfDonViOfKhoa(req.user.id, models, function (data) {
        res.json({
            dataGV : data
        })
    })
})


router.post("/submithoidong", function (req, res) {
    models.HoiDong.insertHoiDong(req.body.tenhd, req.body.diadiem, function (data) {
        for(var i = 0;i < req.body.list.length; i++) {
            models.ChucVuTrongHoiDong.insertNewData(parseInt(data.id), parseInt(req.body.list[i][0]), req.body.list[i][1],function () {
                if(i >= req.body.list.length-1) {
                    res.json({
                        msg: "Thêm hội đồng thành công"
                    })
                }
            })
        }
    })
})

router.get("/phancongphanbien", function (req, res) {
    models.DeTai.getAllDeTaiDuocBaoVe(function (data) {
        res.render("admin/phancongphanbien", {
            title: "Lập hội đồng",
            dataSV : data
        })
    })
})

router.post("/getAllHoiDong", function (req, res)  {
    models.HoiDong.getAllHoiDong(function (data) {
        res.json({
            dataHD : data
        })
    })
})

router.post("/phancongPB", function (req, res) {
    models.DeTai.updateHoiDong(parseInt(req.body.idDT), parseInt(req.body.idHD), function () {
        res.json({
            msg : "Phân công thành công"
        })
    } )
})

module.exports = router;