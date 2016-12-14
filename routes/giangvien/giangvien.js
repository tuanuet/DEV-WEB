/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var fs = require('fs');
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

router.get('/', utility.reqIsAuthen, utility.reqIsGV, function (req, res) {
    res.send('day la trang giang vien')
})
router.get('/myprofile', utility.reqIsAuthen, utility.reqIsGV, function (req, res) {
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(req.user.id, models, function (gv) {
        res.render('giangvien/GVprofile', {
            title: "My Profile",
            data: gv.dataValues
        })

    }, function (err) {
        res.json(err)
    })
})

//Trang setting
router.get('/settings', utility.reqIsAuthen, utility.reqIsGV, function (req, res) {
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(req.user.id, models, function (gv) {
        models.LinhVuc.getLevel2OfTree(function (lv) {
            res.render('giangvien/setting-GVprofile', {
                title: "Settings",
                datagv: gv.dataValues,
                datalv: lv,
                sign: findLVLQ(gv.dataValues, lv)
            })
        })
    }, function (err) {
        res.json(err)
    })

})
//upload hinh anh
router.post('/updateavatar',utility.reqIsAuthen,utility.reqIsGV, multipartMiddleware,function (req, res) {
    var file = req.files.file;

    // Tên file
    var originalFilename = file.name;
    console.log("Ten file vua up: " + originalFilename)
    // File type
    var fileType = file.type.split('/')[1];

    // File size
    var fileSize = file.size;
    // Đường dẫn lưu ảnh
    var pathUpload = utility.getMainHost(__dirname) + '/public/image/' + originalFilename;
    var srcAvatar = '/image/' + originalFilename

    console.log(pathUpload)
    fs.readFile(file.path, function (err, data) {
        if (!err) {
            fs.writeFile(pathUpload, data, function (err) {
                if (!err) {
                    models.GiangVien.updateAvatar(req.user.id, srcAvatar, function (sv) {
                        res.json({msg: "Update thành công"});
                    }, function () {
                        res.json({msg: "Update lỗi"});
                    })
                } else {
                    res.json({msg: "Update lỗi"});
                }
            });

        }
    });
})
/**
 * Đánh dấu những lĩnh mục liên quan của giảng viêns
 */
function findLVLQ(gv, lv) {
    var array = [];
    for (var i = 0; i < lv.length; i++) {
        array.push(checkContain(lv[i].dataValues.id, gv.LinhVucs))
        for (var j = 0; j < lv[i].LinhVucs.length; j++) {
            array.push(checkContain(lv[i].LinhVucs[j].id, gv.LinhVucs));
        }
    }
    return array;
}

function checkContain(idLv, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].dataValues.id == idLv) {
            return "checked";
        }
    }
    return "";
}

//tra lai trang dangkikhoaluan
router.get('/dangkikhoaluan', utility.reqIsAuthen, utility.reqIsGV, function (req, res) {
    models.DeTai.getDeTaiAndSinhVienByGiangVienId(req.user.id, models, function (data) {
        res.render('giangvien/dkkl_giangvien', {
            title: "Danh sách sinh viên đăng kí khóa luận",
            data: data
        })
    }, function (err) {
        res.render('error', {
            title: "Hệ thống phát sinh lỗi vui lòng thử lại"
        })
    })

})
/**
 * mudule 3
 * post control gom (chấp nhận hoặc xóa)
 * + control = submit || delete
 * + idSinhVien
 */
router.post('/controldetai', utility.reqIsAuthen, utility.reqIsGV,function (req, res) {
    if (req.body && req.body.id && req.body.control == 'submit') {
        var svId = req.body.id;
        var mail = svId+"@vnu.edu.vn"

        models.DeTai.submitDeTaiBySinhVienId(svId, function () {
            guiMailToSinhVien("14020477@vnu.edu.vn","Đề tài của bạn được chấp nhận!\n Chúc mừng bạn.",req,res,function () {
                res.json({
                    msg: "Update thành công",
                    isSubmit: true
                })
            })

        }, function () {
            res.json({
                msg: "Update thất bại",
                isSubmit: false
            })
        })
    } else if (req.body && req.body.control == 'delete') {
        var svId = req.body.id
        models.DeTai.deleteDeTaiBySinhVienId(svId, function () {
            guiMailToSinhVien("14020477@vnu.edu.vn","Đề tài của bạn không được chấp nhận! Vui lòng đăng ký lại",req,res,function () {
                res.json({
                    msg: "Delete thành công",
                    isDelete: true
                })
            })
        }, function () {
            res.json({
                msg: "Delete thất bại",
                isDelete: false
            })
        })
    }
})


