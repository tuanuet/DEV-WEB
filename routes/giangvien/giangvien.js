/**
 * Created by Admin on 20/11/2016.
 */
var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');

router.get('/',utility.reqIsAuthen,function (req,res) {
    res.send('day la trang giang vien')
})
module.exports = router;