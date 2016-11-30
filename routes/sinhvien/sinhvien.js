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
router.get('/myprofile',function (req,res) {
    res.render('public/userprofile')
})
router.get('/settings',function (req,res) {
    res.render('public/setting-userprofile')
})
module.exports = router;