/**
 * Xu ly khi go mat khau cu
 */
router.post("/comparepass",utility.reqIsAuthen,utility.reqIsGV,function (req, res) {
    models.GiangVien.getPassword(req.body.id, function (data) {
        if (data.matKhau == req.body.password) {
            res.json({
                msg: "Mật khẩu đúng",
                result: true
            })
        } else {
            res.json({
                msg: "Mật khẩu vừa nhập sai",
                result: false
            })
        }
    })
})

/**
 * Lưu mật khẩu
 */

router.post("/savepass",utility.reqIsAuthen,utility.reqIsGV, function (req, res) {
    models.GiangVien.updatePassword(req.body.id, req.body.password, function () {
        res.json({
            msg: "Mật khẩu thay đổi thành công"
        })
    }, function () {
        res.json({
            msg: "Mật khẩu thay đổi đã xảy ra lỗi"
        })
    })
})

/**
 * Xử lý khi gửi form cập nhật thông tin
 */
router.post("/updateinfor",utility.reqIsAuthen,utility.reqIsGV,
    updateChuDeMoi, deleteLinhVucOfGV, updateLinhVucForGV,
    function (req, res) {
        res.json({
            status: 200,
            msg: "Thành công",
        })
    })

router.post("/getAllGV",utility.reqIsAuthen,utility.reqIsGV, function (req, res) {
    models.GiangVien.getAllGV(function (data) {
        res.json({
            dataGV : data
        })
    })
})

router.get("/quanlyphanbien", function (req, res) {
    utility.isThuKy(req.user.id, function (list) {
        if (list.length > 0) {
            // for(var i = 0; i < list.length; i++) {
            models.DeTai.getAllDeTaiHasIDHoiDong(list[0], function (data) {
                console.log("Hanh : " + data[0].tenDeTai);
                res.render("giangvien/phanBienKL", {
                    title: "Danh sách các đề tài",
                    dataDT: data
                })
            })
            //  }
        } else {
            res.render("giangvien/phanBienKL", {
                title: "Danh sách các đề tài",
                dataDT: []
            })
        }
    })
})

router.get("/quanlyphanbien/detai/:idDT" , function (req, res) {
    var idDT = req.params.idDT;
    models.DeTai.getHoiDongOfDeTai(idDT, function (data) {
        if(data) {
            console.log("hanh : " + data.HoiDongId);
            models.ChucVuTrongHoiDong.getAllGiangVien(data.HoiDongId, models, function (data2) {
                console.log(data2);
                res.render("giangvien/nhapdiemChoDeTai", {
                    title : "Nhập điểm cho đề tài",
                    data : data2
                })
            })
        }
    })

});

router.post("/updateBangPhanBien" , function (req, res) {
    var array = req.body.list;
    var dem = 0;
    for(var i = 0; i < array.length; i++) {
        models.PhanBien.insertYkien(parseInt(req.body.idDT), array[i][1], array[i][2], array[i][3], function () {
            dem++;
            if(dem == array.length - 1) {
                res.json({
                    msg : "Thành công"
                })
            }
        })
    }
})

function updateChuDeMoi(req, res, next) {
    models.GiangVien.updateChudeNghienCuu(req.body.id, req.body.chude, function () {
        return next();
    });
}

function deleteLinhVucOfGV(req, res, next) {
    models.LinhVucLienQuan.deleteAllLinhVucOf(req.user.id, function () {
        return next();
    })
}

function updateLinhVucForGV(req, res, next) {
    for (var i = 0; i < req.body.arrayListLV.length; i++) {
        models.LinhVucLienQuan.addNew(req.user.id, req.body.arrayListLV[i], function () {
            if (i >= req.body.arrayListLV.length - 1) {
                return next();
            }
        })
    }
}
//Gui mail toi sinh vien khi giang vien chap nhan hay xoa de tai
function guiMailToSinhVien(mail,thongBao,req,res,next) {
    // setup e-mail data with unicode symbols
    //noi dung mail nhe
    var mailOptions = {
        from: '"Hệ thống đăng kí khóa luận" <14020521@vnu.edu.vn>', // sender address
        to: mail, // list of receivers
        subject: 'Thông báo đăng ký khóa luận', // Subject line
        text: thongBao
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        next();
    });
}

module.exports = router;