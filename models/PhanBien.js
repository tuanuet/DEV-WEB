/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var PhanBien = sequelize.define("PhanBien", {
        yKien: DataTypes.TEXT,
        diem: DataTypes.INTEGER(3)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
            }
        }
    });

    return PhanBien;
};
