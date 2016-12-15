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


/**
 * MODULE 4 KHOA LAM
 * Sửa dổi đề tài
 */
//trang admin quan lý để tài
router.get('/quanlyrutdetai',utility.reqIsAuthen,utility.reqIsKhoa,getArrDeTaiXinRut,function (data,req,res,next) {
    console.log(data)
    var page;
    if(req.query.page && validator.isInt(req.query.page.toString())) {
        page = req.query.page;
    }else{
        page = 0;
    }
    var soPage = parseInt(data.length/10);
    console.log(soPage)
    res.render('admin/quanlyrutdetai',{
        title : "Quản lý rút đề tài",
        data : data,
        page : page,
        pagination: soPage
    })

})
//truong chap nhan xoa de tai
router.get('/truongchapnhanxoa',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    console.log("abc")
    models.DeTaiXoa.findAll({}).then(function (dtx) {
        //xoa tat ca cac hang trong DeTaiXoa
        models.DeTaiXoa.destroy({
            where : {}
        })
        console.log(dtx)
        if(dtx.length!=0){
            var arr = new Array();
            for(var i=0;i<dtx.length;i++){
                arr.push(dtx[i].dataValues.DeTaiId)
            }
            var dem =0;
            for(var i=0;i<dtx.length;i++){
                dem++;
                models.DeTai.destroy({
                    where : {id : arr[i]}
                }).then(function () {
                    if(dem==dtx.length){
                        res.json({
                            msg : "Rút đề tài thành công"
                        })
                    }
                })
            }
        }else{
            res.render('error',{
                title : "Không có đề tài xin rút "
            })
        }
    }).catch(function () {
        res.render('error',{
            title : "Hệ thồng sinh lỗi "
        })
    })
})
//Nha truong chap nhan đơn
router.get('/rutdangki',function (req,res) {
    models.DeTai.deleteBulkDeTaiBySinhVienId(SinhVienIds,function () {
        res.json({
            msg : "Xóa thành công",
            isDelete : true
        })
    },function (position) {
        res.json({
            msg : "Xóa thất bại",
            isDelete : false,
            position : position
        })
    })
})

//trang admin quan lý để tài
router.get('/quanlysuadetai',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var page;
    if(req.query.page && validator.isInt(req.query.page.toString())) {
        page = req.query.page;
    }else{
        page = 0;
    }
    models.ChangeDeTai.getCountDeTai(function (result) {
        if(result!=0){
            //pagination limt = 10
            var soPage = result.count/10;
            models.ChangeDeTai.getDeTaiAndSinhVienAndGiangVien(req.user.id,page,models,function (newData) {
                var ids = new Array();
                for(var i=0;i<newData.length;i++){
                    ids.push(newData[i].id)
                }
                //lay tat ca cac ten de tai cu
                models.DeTai.getNameOldDeTaiByChangeDeTai(ids,function (oldName) {
                    var arr = new Array();
                    for(var i=0;i<newData.length;i++){
                        var item = {
                            oldName : oldName[i],
                            data : newData[i]
                        }
                        arr.push(item)
                    }
                    res.render('admin/quanlysuadetai',{
                        title : "Quản lý chỉnh sửa đề tài",
                        data : arr,
                        page : page,
                        pagination: soPage
                    })
                },function () {

                })
            },function () {
                res.render('error',{
                    title : "Lỗi hệ thống"
                })
            })
        }else{
            res.render('error',{
                title : "Không có đề tài nào sửa đổi"
            })
        }

    },function (err) {
        res.render('error',{
            title : "Lỗi hệ thống"
        })
    })

})
//xuất file DOC đề nghỉ thau đổi đè tài
router.get('/xuatdenghithaydodetai',function (req,res) {
    res.json({msg: "xuatdenghithaydodetai"})
})

router.get('/openorclosesua',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var openPortSua = require('../../config/config_Khoa_moSuaDoi.json');
    switch (req.user.id){
        case 'fit':{
            if (openPortSua.fit){
                res.json({
                    status : "open"
                })
            }else{
                res.json({
                    status : "close"
                })
            }
            break;
        }
        case 'fet':{
            if (openPortSua.fet){
                res.json({
                    status : "open"
                })
            }else{
                res.json({
                    status : "close"
                })
            }
            break;
        }
        case 'fema':{
            if (openPortSua.fema){
                res.json({
                    status : "open"
                })
            }else{
                res.json({
                    status : "close"
                })
            }
            break;
        }
        case 'fepn':{
            if (openPortSua.fepn){
                res.json({
                    status : "open"
                })
            }else{
                res.json({
                    status : "close"
                })
            }
            break;
        }
    }
})

