
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

//MODULE 5 DANG KI BAO VE
/**
 * Gửi mail cho tat ca
 */
router.get('/mailthongbaodangkibaove',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var listEmail = new Array()
    models.GiangVien.getAllGiangVien(function (gv) {
        models.SinhVien.getAllSinhVien(function (sv) {
            for(var i=0;i<gv.length;i++){
                if(i==gv.length -1){
                    listEmail += gv[i].vnuMail
                }else
                    listEmail += gv[i].vnuMail + ' ,'
            }
            for(var i=0;i<sv.length;i++){
                if(i==sv.length -1){
                    listEmail += sv[i].vnuMail
                }else
                    listEmail += sv[i].vnuMail + ' ,'
            }

            // setup e-mail data with unicode symbols
            //noi dung mail nhe
            var mailOptions = {
                from: '"Fred Foo ?" <14020521@vnu.edu.vn>', // sender address
                to: listEmail, // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plaintext body
                html: '<b>Hello world </b>' // html body
            };

            // // send mail with defined transport object
            // transporter.sendMail(mailOptions, function(error, info){
            //     if(error){
            //         console.log(error);
            //         res.json({
            //             msg : "Thất bại"
            //         })
            //     }else
            //         res.json({
            //             msg:"Thành công"
            //         })
            // });
        },function (err) {

        })
    },function (err) {

    })

})

router.get('/quanlydetai',function (req,res) {
    res.render('admin/quanlydetai')
})

router.get('/mailthongbaochuadangki',function (req,res) {
    var listEmail = new Array()
    models.DeTai.getDeTaiAndSinhVienChuaNop(models,function (data) {
        for(var i=0;i<data.length;i++){
            if(i==data.length -1){
                listEmail += data[i].dataValues.SinhVien.vnuMail
            }else
                listEmail += data[i].dataValues.SinhVien.vnuMail + ' ,'
        }

        // setup e-mail data with unicode symbols
        //noi dung mail nhe
        var mailOptions = {
            from: '"Fred Foo ?" <14020521@vnu.edu.vn>', // sender address
            to: listEmail, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plaintext body
            html: '<b>Hello world </b>' // html body
        };

        // send mail with defined transport object
        // transporter.sendMail(mailOptions, function(error, info){
        //     if(error){
        //         console.log(error);
        //         res.json({
        //             msg : "Thất bại"
        //         })
        //     }else
        //         res.json({
        //             msg:"Thành công"
        //         })
        // });
    },function () {
        res.json({
            msg : "Lỗi không gửi được thông báo"
        })
    })

})


module.exports = router;