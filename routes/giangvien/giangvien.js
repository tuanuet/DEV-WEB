/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');

router.get('/', utility.reqIsAuthen, utility.reqIsGV,function (req, res) {
    res.send('day la trang giang vien')
})
router.get('/myprofile',utility.reqIsAuthen,utility.reqIsGV,function (req,res) {
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(req.user.id,models,function (gv) {
        res.render('public/userprofile',{
            title : "My Profile",
            data : gv.dataValues
        })

    },function (err) {
        res.json(err)
    })
})
//Trang setting
router.get('/settings',utility.reqIsAuthen,utility.reqIsGV,function (req,res) {
    models.GiangVien.getGiangVienAndKhoaAndDonViAndLinhVucLienQuan(req.user.id,models,function (gv) {
        res.render('public/setting-userprofile',{
            title : "Settings",
            data : gv.dataValues
        })

    },function (err) {
        res.json(err)
    })

})
module.exports = router;