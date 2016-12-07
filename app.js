var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var showall = require('./routes/public/showall');
var user = require('./routes/users');
var models = require('./models')
var openportDKKL = require('./config/config_Khoa_moDangKi.json')
var utility = require('./Utility/utility')
var json2xls = require('json2xls');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(json2xls.middleware)

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

//lay dataKhoa do vao nav
app.use(function (req,res,next) {
    utility.getDataForNav(next)
})

//Lay data LV
app.use(function (data, req, res, next) {
    res.locals.nav = data;
    utility.getDataLVForNav(next)
})

/*
 * Global Vars
 * khai bao mot so bien cuc bo
 * cac bien nay dc dung trong view
 */
app.use(function (data, req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.typeuser = utility.userIsWho(req);
  res.locals.linhvuc = data;
  res.locals.openportDKKL = openportDKKL.moDangKi;
  next();
});


app.use('/', index);
app.use("/intro", showall);
app.use('/users',user)


module.exports = app;
