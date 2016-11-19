var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var utility = require('../Utility/utility')
var models = require('../models');

// Login
router.get('/login', function(req, res){
    res.json({
        status : 304,
        msg : "dang nhap loi"
    })
});

router.get('/',utility.reqIsGV,function(req, res){
    res.send( "ban la giang vien");
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
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//Post username va password
router.post('/login',
    passport.authenticate('local', {successRedirect:'/users', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        res.redirect('/users');
    });
//

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});
function reqAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            //req.flash('error_msg','You are not logged in');
            res.redirect('/users/login');
        }
}

module.exports = router;