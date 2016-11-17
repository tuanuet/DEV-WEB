/**
 * Created by Admin on 17/11/2016.
 */
/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var SinhVien = sequelize.define("SinhVien", {
        MSSV: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenSinhVien: DataTypes.STRING(45),
        vnuMail : DataTypes.STRING(45),
        matKhau : DataTypes.STRING(45),
        duocDangKiKhoaLuanKhong : DataTypes.INTEGER(1)
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.NganhHoc, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.belongsTo(models.KhoaHoc, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return SinhVien;
};