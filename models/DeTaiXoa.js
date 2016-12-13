/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var DeTaiXoa = sequelize.define("DeTaiXoa", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        DeTaiId : DataTypes.INTEGER
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
            }
        }
    });

    return DeTaiXoa;
};
