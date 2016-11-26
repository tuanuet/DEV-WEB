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

router.get('/', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.send('day la trang admin-khoa')
})
router.get('/insertgv', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.render('admin/upload-xlsx-giangvien',{
        title : "Thêm giảng viên"
    })
})
router.get('/insertsv', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.render('admin/upload-xlsx-sinhvien',{
        title: "Thêm sinh viên"
    })
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


function insertDataToGiangVien(data,req,res,next) {
    var gvs = new Array();
    // validate data
    //chua validate dau, vẫn phải code
    //start
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
        &&!validator.isEmpty(data.id)
        &&!validator.isEmpty(data.vnuMail)
        &&!validator.isEmpty(data.DonViId.toString())

        && validator.isAscii(data.id)
        && validator.isEmail(data.vnuMail)
        && validator.isInt(data.DonViId.toString())
    )
}
function validateSV(data) {

    return (
           !validator.isEmpty(data.id.toString())
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