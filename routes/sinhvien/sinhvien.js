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
router.post('/updateavatar',utility.reqIsAuthen,utility.reqIsSV,multipartMiddleware,function (req,res) {
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
router.get('/dangki',utility.reqIsAuthen,utility.reqIsSV,utility.checkOpenPortDK,function (req,res) {
    res.render('student/SVdangki', {
        title: "Hệ thống đăng ký đề tài",
    })
})

//render trang dang ki cho sinh vien
router.get('/dangkikhoaluan',utility.reqIsAuthen,utility.reqIsSV,utility.checkOpenPortDK,function (req,res) {
    res.render('student/SVdangkidetai', {
        title: "Đăng kí đề tài",
    })
})
//sinh vien dang ki khoa luan
router.post('/insertdetai',utility.reqIsAuthen,utility.reqIsSV,utility.checkOpenPortDK,function (req,res) {
    console.log(req.body)
    if(req.body){
        var data = {
            GiangVienId : req.body.GiangVienId.trim(),
            SinhVienId :req.user.id,
            tenDeTai : req.body.tenDeTai.trim(),
            HoiDongId : null,
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
/**
 * Sua đổi đề tài
 * INSERT vao bang ChangeDeTai (Luutamthoi)
 * Khi duoc chap nhan thay doi thi
 *  update DeTai
 */
router.get('/suadetai',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.DeTai.getDeTaiBySinhVienId(req.user.id,function (detai) {
        if(detai){
            res.render('student/Svsuadetai',{
                title : "Chỉnh sửa đề tài",
                data : detai
            })
        }else{
            res.render('error',{
                title : "Bạn chưa đăng kí đề tài"
            })
        }
    },function (err) {
        res.render('error',{
            title : "Hệ thống có lỗi, vui lòng thử lại sau"
        })
    })


})
/**
 * idDeTai,GiangVienId,tenDetai
 */
router.post('/luutamthoi',utility.reqIsAuthen,utility.reqIsSV,insertToChangeDeTai,function (req,res) {
    res.json({
        msg : "Đăng ký chỉnh sửa thành công"
    })
})

/**
 * Kiểm tra xem trong cả 2 bang có tenDeTai trung khong
 * Có trùng thì tra ve lỗi
 * @param req
 * @param res
 * @param next
 */
function insertToChangeDeTai(req,res,next) {
    if(validate(req.body.idDeTai,req.body.GiangVienId,req.body.tenDeTai)){
        var idDeTai= parseInt(req.body.idDeTai)
        var data ={
            GiangVienId : req.body.GiangVienId.trim(),
            tenDeTai : req.body.tenDeTai.trim()
        }
        console.log(req.body)
        models.ChangeDeTai.insertDeTai(idDeTai,data,models,function (detai) {
            return next();
        },function (err) {
            res.json({
                msg : "Bạn đã đăng kí chỉnh sửa rồi, vui lòng đọi kết quả từ Khoa!",
                err:err
            })
        })
    }else{
        res.json({
            msg : "Vui lòng kiểm tra lại!"
        })
    }
}
function validateDeTai(data) {
    return (
        !validator.isEmpty(data.GiangVienId.toString())
        &&!validator.isEmpty(data.tenDeTai.toString())
    )
}
function validate(id,GiangVienId,tenDeTai) {
    return validator.isInt(id.toString())&&
        !validator.isEmpty(id.toString())&&
        !validator.isEmpty(GiangVienId.toString())&&
        !validator.isEmpty(tenDeTai.toString())
}
router.post("/getAllSV",utility.reqIsAuthen,utility.reqIsSV, function (req, res) {
    models.SinhVien.getAllSV(function (data) {
        res.json({
            dataSV : data
        })
    })
})

module.exports = router;