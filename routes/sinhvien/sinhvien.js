/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var validator = require('validator')
router.get('/',utility.reqIsAuthen,function (req,res) {
    res.send('day la trang sinh vien')
})
router.get('/myprofile',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.SinhVien.getSinhVienAndKhoaAndKhoaHocAndNganhHoc(req.user.id,models,function (sv) {
        res.render('student/SVProfile',{
            title : "My Profile",
            data : sv.dataValues
        })
    },function (err) {
        res.json(err)
    })
})
//Trang setting
router.get('/settings',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.SinhVien.getSinhVienAndKhoaAndKhoaHocAndNganhHoc(req.user.id,models,function (sv) {
        res.render('student/setting-SVProfile',{
            title : "Settings",
            data : sv.dataValues
        })

    },function (err) {
        res.json(err)
    })

})
//render trang dang ki cho sinh vien
router.get('/dangkikhoaluan',function (req,res) {
    res.render('student/thongTinDeTai', {
        title: "Đăng kí khóa luận",
        
    })
})
//sinh vien dang ki khoa luan
router.post('/dangkikhoaluan',function (req,res) {
    if(req.body){
        var data = {
            GiangVienId : req.body.GiangVienId,
            SinhVienId :req.body.SinhVienId,
            tenDeTai : req.body.tenDeTai,
            thoiGianNop: null,
            thoiGianSua: null,
            nopHoSoChua: 0,
            duocBaoVeKhong: 0,
            nopQuyenChua: 0
        }
        if(validateDeTai(data)){
            models.DeTai.insertDeTai(data,models,function () {
                res.json({
                    msg : "Đăng kí hoàn tất, chúc mừng bạn!"
                })
            },function (msg) {
                res.json({
                    msg : msg
                })
            })
        }
        else {
            res.json({
                msg : "sai form, vui lòng xem lại"
            })
        }
    }else {
        res.json({
            msg : "Quá trình đăng kí bị lỗi, vui lòng xem lại"
        })
    }
})
function validateDeTai(data) {
    return (
          !validator.isEmpty(data.GiangVienId)
        &&!validator.isEmpty(data.SinhVienId)
        &&!validator.isEmpty(data.tenDeTai)
        &&validator.isAscii(data.GiangVienId.toString())
        &&validator.isInt(data.SinhVienId.toString())
    )
}
module.exports = router;