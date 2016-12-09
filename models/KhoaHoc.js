/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var KhoaHoc = sequelize.define("KhoaHoc", {
        kh: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        thoiGianBatDau : DataTypes.DATE,
        thoiGianKetThuc : DataTypes.DATE,
        moTa : DataTypes.TEXT
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.hasMany(models.SinhVien)
            },
            getAllKH : function (kh, callback) {
                this.findOne({
                    where : {kh : kh}
                }).then(callback)
            },
            createKH : function (khoahoc, callback,failure) {
                this.create({
                    kh: khoahoc.kh,
                    // thoiGianBatDau : khoahoc.thoiGianBatDau,
                    // thoiGianKetThuc : khoahoc.thoiGianKetThuc,
                    moTa : khoahoc.moTa
                }).then(callback).catch(failure)
            }
        }
    });
    return KhoaHoc;
};