//Mo hoac dong cong sửa đề tai
//van dang dung body.id ==> phai chuyen sang user.id
router.post('/openportsua',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    var openPortSua = require('../../config/config_Khoa_moSuaDoi.json');
    console.log(req.body)
    if(req.body.permission){
        if(req.body.permission == 'open'){
            switch (req.user.id){
                case 'fit':{
                    openPortSua.fit = true;
                    break;
                }
                case 'fet':{
                    openPortSua.fet = true;
                    break;
                }
                case 'fema':{
                    openPortSua.fema = true;
                    break;
                }
                case 'fepn':{
                    openPortSua.fepn = true;
                    break;
                }
            }
            res.json({
                msg: 'đã mở cổng sửa đề tài',
                status : 'opened'
            })

        }else if(req.body.permission == 'close') {
            switch (req.user.id){
                case 'fit':{
                    openPortSua.fit = false;
                    break;
                }
                case 'fet':{
                    openPortSua.fet = false
                    break;
                }
                case 'fema':{
                    openPortSua.fema = false;
                    break;
                }
                case 'fepn':{
                    openPortSua.fepn = false;
                    break;
                }
            }
            res.json({
                msg: 'đã đóng cổng sửa đề tài',
                status : 'closed'
            })
        }
    }else {
        switch (req.user.id){
            case 'fit':{
                openPortSua.fit = false;
                break;
            }
            case 'fet':{
                openPortSua.fet = false
                break;
            }
            case 'fema':{
                openPortSua.fema = false;
                break;
            }
            case 'fepn':{
                openPortSua.fepn = false;
                break;
            }
        }
        res.json({
            msg: 'Có lỗi xảy ra'
        })
    }
})
/**
 * Truowng bam nut chap nhan sua de tai
 * thi update du lieu tu bang ChangeDeTai sang bang DeTai
 */
router.get('/truongchapnhansua',utility.reqIsAuthen,utility.reqIsKhoa,function (req,res) {
    models.ChangeDeTai.findAll({}).then(function (detai) {
        if(detai){
            models.DeTai.updateDeTaiSuaDoi(detai,function () {
                models.ChangeDeTai.destroy({
                    where : {}
                }).then(function () {
                    res.json({
                        msg : "Dữ liệu đã được cập nhật"
                    })
                })
            },function (err) {
                res.json({
                    msg : "Lỗi hệ thống, kiểm tra lại",
                    err: err
                })
            })
        }else {
            res.json({
                msg : "Không có đề tài nào đc sửa chữa"
            })
        }
    }).catch(function () {
        res.json({
            msg : "Hệ thống phát sinh lỗi, vui lòng kiểm tra lại"
        })
    })

})

//Tìm đề tài được xin rút
function getArrDeTaiXinRut(req,res,next) {
    var page;
    if(req.query.page && validator.isInt(req.query.page.toString())) {
        page = req.query.page;
    }else{
        page = 0;
    }
    models.DeTaiXoa.findAll({}).then(function (dtx) {
        console.log(dtx)
        if(dtx.length!=0){
            var arr = new Array();
            for(var i=0;i<dtx.length;i++){
                arr.push(dtx[i].dataValues.DeTaiId)
            }
            var result = new Array();
            for(var i=0;i<dtx.length;i++){
                models.DeTai.findOne({
                    where : {id : arr[i]},
                    include : [
                        {model : models.SinhVien},
                        {
                            model : models.GiangVien,
                            include : [
                                {
                                    model : models.DonVi,
                                    include : {
                                        model : models.Khoa,
                                        where : {
                                            id : req.user.id
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    limit : 10,
                    offset : page*10,
                    order : 'SinhVienId ASC'
                }).then(function (detai) {
                    result.push(detai.dataValues)
                    if(result.length == dtx.length){
                        return next(result)
                    }
                })
            }
        }else{
            res.render('error',{
                title : "Không có đề tài xin rút "
            })
        }
    }).catch(function () {
        res.render('error',{
            title : "Hệ thồng sinh lỗi "
        })
    })
}
module.exports = router;