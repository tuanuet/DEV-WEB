/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
router.get('/',utility.reqIsAuthen,function (req,res) {
    res.send('day la trang sinh vien')
})
router.get('/myprofile',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.SinhVien.getSinhVienAndKhoaAndKhoaHocAndNganhHoc(req.user.id,models,function (sv) {
        res.render('public/userprofile',{
            title : "My Profile",
            data : sv.dataValues
        })

    },function (err) {
        res.json(err)
    })
})
//Trang setting
router.get('/settings',utility.reqIsAuthen,utility.reqIsSV,function (req,res) {
    models.SinhVien.getSinhVienAndKhoaAndKhoaHocAndNganhHoc(req.user.id,models,function (sv) {
        res.render('public/setting-userprofile',{
            title : "Settings",
            data : sv.dataValues
        })

    },function (err) {
        res.json(err)
    })

})
module.exports = router;