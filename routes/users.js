var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var utility = require('../Utility/utility')
var models = require('../models');
var khoa = require('../routes/admin/khoa')
var giangvien = require('../routes/giangvien/giangvien')
var sinhvien = require('../routes/sinhvien/sinhvien')
// Login
router.get('/login', function(req, res){
    res.render('login',{
        title : "Login"
    })
});

/*
 * xac thuc nguoi dung
 * tuy tung loai nguoi dung maf LocalStrategy khac nhau
 */

passport.use(new LocalStrategy(
    function(taiKhoan, matKhau , done) {
        models.Khoa.getKhoaByTaiKhoan(taiKhoan,function (userKhoa) {
            if(userKhoa){
                models.Khoa.comparePassword(matKhau,userKhoa.dataValues.matKhau,function (err,isMatch) {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, userKhoa.dataValues);
                    } else {
                        return done(null, false, {message: 'Sai mat khau'});
                    }
                })
            }
            else {
                models.SinhVien.getSinhVienByTaiKhoan(taiKhoan,function (userSV) {
                    if(userSV){
                        models.SinhVien.comparePassword(matKhau,userSV.dataValues.matKhau,function (err,isMatch) {
                            if(err) throw err;
                            if(isMatch){
                                return done(null, userSV.dataValues);
                            } else {
                                return done(null, false, {message: 'Sai mat khau'});
                            }
                        })
                    }
                    else {
                        models.GiangVien.getGiangVienByTaiKhoan(taiKhoan,function (userGV) {
                            if(!userGV){
                                return done(null, false, {message: 'Khong tim thay tai khoan'});
                            }
                            models.GiangVien.comparePassword(matKhau,userGV.dataValues.matKhau,function (err,isMatch) {
                                if(err) throw err;
                                if(isMatch){
                                    return done(null, userGV.dataValues);
                                } else {
                                    return done(null, false, {message: 'Sai mat khau'});
                                }
                            })
                        })
                    }
                })
            }

        })
    }));

passport.serializeUser(function(user, done) {
    if(utility.userIsGV(user)){
        done(null,{
            id : user.id,
            type : 1
        })
    }
    else if( utility.userIsKhoa(user)){
        done(null,{
            id : user.id,
            type : 2
        })
    }else {
        done(null,{
            id : user.id,
            type : 0
        })
    }

});

passport.deserializeUser(function(token, done) {
    switch (token.type){
        case 2:{
            models.Khoa.getKhoaByID(token.id,function (user) {
                done(null, user);
            })
        }
        case 1: {
            models.GiangVien.getGVByID(token.id,function (user) {
                done(null, user);
            })
        }
            models.SinhVien.getSVByID(token.id,function (user) {
                done(null, user);
            })
    }

});

//Post username va password
router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });
//

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});
router.use('/admin',khoa)
router.use('/giangvien',giangvien)
router.use('/sinhvien',sinhvien)
module.exports = router;