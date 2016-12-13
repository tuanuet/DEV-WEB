/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var XLSX = require('xlsx');
var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();
var validator = require('validator')
var bcrypt = require('bcryptjs')
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


router.get('/admin', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.render('admin/upload-giangvien',{
        title : "Thêm giảng viên"
    })
})

//Gui mail den tat ca cac giang vien de khoi tao
router.get('/sendmailtogiangvien',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {

    // setup e-mail data with unicode symbols
    //noi dung mail nhe
    var mailOptions = {
        from: '"Fred Foo ?" <14020521@vnu.edu.vn>', // sender address
        to: '14020557@vnu.edu.vn', // list of receivers
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
})

//ghi file tra ve admin
router.get('/getXLSX',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var data = [{
        ten : "tuan",
        lop : "K95clc"
    },{
        ten : "lan",
        lop : "k60cb"
    }]
    res.xls('data.xlsx',data)
})

//create 1 giang vien ~ ho tro nhap tay
router.post('/insertonegv',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    if(req.body){
        var data = req.body;
        var gv = {
            id : data.id,
            tenGiangVien : data.tenGiangVien,
            vnuMail : data.vnuMail,
            DonViId : data.DonViId,
            matKhau : Math.random().toString(36).slice(-9)
        }
        //kiem tra xem trong db co chua
        // neu chua co thi insert
        //neu co roi thì bo qua insert chay ham tiep theo
        if(validateGV(gv)){
            models.GiangVien.insertOneGV(gv,function (gv) {
                res.json({
                    msg: "insert thành công"
                })
            },function (error) {
                if(error){
                    res.json({
                        msg: "Giảng viên đã tồn tại!",
                        error : error.name
                    })
                }
            })
        }
    }else {
        res.json({
            msg: "Thêm giảng viên bị lỗi!"
        })
    }
})

/**
 * Hộ trơ nhập tay sinh viên
 */
router.post('/insertonesv',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    if(req.body){
        var data = req.body;
        //kiem tra xem trong db co chua
        // neu chua co thi insert
        //neu co roi thì bo qua insert chay ham tiep theo
        if(validateSV(data)){
            var sv = {
                id : data.id,
                tenSinhVien : data.tenSinhVien,
                vnuMail : data.vnuMail,
                duocDangKiKhoaLuanKhong : 0,
                KhoaHocKh : data.KhoaHoc,
                NganhHocKh : data.NganhHoc,
                matKhau : Math.random().toString(36).slice(-9)
            }

            models.SinhVien.insertOneSV(sv,function (sv) {
                res.json({
                    msg: "insert thành công"
                })
            },function (error) {
                if(error){
                    res.json({
                        msg: "Sinh viên đã tồn tại!",
                        error : error.name
                    })
                }
            })
        }
    }else {
        res.json({
            msg: "Thêm sinh viên bị lỗi!"
        })
    }
})

/*
 * them du lieu Sinh vien bang file xlsx
 * can kiem tra dau vao de insert vao bang
 */
router.post('/insertbulkgv',utility.reqIsAuthen,
    utility.reqIsKhoa,
    multipartMiddleware,
    utility.getArrayFromXlsx,
    insertDataToGiangVien,
    function (req, res) {
        res.json({
            msg: "Insert thanh cong"
        })
    }
)
/*
 * them du lieu giao vien bang file xlsx
 * can kiem tra dau vao de insert vao bang
*/
router.post('/insertbulksv',utility.reqIsAuthen,
    utility.reqIsKhoa,
    multipartMiddleware,
    utility.getArrayFromXlsx,
    insertDataToSinhVien,
    function (req, res) {
        res.json({
            msg: "Insert thanh cong"
        })
    }
)


function insertDataToGiangVien(data,req,res,next) {
    var gvs = new Array();
    alert(1);
    // validate data
    //chua validate dau, vẫn phải code
    //start
    console.log(data)
    for(var i=0;i<data.length;i++){
        if (validateGV(data[i])) {
            var gv = {
                id : data[i].id,
                tenGiangVien : data[i].tenGiangVien,
                vnuMail : data[i].vnuMail,
                DonViId : data[i].DonViId,
                matKhau : Math.random().toString(36).slice(-9)
            }
            gvs.push(gv)
        }
        else {
            res.json({
                msg : "import data false! please check again !",
                situation : i
            })
        }
    }
    //end
    models.GiangVien.insertBulkGV(gvs,function () {
        console.log("insert Thanh cong")
        return next();
    },function (error) {
        res.json({
            msg : " Đã tồn tại giảng viên",
            error : error
        })
    })

}
function insertDataToSinhVien(data,req,res,next) {
    var svs = new Array();
        // validate data
        //chua validate dau, vẫn phải code
        //start
        for(var i=0;i<data.length;i++){
            if(validateSV(data[i])){
                var sv = {
                    id : data[i].id,
                    tenSinhVien : data[i].tenSinhVien,
                    vnuMail : data[i].vnuMail,
                    duocDangKiKhoaLuanKhong : 0,
                    KhoaHocKh : data[i].KhoaHoc,
                    NganhHocKh : data[i].NganhHoc,
                    matKhau : Math.random().toString(36).slice(-9)
                }
                svs.push(sv)
            }
            else {
                res.json({
                    msg : "import data false! please check again !",
                    situation : i
                })
            }

    }
    //end
    models.SinhVien.insertBulkSV(svs,function () {
        console.log("insert Thanh cong")
        return next();
    },function (error) {
        res.json({
            msg : " Đã tồn tại sinh viên",
            error : error
        })
    })
}
function validateGV(data) {
    return (
        !validator.isEmpty(data.tenGiangVien)
        && data.id
        &&!validator.isEmpty(data.vnuMail)
        &&!validator.isEmpty(parseInt(data.DonViId).toString())
        && validator.isAscii(data.id)
        && validator.isEmail(data.vnuMail)
        && validator.isInt(parseInt(data.DonViId).toString())
    )
}
function validateSV(data) {
    return (
        data.id
        && !validator.isEmpty(data.tenSinhVien)
        && !validator.isEmpty(data.KhoaHoc.toString())
        && !validator.isEmpty(data.NganhHoc)
        && !validator.isEmpty(data.vnuMail)
        && validator.isAscii(data.id.toString())
        && validator.isEmail(data.vnuMail)
        && validator.isAscii(data.KhoaHoc.toString())
        && validator.isAscii(data.NganhHoc)
    )
}

router.post('/checkMatchMaGV', function (req, res) {
        models.GiangVien.getGVByID(req.body.id, function(data){
            if (data){
                res.json({
                    msg: "Mã giảng viên đã bị trùng"
                })
            }else {
                res.json({
                    msg: "Mã giảng viên đúng"
                })
            }
        })
    }
)

var createLv = require('./createLV');
var module4 = require('./suadoidetai');
var module5 = require('./dangkibaove');
var module3 = require('./dangkidetai');

router.use('/',module3);
router.use('/',createLv);
router.use('/',module4);
router.use('/',module5);

module.exports = router;