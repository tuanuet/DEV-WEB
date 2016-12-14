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
//xuất file DOC đề nghỉ thau đổi đè tài
router.get('/xuatdenghithaydodetai',function (req,res) {
    res.json({msg: "xuatdenghithaydodetai"})
})

/**
 * Sua đổi đề tài
 * INSERT vao bang ChangeDeTai (Luutamthoi)
 * Khi duoc chap nhan thay doi thi
 *  + Xoa nhung de tai cu
 *  + Insert De tai trong ChangeDeTai vao DeTai
 */
router.get('/suadoidetai',function (req,res) {
    res.render('student/Svsuadoidetai',{
        title : "Sửa đổi đề tài"
    })

})
/**
 * idDeTai,GiangVienId,tenDetai
 */
router.post('/luutamthoi',insertToChangeDeTai,function (req,res) {
    res.send('Ok man')
})
router.get('/truongchapnhansua',function (req,res) {
    models.ChangeDeTai.findAll({}).then(function (detai) {
        if(detai){
            var ids = new Array()
            for(var i=0;i<detai.length;i++){
                ids.push(detai[i].dataValues.id)
            }
            //loi tai cho nay
            models.DeTai.deleteBulkDeTaiById(ids,function (isDelete) {
                console.log(isDelete)
                if(isDelete){
                    models.DeTai.create(detai).then(function () {
                        res.json({
                            msg : "Dữ liệu đã được cập nhật"
                        })
                    }).catch(function () {
                        res.json({
                            msg : "Hệ thống sinh lỗi, vui lòng kiểm tra lại"
                        })
                    })
                }
            },function () {
                res.json({
                    msg : "Hệ thống phát sinh lỗi, vui lòn kiểm tra lại"
                })
            })
        }else {
            res.json({
                msg : "Không có đề tài nào đc sửa chữa"
            })
        }
    }).catch(function () {
        res.json({
            msg : "Hệ thống phát sinh lỗi, vui lòn kiểm tra lại"
        })
    })

})

function insertToChangeDeTai(req,res,next) {
    if(validate(req.body.idDeTai,req.body.GiangVienId,req.body.tenDeTai)){
        var idDeTai= parseInt(req.body.idDeTai)
        var data ={
            GiangVienId : req.body.GiangVienId,
            tenDeTai : req.body.tenDeTai
        }
        models.ChangeDeTai.insertDeTai(idDeTai,data,models,function (detai) {
            return next();
        },function (err) {
            res.json({
                msg : "Khong insert duoc, vui lòng xem lai!",
                err:err
            })
        })
    }else{
        res.json({
            msg : "Vui lòng kiểm tra lại!"
        })
    }
}
function validate(id,GiangVienId,tenDeTai) {
    return validator.isInt(id.toString())&&
            !validator.isEmpty(id.toString())&&
            !validator.isEmpty(GiangVienId.toString())&&
            !validator.isEmpty(tenDeTai.toString())
}
module.exports = router;