/**
 * Created by Admin on 17/11/2016.
 */
"use strict";
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var Khoa = sequelize.define("Khoa", {
        id: {
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        tenKhoa: DataTypes.STRING(15),
        vanPhongKhoa: DataTypes.STRING(15),
        taiKhoan : DataTypes.STRING(30),
        matKhau:DataTypes.STRING(30),
        moTa: DataTypes.TEXT
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.hasMany(models.BoMon);
                this.hasMany(models.GiangVien);
                this.hasMany(models.NganhHoc);
                this.hasMany(models.PhongThiNghiem);
            },
            getKhoaByTaiKhoan : function (username,callback) {
                this.findOne({
                    where : {
                        taiKhoan : username
                    }
                }).then(callback)
            },
            comparePassword : function(candidatePassword, hash, callback) {
                if(candidatePassword == hash)
                    callback(null,true)
                else callback(null,false)
                // bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
                //     if (err) throw err;
                //     callback(null, isMatch);
                // });
            },
            getKhoaByID : function (idKhoa,callback) {
                this.findOne({
                    where : {
                        id : idKhoa
                    }
                }).then(callback)
            }
        }
    });

    return Khoa;
};