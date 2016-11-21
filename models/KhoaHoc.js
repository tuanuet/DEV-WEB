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
            }
        }
    });
    return KhoaHoc;
};