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
var fs = require('fs')

router.use('/public/xlsx', express.static(__dirname + '/users/khoa/insertbulkgv'));

router.get('/', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.send('day la trang admin-khoa')
})
router.get('/insertgv', utility.reqIsAuthen, utility.reqIsKhoa, function (req, res) {
    res.render('upload-xlsx-giangvien')
})
/*
 * them du lieu giao vien bang file xlsx
 *
 * can kiem tra dau vao de insert vao bang
 */
router.post('/insertbulkgv',utility.reqIsAuthen,
    utility.reqIsKhoa,
    multipartMiddleware,
    getArrayGVFromXlsx,
    insertDataToGiangVien,
    function (req, res) {
    res.send('day la trang admin-khoa')
})

function getArrayGVFromXlsx(req,res,next) {

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
function insertDataToGiangVien(data,req,res,next) {
    var gvs = new Array();
    // validate data
    //chua validate dau, vẫn phải code
    //start
    for(var i=0;i<data.length;i++){
        var gv = {
            id : data[i].id,
            tenGiangVien : data[i].tenGiangVien,
            vnuMail : data[i].vnuMail,
            DonViId : data[i].DonViId,
            matKhau : "12345"
        }
        gvs.push(gv)
    }
    //end
    models.GiangVien.insertBulkGV(gvs,function () {
        console.log("insert Thanh cong")
        return next();
    })
}

module.exports = router;