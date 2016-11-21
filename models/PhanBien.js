/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var PhanBien = sequelize.define("PhanBien", {
        yKien: DataTypes.TEXT,
        GiangVienId : DataTypes.STRING(11),
        DeTaiId : DataTypes.INTEGER(11),
        diem: DataTypes.INTEGER(3)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.GiangVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: true
                    }
                });
                this.belongsTo(models.DeTai, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return PhanBien;
};