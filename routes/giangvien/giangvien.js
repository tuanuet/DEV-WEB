/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');

router.get('/', utility.reqIsAuthen, utility.reqIsGV,function (req, res) {
    res.send('day la trang giang vien')
})
router.get('/myprofile',utility.reqIsAuthen,utility.reqIsGV,function (req,res) {
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(req.user.id,models,function (gv) {
        res.render('giangvien/GVprofile',{
            title : "My Profile",
            data : gv.dataValues
        })

    },function (err) {
        res.json(err)
    })
})

//Trang setting
router.get('/settings',utility.reqIsAuthen,utility.reqIsGV,function (req,res) {
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(req.user.id,models,function (gv) {
        models.LinhVuc.getLevel2OfTree(function(lv) {
            res.render('giangvien/setting-GVprofile',{
                title : "Settings",
                datagv : gv.dataValues,
                datalv : lv
            })
        })
    },function (err) {
        res.json(err)
    })

})
//tra lai trang dangkikhoaluan
router.get('/dangkikhoaluan',utility.reqIsAuthen,utility.reqIsGV,function (req,res) {
    models.DeTai.getDeTaiAndSinhVienByGiangVienId(req.user.id,models,function (data) {
        res.render('giangvien/dkkl_giangvien',{
            title : "Danh sách giảng viên đăng kí khóa luận",
            data : data
        })
    },function (err) {
        res.render('error',{
            message : "Hệ thống phát sinh lỗi vui lòng thử lại"
        })
    })

})
/*
 * post control gom
 * + control = submit || delete
 * + idSinhVien
 */
router.post('/controldetai',utility.reqIsAuthen,utility.reqIsGV,function (req,res) {
    if(req.body&&req.body.control == 'submit'){
        var svId = req.body.id ;
        models.DeTai.submitDeTaiBySinhVienId(svId,function () {
            res.json({
                msg : "Update thành công",
                isSubmit : true
            })
        },function () {
            res.json({
                msg : "Update thất bại",
                isSubmit :false
            })
        })
    }else if(req.body && req.body.control == 'delete'){
        var  svId = req.body.id
        models.DeTai.deleteDeTaiBySinhVienId(svId,function () {
            res.json({
                msg : "Delete thành công",
                isDelete :true
            })
        },function () {
            res.json({
                msg : "Delete thất bại",
                isDelete :false
            })
        })
    }
})
module.exports = router;