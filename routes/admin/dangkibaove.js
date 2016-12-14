
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
 * Gửi mail cho tat ca thông báo đăng kí bảo vệ
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
                // to: listEmail, // list of receivers
                to : '14020477@vnu.edu.vn,14020557@vnu.edu.vn',
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plaintext body
                html: '<b>Hello world </b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    res.json({
                        msg : "Thất bại"
                    })
                }else
                    res.json({
                        msg:"Thành công"
                    })
            });
        },function (err) {
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

//trang admin quan lý để tài
router.get('/quanlydetai',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var page;
    if(req.query.page && validator.isInt(req.query.page.toString())) {
        page = req.query.page;
    }else{
        page = 0;
    }
    models.DeTai.getCountDeTai(function (result) {
        var soPage = result.count/10;

        models.DeTai.getDeTaiAndSinhVienAndGiangVien(req.user.id,page,models,function (data) {
            res.render('admin/quanlydetai',{
                    title : "Quản lý đề tài",
                    data : data,
                    page : page,
                    pagination: soPage
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

/**
 * gửi mail to sinh vien chưa nộp hô sơ khóa luân
 */
router.get('/sendmailthongbaodangki',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
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

//tim kiem sinh vien khi trong trong trang quan ly
router.post('/searchsinhvien',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    if(req.body&&req.body.id){
        var idSinhVien = req.body.id;
        models.DeTai.getDeTaiAndSinhVienAndGiangVienBySinhVienId(idSinhVien,models,function (data) {
            if(data){
                res.render('admin/quanlydetai-onerow',{data : data.dataValues})
            }else{
                res.json({msg : "Không tìm thấy sinh viên"})
            }

        },function () {
            res.json({msg : "Hệ thống có lỗi"})
        })
    }else{
        res.json({msg : "Đường truyền mạng kém! vui lòng kiểm tra lại"})
    }
})

/**
 * chuyển đổi trạng thái nộp quyển,nộp hồ sơ
 * @param nopQuyen
 * @param nopHoSo
 */
router.post('/updatedetai',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    if(req.body) {
        if(req.body.nopHoSoChua == 0 ||req.body.nopHoSoChua ==1){
            var data = {
                nopHoSoChua: req.body.nopHoSoChua
            }
            models.DeTai.updateNopHoSoBySinhVienId(req.body.id, data, function (affectCount) {
                if (affectCount == 0) {
                    res.json({msg: "Không tìm thấy sinh viên"})
                } else {
                    res.json({msg: "update thành công"})
                }
            }, function (err) {
                res.json({msg: "Lỗi phát sinh từ hệ thống"})
            })
        }else if(req.body.nopQuyenChua == 0||req.body.nopQuyenChua == 1){
            var data = {
                nopQuyenChua: req.body.nopQuyenChua
            }
            models.DeTai.updateNopQuyenBySinhVienId(req.body.id, data, function (affectCount) {
                if (affectCount == 0) {
                    res.json({msg: "Không tìm thấy sinh viên"})
                } else {
                    res.json({msg: "update thành công"})
                }
            }, function (err) {
                res.json({msg: "Lỗi phát sinh từ hệ thống"})
            })
        }
    }
    else {
        res.json({
            msg : "not invalid",
            data: req.body
        })
    }
})
router.get('/deletedetaikhonghople',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    models.DeTai.deleteDeTaiUnvalidate(function (arg1,arg2) {
        res.json({
            msg : "xóa thành công"
        })
    },function (err) {
        res.json({
            msg : "Xóa thất bại",
            err :err
        })
    })
})
/**
 * kiểm tra hợ thức hồ sơ và chốt danh sách
 * kiểm tra xem detai nop ho so chua
 * + chua nop ho so xoa luon de tai
 * trả về 1 bẳng gồm sinh viên, giảng viên , đề tài
 */
router.get('/validatehoso',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    models.DeTai.validateHoSo(models,function (data) {
        res.render('admin/quanlydetai-validate',{
            title : "Kiểm tra hợp thức hồ sơ",
            data : data
        })
    },function (err) {
        res.json({
            title  : 'system has fail'
        })
    })
})

module.exports = router;