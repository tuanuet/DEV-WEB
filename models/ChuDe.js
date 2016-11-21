/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var ChuDe = sequelize.define("ChuDe", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenChuDe: DataTypes.STRING(255),
        LinhVucId :DataTypes.INTEGER(11)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasMany(models.ChuDeLienQuan);
                this.belongsTo(models.LinhVuc, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return ChuDe;
};