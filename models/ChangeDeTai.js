/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var ChangeDeTai = sequelize.define("ChangeDeTai", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        GiangVienId : DataTypes.STRING(11),
        SinhVienId: DataTypes.INTEGER(11),
        tenDeTai: DataTypes.STRING(225),
        thoiGianNop: DataTypes.DATE,
        thoiGianSua: DataTypes.DATE,
        nopHoSoChua: DataTypes.INTEGER(1),
        duocBaoVeKhong: DataTypes.INTEGER(1),
        nopQuyenChua: DataTypes.INTEGER(1),
        duocGiangVienChapNhan : DataTypes.INTEGER(1)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.GiangVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull : false
                    }
                });
                this.belongsTo(models.SinhVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull : false
                    }
                });
            }
        }
    });

    return ChangeDeTai;
};
