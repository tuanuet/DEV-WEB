var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var XLSX = require('xlsx');
var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();
var validator = require('validator')
var openPortDK = require('../../config/config_Khoa_moDangKi.json');
var nodemailer = require('nodemailer');
var smtpTransport = {
    host: "ctmail.vnu.edu.vn", // hostname
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: "14020521",
        pass: "1391996"
    },
    tls: {
        rejectUnauthorized: false
    }
}
var transporter = nodemailer.createTransport(smtpTransport);


/**
 * MODULE 4 KHOA LAM
 * Sửa dổi đề tài
 */

//Rút đáng kí
router.post('/rutdangki',function (req,res) {
    var svId ;
    models.DeTai.deleteDeTaiBySinhVienId(svId,function () {
        res.json({
            msg : "Xóa thành công",
            isDelete : true
        })
    },function () {
        res.json({
            msg : "Xóa thất bại",
            isDelete : false
        })
    })
})
//xuất file DOC hủy đề tài
router.get('/xuatdenghihuydetai',function () {

})

//trang admin quan lý để tài
router.get('/quanlysuadetai',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var page;
    if(req.query.page && validator.isInt(req.query.page.toString())) {
        page = req.query.page;
    }else{
        page = 0;
    }
    models.ChangeDeTai.getCountDeTai(function (result) {
        //pagination limt = 10
        var soPage = result.count/10;
        models.ChangeDeTai.getDeTaiAndSinhVienAndGiangVien(req.user.id,page,models,function (newData) {
            var ids = new Array();
            for(var i=0;i<newData.length;i++){
                ids.push(newData[i].id)
            }
            //lay tat ca cac ten de tai cu
            models.DeTai.getNameOldDeTaiByChangeDeTai(ids,function (oldName) {
                var arr = new Array();
                for(var i=0;i<newData.length;i++){
                    var item = {
                        oldName : oldName[i],
                        data : newData[i]
                    }
                    arr.push(item)
                }
                res.render('admin/quanlysuadetai',{
                    title : "Quản lý chỉnh sửa đề tài",
                    data : arr,
                    page : page,
                    pagination: soPage
                })
            },function () {

            })
        },function () {
            res.render('error',{
                title : "Lỗi hệ thống"
            })
        })
    },function (err) {
        res.render('error',{
            title : "Lỗi hệ thống"
        })
    })

})
//xuất file DOC đề nghỉ thau đổi đè tài
router.get('/xuatdenghithaydodetai',function (req,res) {
    res.json({msg: "xuatdenghithaydodetai"})
})

//Mo hoac dong cong sửa đề tai
//van dang dung body.id ==> phai chuyen sang user.id
router.post('/openportsua',function (req,res) {
    var openPortSua = require('../../config/config_Khoa_moSuaDoi.json');
    if(req.body.permission){
        if(req.body.permission == 'open'){
            switch (req.body.id){
                case 'fit':{
                    openPortSua.fit = true;
                    break;
                }
                case 'fet':{
                    openPortSua.fet = true;
                    break;
                }
                case 'fema':{
                    openPortSua.fema = true;
                    break;
                }
                case 'fepn':{
                    openPortSua.fepn = true;
                    break;
                }
            }
            res.json({
                msg: 'đã mở cổng sửa đề tài'
            })

        }else if(req.body.permission == 'close') {
            switch (req.body.id){
                case 'fit':{
                    openPortSua.fit = false;
                    break;
                }
                case 'fet':{
                    openPortSua.fet = false
                    break;
                }
                case 'fema':{
                    openPortSua.fema = false;
                    break;
                }
                case 'fepn':{
                    openPortSua.fepn = false;
                    break;
                }
            }
            res.json({
                msg: 'đã đóng cổng sửa đề tài'
            })
        }
    }else {
        switch (req.body.id){
            case 'fit':{
                openPortSua.fit = false;
                break;
            }
            case 'fet':{
                openPortSua.fet = false
                break;
            }
            case 'fema':{
                openPortSua.fema = false;
                break;
            }
            case 'fepn':{
                openPortSua.fepn = false;
                break;
            }
        }
        res.json({
            msg: 'Có lỗi xảy ra'
        })
    }
})


/**
 * Truowng bam nut chap nhan sua de tai
 * thi update du lieu tu bang ChangeDeTai sang bang DeTai
 */
router.get('/truongchapnhansua',function (req,res) {
    models.ChangeDeTai.findAll({}).then(function (detai) {
        if(detai){
            models.DeTai.updateDeTaiSuaDoi(detai,function () {
                res.json({
                    msg : "Dữ liệu đã được cập nhật"
                })
            },function (err) {
                res.json({
                    msg : "Lỗi hệ thống, kiểm tra lại",
                    err: err
                })
            })
        }else {
            res.json({
                msg : "Không có đề tài nào đc sửa chữa"
            })
        }
    }).catch(function () {
        res.json({
            msg : "Hệ thống phát sinh lỗi, vui lòng kiểm tra lại"
        })
    })

})

module.exports = router;