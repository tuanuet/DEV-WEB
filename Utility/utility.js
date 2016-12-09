/**
 * Created by Admin on 19/11/2016.
 */
var utility = require('../Utility/utility');
var models = require('../models')
var openPortDK = require('../config/config_Khoa_moDangKi.json')
module.exports.reqIsSV = function (req, res, next) {
    if (req.isAuthenticated() && req.user.tenSinhVien) {
        return next();
    } else {
        //tra lai 1 trang voi noi dung
        // ban ko co quyen han trong trang nau
        // res.redirect('/users/login');
        res.render('error',{
            title : "This is private page"
        })
    }
}
module.exports.reqIsKhoa = function (req, res, next) {
    if (req.isAuthenticated() && req.user.tenKhoa) {
        return next();
    } else {
        //tra lai 1 trang voi noi dung
        // ban ko co quyen han trong trang nau
        // res.redirect('/users/login');
        res.render('error',{
            title : "This is private page"
        })
    }
}
module.exports.reqIsGV = function (req, res, next) {
    if (req.isAuthenticated() && req.user.tenGiangVien) {
        return next();
    } else {
        //tra lai 1 trang voi noi dung
        // ban ko co quyen han trong trang nau
        // res.redirect('/users/login');
        res.render('error',{
            title : "This is private page"
        })
    }
}
module.exports.userIsGV = function (user) {
    if (user.tenGiangVien) {
        return true
    } else {
        return false
    }
}
module.exports.userIsSV = function (user) {
    if (user.tenSinhVien) {
        return true
    } else {
        return false
    }
}
module.exports.userIsKhoa = function (user) {
    if (user.tenKhoa) {
        return true
    } else {
        return false
    }
}
module.exports.reqIsAuthen = function (req, res, next) {

    
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/users/login')
    }
}
module.exports.reqIsNotAuthen = function (req, res, next) {
    if (req.isUnauthenticated()) {
        return next();
    }
    else {
        res.redirect('/')
    }
}
module.exports.reqIsWho = function (req, res, next, doSomething) {
    if (req.isAuthenticated()) {
        if (utility.userIsKhoa(req.user)) {
            doSomething()
        }
        if (utility.userIsSV(req.user)) {
            doSomething()
        }
        if (utility.userIsGV(req.user)) {
            doSomething()
        }
        return next();
    }
    else {
        res.redirect('/users/login')
    }
}
module.exports.userIsWho = function (req) {
    if (req.isAuthenticated()) {
        if (utility.userIsKhoa(req.user)) {
            return 2;
        }
        if (utility.userIsSV(req.user)) {
            return 0;
        }
        if (utility.userIsGV(req.user)) {
            return 1;
        }
    }
}

module.exports.getDataLVForNav = function (next) {
    models.LinhVuc.getLevel2OfTree(function (data) {
        return next(data);
    })
}


module.exports.getDataForNav = function (next) {
    models.Khoa.getAllKhoaAndDonVi(models,function (data) {
        return next(data);
    })
}
    /**
     *  khiem tra xem cong đăng kí khóa luận đã mở chưa
     *  Chua mở thì chuyển về
     */

module.exports.checkOpenPortDK = function (req,res,next) {
    if (openPortDK.moDangKi){
        return next();
    }else{
        res.render('error',{
            title : "Khoa chưa mở đăng kí"
        })
    }
}
//Xu ly ten giang vien
module.exports.chuyendoichuhoa =function(str)
{
    var strchuyendoi = "";
    var laytu = str.split(' ');
    var kytudau = "";
    for (var i = 0; i < laytu.length; i++)
    {
        kytudau = laytu[i].substring(0,1)
        strchuyendoi += kytudau.toUpperCase() + laytu[i].substring(1,laytu[i].length) + " ";
    }
    return strchuyendoi;
}