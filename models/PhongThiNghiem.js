/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var PhongThiNghiem = sequelize.define("PhongThiNghiem", {
        tenPhongThiNghiem: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.Khoa, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return PhongThiNghiem;
};