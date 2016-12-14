/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var HoiDong = sequelize.define("HoiDong", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenHoiDong : DataTypes.STRING,
        ngayToChuc : DataTypes.DATE,
        diaDiem : DataTypes.STRING
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasMany(models.PhanBien);
                this.hasMany(models.ChucVuTrongHoiDong);
                this.hasMany(models.DeTai);
            },
            insertHoiDong : function (tenHD, diadiem, callback) {
                this.create({
                    tenHoiDong : tenHD,
                    diaDiem : diadiem
                }).then(callback)
            },
            getAllHoiDong : function (callback) {
                this.findAll({}).then(callback)
            }
        }
    });
    return HoiDong;
};
