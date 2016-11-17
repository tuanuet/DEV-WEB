/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Khoa = sequelize.define("Khoa", {
        kh: {
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
            }
        }
    });

    return Khoa;
};