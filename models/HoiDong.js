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
            }
        }
    });
    return HoiDong;
};
