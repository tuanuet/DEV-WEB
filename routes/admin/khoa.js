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

router.get('/', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.send('day la trang admin-khoa')
})

router.get('/admin', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.render('admin/upload-giangvien',{
        title : "Thêm giảng viên"
    })
})

//trang profile khoa
router.get('/profile/:idKhoa',function (req,res) {
    var idKhoa = req.params.idKhoa;
    console.log(idKhoa);
    models.Khoa.getKhoaAndDonViByIdKhoa(idKhoa,models,function (data) {
        var khoa = data.dataValues;
        //render
        res.json(khoa)

    })
})

//Gui mail den tat ca cac giang vien de khoi tao
router.get('/sendmailtogiangvien',function (req,res) {

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
//Gui mail đén tất cả các sinh viên có trạng thái được đăng kí
router.get('/sendmailtosinhvienduocdangki',function (req,res) {
    models.SinhVien.getSinhVienDuocDangKiKhoaLuan(function (sv) {
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
                from: 'Hệ thống đăng kí khóa luận', // sender address
                to: listEmail, // list of receivers
                subject: 'Hệ thống đăng kí khóa luận', // Subject line
                text: 'Hệ thống thông báo, Bạn đã được phép đăng kí khóa luận trên hệ thống\n Trân trọng thông báo!'
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
        }
    },function (err) {
        res.json({
            msg: "Hệ thống có lỗi, vui lòng kiểm tra lại"
        })
    })

})
//test mo cong dang ki khoa luan
router.get('/testopenport',utility.checkOpenPortDK,function (req,res) {
    res.json({
        trangthai : openPortDK.moDangKi
    })
})

//ghi file tra ve admin
router.get('/getXLSX',function (req,res) {
    var data = [{
        ten : "tuan",
        lop : "K95clc"
    },{
        ten : "lan",
        lop : "k60cb"
    }]
    res.xls('data.xlsx',data)
})
router.post('/updatesinhvienbyid',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    if(req.body.id){
        var id = req.body.id
        if(validator.isInt(id.toString())&&!validator.isEmpty(id.toString())){
            models.SinhVien.updateSinhVienDuocDangKiByID(req.body.id,function () {
                res.json({
                    msg : "Update thanh cong",
                    status : 200
                })
            },function () {
                res.json({
                    msg : "Update that bai",
                    status : 500
                })
            })
        }
    }else{
        res.json({
            msg : "Update that bai",
            status : 500
        })
    }

})

//trang Khoa => DonVi( co thong tin don vi va cac giao vien cua don vi do)
router.get('/donvi/:idDonVi',function (req,res) {
    var idDonVi = req.params.idDonVi;
    console.log(idDonVi);
    models.DonVi.getDonViAndGiangVienByIdDonVi(idDonVi,models,function (data) {
        var donvi = data.dataValues;
        //render
        res.json(donvi);
    })
})

//create 1 giang vien ~ ho tro nhap tay
//users/khoa/insertonegv
router.post('/insertonegv', function (req,res) {
    if(req.body){
        var data = req.body;
        var gv = {
            id : data.id,
            tenGiangVien : data.tenGiangVien,
            vnuMail : data.vnuMail,
            DonViId : data.DonViId,
            matKhau : "12345"
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
//Mo hoac dong cong dang ki
router.post('/openport',function (req,res) {
    if(req.body.permission){
        if(req.body.permission == 'open'){
            openPortDK.moDangKi = true;
            console.log(openPortDK.moDangKi)
            res.json({
                msg: 'đã mở cổng đăng kí'
            })
        }else {
            openPortDK.moDangKi = false;
            console.log(openPortDK.moDangKi)
            res.json({
                msg: 'đã đóng cổng đăng kí'
            })
        }
    }else {
        openPortDK.moDangKi = false;
        res.json({
            msg: 'Có lỗi xảy ra'
        })
    }

})

/*
 * them du lieu Sinh vien bang file xlsx
 *
 * can kiem tra dau vao de insert vao bang
 */
router.post('/insertbulkgv',utility.reqIsAuthen,
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
 *
 * can kiem tra dau vao de insert vao bang
*/
router.post('/insertbulksv',utility.reqIsAuthen,
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
/*
 * Thay đổi trang thai tu ko đc dang kí thanh duoc dang ki
 * */
router.post('/updatesinhvien',utility.reqIsAuthen,
    utility.reqIsKhoa,
    multipartMiddleware,
    getArrayFromXlsx,
    updateSinhVienDuocDangki,
    function (req, res) {
        res.json({
            msg: "Insert thanh cong"
        })
    }
)

function updateSinhVienDuocDangki(data,req,res,next) {
    var svs = new Array();
    // validate data
    //
    //start
    for(var i=0;i<data.length;i++){
        if(validateUpdateSinhVien(data[i])){
            var sv = {
                id : data[i].id,
                tenSinhVien : data[i].tenSinhVien.trim(),
                duocDangKiKhoaLuanKhong: 1
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
    //update
    models.SinhVien.updateSinhVienDuocDangKi(svs,function () {
        console.log("Update thanh cong")
        return next();
    },function (position) {

        res.json({
            msg : "import data false! please check again",
            position : position
        })
    })
}
function validateUpdateSinhVien(data) {
    return (
        !validator.isEmpty(data.id.toString())
        && !validator.isEmpty(data.tenSinhVien)
        && validator.isInt(data.id.toString())
    )
}
function insertDataToGiangVien(data,req,res,next) {
    var gvs = new Array();
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
                matKhau : "12345"
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
                    matKhau : "12345"
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
/*
 * đọc dữ liệu theo hàng
 *
 */
function getArrayFromXlsx(req,res,next) {

    var file = req.files.file;

    // Tên file
    var originalFilename = file.name;
    console.log("Ten file vua up: "+ originalFilename)
    // File type
    var fileType         = file.type.split('/')[1];

    // File size
    var fileSize         = file.size;
    // Đường dẫn lưu ảnh
    var pathUpload       = __dirname + '/xlsx/' + originalFilename;

    // START READ XLSX DATA
    //doc du lieu tu xlsx dua ve object
    var workbook = XLSX.readFile(file.path);
    var sheet_name_list = workbook.SheetNames;
    var data = [];
    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};

        for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }

        //drop those first two rows which are empty
        data.shift();
        data.shift();
    });

    return next(data);
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

module.exports = router;