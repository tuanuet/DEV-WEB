/**
 * Created by DucToan on 14/12/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var ChucVuTrongHoiDong = sequelize.define("ChucVuTrongHoiDong", {
        HoiDongId : {
            type : DataTypes.INTEGER,
            primaryKey: true
        },
        ChucVuId :  {
            type : DataTypes.INTEGER,
            primaryKey: true
        },
        GiangVienId :  {
            type : DataTypes.STRING(11),
             primaryKey: true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.HoiDong);
                this.belongsTo(models.ChucVu);
                this.belongsTo(models.GiangVien);
            },
            insertNewData : function(hoidongId, chucvuid, giangvienid, callback) {
                this.create({
                    HoiDongId : hoidongId,
                    ChucVuId : chucvuid,
                    GiangVienId : giangvienid
                }).then(callback)
            },
            getAllHoiDongOfGV(gvID, callback) {
                this.findAll({
                    where : {
                        GiangVienId : gvID
                    }
                }).then(callback)
            },
            getAllGiangVien(idHD, models, callback) {
                console.log(idHD);
                this.findAll({
                    where : {
                        HoiDongId : idHD
                    }
                }).then(callback)
            }
        }
    });
    return ChucVuTrongHoiDong;
};
