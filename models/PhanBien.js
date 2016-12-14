/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var PhanBien = sequelize.define("PhanBien", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        yKien: DataTypes.TEXT,
        ChucVuId : DataTypes.INTEGER,
        DeTaiId : DataTypes.INTEGER(11),
        HoiDongId : DataTypes.INTEGER,
        diem: DataTypes.INTEGER(3),
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.DeTai, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.belongsTo(models.HoiDong, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.belongsTo(models.ChucVu, {
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
