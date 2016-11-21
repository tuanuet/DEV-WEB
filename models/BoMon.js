/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var BoMon = sequelize.define("BoMon", {
        tenBoMon: {
            type: DataTypes.STRING(45),
            primaryKey: true
        },
        moTa: DataTypes.TEXT
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

    return BoMon;
};
