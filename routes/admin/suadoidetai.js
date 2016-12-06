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
module.exports = router;