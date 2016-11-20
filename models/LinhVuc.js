/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var LinhVuc = sequelize.define("LinhVuc", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenLinhVuc: DataTypes.STRING(45)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasMany(models.LinhVucLienQuan)
                this.hasMany(models.ChuDe)
            }
        }
    });

    return LinhVuc;
};