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
        GiangVienId : DataTypes.STRING
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.HoiDong);
                this.belongsTo(models.ChucVu);
            },
            insertNewData : function(hoidongId, chucvuid, giangvienid, callback) {
                this.create({
                    HoiDongId : hoidongId,
                    ChucVuId : chucvuid,
                    GiangVienId : giangvienid
                }).then(callback)
            }
        }
    });
    return ChucVuTrongHoiDong;
};
