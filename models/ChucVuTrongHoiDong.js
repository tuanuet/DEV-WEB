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
            }
        }
    });
    return ChucVuTrongHoiDong;
};
