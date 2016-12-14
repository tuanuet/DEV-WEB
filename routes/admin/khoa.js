/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var XLSX = require('xlsx');
var multipart = require('connect-multiparty');
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
    res.render('admin/upload-giangvien', {
        title: "Thêm giảng viên"
    })
})

//Gui mail den tat ca cac giang vien de khoi tao
router.get('/sendmailtogiangvien', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    models.GiangVien.getAllGV(function (gv) {
        if(gv){
            var listEmail = "";
            for(var i=0;i<gv.length;i++){
                if(i==gv.length -1){
                    listEmail += gv[i].vnuMail
                }else
                    listEmail += gv[i].vnuMail + ' ,'
            }
            // setup e-mail data with unicode symbols
            //noi dung mail nhe
            var mailOptions = {
                from: '"Hệ thống đăng kí khóa luận" <14020521@vnu.edu.vn>', // sender address
                to: '14020477@vnu.edu.vn', // list of receivers
                subject: 'Đăng ký khóa luân', // Subject line
                text: 'Hệ thống thông báo, Bạn đã được khởi tạo trên hệ thống\n Trân trọng thông báo!\n Tài khoản : email \n Mật khẩu : abca',
                html: '<a href="http://localhost:3000/users/login">Click vào đây</a>'
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.json({
                        msg: "Thất bại",
                        err: error
                    })
                } else
                    res.json({
                        msg: "Thành công"
                    })
            });
        }
    })

})
//Gui mail den tat ca cac sinh vien de khoi tao
router.get('/sendmailtosinhvien', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    models.SinhVien.getAllSinhVien(function (sv) {
        if(sv){
            var listEmail = "";
            for(var i=0;i<sv.length;i++){
                if(i==sv.length -1){
                    listEmail += sv[i].vnuMail
                }else
                    listEmail += sv[i].vnuMail + ' ,'
            }
            // setup e-mail data with unicode symbols
            //noi dung mail nhe
            var mailOptions = {
                from: '"Hệ thống đăng kí khóa luận" <14020521@vnu.edu.vn>', // sender address
                to: '14020557@vnu.edu.vn', // list of receivers
                subject: 'Đăng ký khóa luân', // Subject line
                text: 'Hệ thống thông báo, Bạn đã được khởi tạo trên hệ thống\n Trân trọng thông báo!\n Tài khoản : email \n Mật khẩu : abca',
                html: '<a href="http://localhost:3000/users/login">Click vào đây</a>'
            };
            // var mailOptions = {
            //     from: 'Hệ thống đăng kí khóa luận', // sender address
            //     // to: listEmail, // list of receivers
            //     form: '14020557@vnu.edu.vn',
            //     subject: 'Hệ thống đăng kí khóa luận', // Subject line
            //     text: 'Hệ thống thông báo, Bạn đã được phép đăng kí khóa luận trên hệ thống\n Trân trọng thông báo!'
            // };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error){
                if(error){
                    console.log(error);
                    res.json({
                        msg : "Thất bại",
                        err: error
                    })
                }else
                    res.json({
                        msg:"Thành công"
                    })
            });
        }
    },function (err) {
        res.json({
            msg: "Hệ thống có lỗi, vui lòng kiểm tra lại"
        })
    })
})
//ghi file tra ve admin
router.get('/getXLSX', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    var data = [{
        ten: "tuan",
        lop: "K95clc"
    }, {
        ten: "lan",
        lop: "k60cb"
    }]
    res.xls('data.xlsx', data)
})

//create 1 giang vien ~ ho tro nhap tay
router.post('/insertonegv', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    if (req.body) {
        var data = req.body;
        var gv = {
            id: data.id,
            tenGiangVien: data.tenGiangVien,
            vnuMail: data.vnuMail,
            DonViId: data.DonViId,
            matKhau: Math.random().toString(36).slice(-9)
        }
        //kiem tra xem trong db co chua
        // neu chua co thi insert
        //neu co roi thì bo qua insert chay ham tiep theo
        if(validateGV(gv)){
            models.GiangVien.insertOneGV(gv,function () {
                res.json({
                    msg: "insert thành công"
                })
            }, function (error) {
                if (error) {
                    res.json({
                        msg: "Giảng viên đã tồn tại!",
                        error: error.name
                    })
                }
            })
        }
    } else {
        res.json({
            msg: "Thêm giảng viên bị lỗi!"
        })
    }
})

/**
 * Hộ trơ nhập tay sinh viên
 */
router.post('/insertonesv', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    if (req.body) {
        var data = req.body;
        //kiem tra xem trong db co chua
        // neu chua co thi insert
        //neu co roi thì bo qua insert chay ham tiep theo
        if (validateSV(data)) {
            var sv = {
                id: data.id,
                tenSinhVien: data.tenSinhVien,
                vnuMail: data.vnuMail,
                duocDangKiKhoaLuanKhong: 0,
                KhoaHocKh: data.KhoaHocKh,
                NganhHocKh: data.NganhHocKh,
                matKhau: Math.random().toString(36).slice(-9)
            }

            models.SinhVien.insertOneSV(sv, function (sv) {
                res.json({
                    msg: "insert thành công"
                })
            }, function (error) {
                if (error) {
                    res.json({
                        msg: "Sinh viên đã tồn tại!",
                        error: error.name
                    })
                }
            })
        }
    } else {
        res.json({
            msg: "Thêm sinh viên bị lỗi!"
        })
    }
})

/*
 * them du lieu Sinh vien bang file xlsx
 * can kiem tra dau vao de insert vao bang
 */
