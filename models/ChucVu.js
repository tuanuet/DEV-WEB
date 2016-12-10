/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var ChucVu = sequelize.define("ChucVu", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenChucVu : DataTypes.STRING
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasOne(models.PhanBien)
            }
        }
    });
    return ChucVu;
};
