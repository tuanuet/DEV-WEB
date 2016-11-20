/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var DeTai = sequelize.define("DeTai", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenDeTai: DataTypes.STRING(225),
        thoiGianNop: DataTypes.TIME,
        thoiGianSua: DataTypes.TIME,
        nopHoSoChua: DataTypes.INTEGER(1),
        duocBaoVeKhong: DataTypes.INTEGER(1),
        nopQuyenChua: DataTypes.INTEGER(1)
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
                this.hasMany(models.PhanBien)
                this.belongsTo(models.SinhVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: true
                    }
                });
            }
        }
    });

    return DeTai;
};