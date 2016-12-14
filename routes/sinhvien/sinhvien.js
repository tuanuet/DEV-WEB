/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var validator = require('validator');
var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var fs = require('fs')

router.get('/',utility.reqIsAuthen,function (req,res) {
    res.send('day la trang sinh vien')
})
router.get('/myprofile',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.SinhVien.getSinhVienAndKhoaAndKhoaHocAndNganhHoc(req.user.id,models,function (sv) {
        res.render('student/SVProfile',{
            title : "My Profile",
            data : sv.dataValues
        })
    },function (err) {
        res.json(err)
    })
})

//upload hinh anh
router.post('/updateavatar',multipartMiddleware,function (req,res) {
    var file = req.files.file;

    // Tên file
    var originalFilename = file.name;
    console.log("Ten file vua up: "+ originalFilename)
    // File type
    var fileType         = file.type.split('/')[1];

    // File size
    var fileSize         = file.size;
    // Đường dẫn lưu ảnh
    var pathUpload       =  utility.getMainHost(__dirname)  + '/public/image/' + originalFilename;
    var srcAvatar = '/image/' + originalFilename

    console.log(pathUpload)
    fs.readFile(file.path, function(err, data) {
        if(!err) {
            fs.writeFile(pathUpload, data, function(err) {
                if(!err){
                    models.SinhVien.updateAvatar(req.user.id,srcAvatar,function (sv) {
                        res.json({msg : "Update thành công"});
                    },function () {
                        res.json({msg : "Update lỗi"});
                    })
                }else {
                    res.json({msg : "Update lỗi"});
                }
            });

        }
    });
})
//Trang setting
router.get('/settings',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.SinhVien.getSinhVienAndKhoaAndKhoaHocAndNganhHoc(req.user.id,models,function (sv) {
        res.render('student/setting-SVProfile',{
            title : "Settings",
            data : sv.dataValues
        })

    },function (err) {
        res.json(err)
    })

})
//render trang dang ki cho sinh vien
router.get('/dangkikhoaluan',utility.checkOpenPortDK,function (req,res) {
    res.render('student/SVdangkidetai', {
        title: "Đăng kí đề tài",
    })
})
//sinh vien dang ki khoa luan
router.post('/insertdetai',function (req,res) {
    console.log(req.body)
    if(req.body){
        var data = {
            GiangVienId : req.body.GiangVienId,
            SinhVienId :req.user.id,
            tenDeTai : req.body.tenDeTai,
            thoiGianNop: null,
            thoiGianSua: null,
            nopHoSoChua: 0,
            duocBaoVeKhong: 0,
            nopQuyenChua: 0,
            duocGiangVienChapNhan : 0
        }
        if(validateDeTai(data)){
            models.DeTai.insertDeTai(data,models,function () {
                res.json({
                    msg : "Đăng kí hoàn tất, chúc mừng bạn!"
                })
            },function (msg) {
                res.json({
                    msg : msg,
                    status : 400
                })
            })
        }
        else {
            res.json({
                msg : 'Sai form vui lòng kiểm tra lại',
                status : 400
            })
        }
    }else {
        res.json({
            msg : "Quá trình đăng kí bị lỗi, vui lòng xem lại",
            status : 400
        })
    }
})
function validateDeTai(data) {
    return (
          !validator.isEmpty(data.GiangVienId.toString())
        &&!validator.isEmpty(data.tenDeTai.toString())
    )
}

router.post("/getAllSV", function (req, res) {
    models.SinhVien.getAllSV(function (data) {
        res.json({
            dataSV : data
        })
    })
})

module.exports = router;