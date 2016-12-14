var express = require('express');
var router = express.Router();
var utility = require('../../Utility/utility')
var models = require('../../models');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var fs = require('fs')


module.exports = router;