router.post('/insertbulkgv', utility.reqIsAuthen,
    utility.reqIsKhoa,
    multipartMiddleware,
    getArrayFromXlsx,
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
router.post('/insertbulksv', utility.reqIsAuthen,
    utility.reqIsKhoa,
    multipartMiddleware,
    getArrayFromXlsx,
    insertDataToSinhVien,
    function (req, res) {
        res.json({
            msg: "Insert thanh cong"
        })
    }
)


function insertDataToGiangVien(data, req, res, next) {
    var gvs = new Array();
    // validate data
    //chua validate dau, vẫn phải code
    //start
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        if (validateGV(data[i])) {
            var gv = {
                id: data[i].id,
                tenGiangVien: data[i].tenGiangVien,
                vnuMail: data[i].vnuMail,
                DonViId: data[i].DonViId,
                matKhau: Math.random().toString(36).slice(-9)
            }
            gvs.push(gv)
        }
        else {
            res.json({
                msg: "import data false! please check again !",
                situation: i
            })
        }
    }
    //end
    models.GiangVien.insertBulkGV(gvs, function () {
        console.log("insert Thanh cong")
        return next();
    }, function (error) {
        res.json({
            msg: " Đã tồn tại giảng viên",
            error: error
        })
    })

}
function insertDataToSinhVien(data, req, res, next) {
    var svs = new Array();
    // validate data
    //chua validate dau, vẫn phải code
    //start
    for (var i = 0; i < data.length; i++) {
        if (validateSV(data[i])) {
            var sv = {
                id: data[i].id,
                tenSinhVien: data[i].tenSinhVien,
                vnuMail: data[i].vnuMail,
                duocDangKiKhoaLuanKhong: 0,
                KhoaHocKh: data[i].KhoaHocKh,
                NganhHocKh: data[i].NganhHocKh,
                matKhau: Math.random().toString(36).slice(-9)
            }
            svs.push(sv)

        }
        else {
            res.json({
                msg: "import data false! please check again !",
                situation: i
            })
        }
    }
    console.log(svs)
    //end
    models.SinhVien.insertBulkSV(svs, function () {
        console.log("insert Thanh cong")
        return next();
    }, function (error) {
        res.json({
            msg: " Đã tồn tại sinh viên",
            error: error
        })
    })
}
function validateGV(data) {
    return (
        !validator.isEmpty(data.tenGiangVien)
        && data.id
        && !validator.isEmpty(data.vnuMail)
        && !validator.isEmpty(parseInt(data.DonViId).toString())
        && validator.isAscii(data.id)
        && validator.isEmail(data.vnuMail)
        && validator.isInt(parseInt(data.DonViId).toString())
    )
}
function validateSV(data) {
    return (
        data.id
        && !validator.isEmpty(data.tenSinhVien)
        && !validator.isEmpty(data.KhoaHocKh)
        && !validator.isEmpty(data.NganhHocKh)
        && !validator.isEmpty(data.vnuMail)
        && validator.isAscii(data.id.toString())
        && validator.isEmail(data.vnuMail)
        && validator.isAscii(data.KhoaHocKh)
        && validator.isAscii(data.NganhHocKh)
    )
}

router.post('/checkMatchMaGV',utility.reqIsAuthen,utility.reqIsKhoa,function (req, res) {
        models.GiangVien.getGVByID(req.body.id, function (data) {
            if (data) {
                res.json({
                    msg: "Mã giảng viên đã bị trùng"
                })
            } else {
                res.json({
                    msg: ""
                })
            }
        })
    }
)

router.post("/checkMatchMaSV",utility.reqIsAuthen,utility.reqIsKhoa, function (req, res) {
    models.SinhVien.getSVByID(req.body.id, function (data) {
        if (data) {
            res.json({
                msg: "Mã sinh viên đã bị trùng"
            })
        } else {
            res.json({
                msg: ""
            })
        }
    })
})

function getArrayFromXlsx(req, res, next) {

    var file = req.files.file;

    // Tên file
    var originalFilename = file.name;
    console.log("Ten file vua up: " + originalFilename)
    // File type
    var fileType = file.type.split('/')[1];

    // File size
    var fileSize = file.size;
    // Đường dẫn lưu ảnh
    var pathUpload = __dirname + '/xlsx/' + originalFilename;

    // START READ XLSX DATA
    //doc du lieu tu xlsx dua ve object
    var workbook = XLSX.readFile(file.path);
    var sheet_name_list = workbook.SheetNames;
    var data = [];
    sheet_name_list.forEach(function (y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};

        for (z in worksheet) {
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            }
            ;
            var col = z.substring(0, tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if (row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }

        //drop those first two rows which are empty
        data.shift();
        data.shift();
    });

    return next(data);
}

router.post("/getDonVi", utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    console.log("Toan : " + req.user.id)
    models.DonVi.getAllDonViOfIdKhoa(req.user.id, function (data) {
        console.log(data)
        res.json({
            dataDV : data
        })
    })
})

router.post("/getKhoaHoc", utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    models.KhoaHoc.getAllKH(function (data) {
        res.json({
            dataKH : data
        })
    })
})


router.post("/getNganhHoc", utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    models.NganhHoc.getAllNH(function (data) {
        res.json({
            dataNH : data
        })
    })
})

var createLv = require('./createLV');
var module4 = require('./suadoidetai');
var module5 = require('./dangkibaove');
var module3 = require('./dangkidetai');
var module6 = require('./laphoiDong');

router.use('/', module6);
router.use('/', module3);
router.use('/', createLv);
router.use('/', module4);
router.use('/', module5);

module.exports = router;