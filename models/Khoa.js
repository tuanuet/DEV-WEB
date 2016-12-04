/**
 * Created by Admin on 17/11/2016.
 */
"use strict";
var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
    var Khoa = sequelize.define("Khoa", {
        id: {
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        tenKhoa: DataTypes.STRING(100),
        vanPhongKhoa: DataTypes.STRING(45),
        taiKhoan: DataTypes.STRING(30),
        matKhau: DataTypes.STRING(30),
        avatar : DataTypes.STRING,
        moTa: DataTypes.TEXT
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasMany(models.DonVi);
                this.hasMany(models.NganhHoc);
                this.hasMany(models.PhongThiNghiem);
                this.hasMany(models.LinhVuc);
            },
            getKhoaByTaiKhoan: function (username, callback) {
                this.findOne({
                    where: {
                        taiKhoan: username
                    }
                }).then(callback)
            },
            comparePassword: function (candidatePassword, hash, callback) {
                if (candidatePassword == hash)
                    callback(null, true)
                else callback(null, false)
                // bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
                //     if (err) throw err;
                //     callback(null, isMatch);
                // });
            },
            getKhoaByID: function (idKhoa, callback) {
                this.findOne({
                    where: {
                        id: idKhoa
                    }
                }).then(callback)
            },
            getKhoaAndDonViByIdKhoa : function (idKhoa,models,callback) {
                this.findOne({
                    where : {id : idKhoa},
                    include : [{
                        model : models.DonVi
                    }]
                }).then(callback)
            },
            getAllKhoaAndDonVi : function (models,callback) {
                this.findAll({
                    include : [{
                        model : models.DonVi
                    }]
                }).then(callback)
            },

            // Tìm tất cả giảng viên thuộc các đơn vị của một khoa có id là IdKhoa
            getGiangVienOfDonViOfKhoa : function (idKhoa,models,callback) {
                this.findOne({
                  where : {id : idKhoa},
                    include : [{
                        model : models.DonVi,
                        include : [{
                          model : models.GiangVien,
                        }]
                    }]
                }).then(callback)
            }
        }
    });

    return Khoa;
};
