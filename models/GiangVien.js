/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var GiangVien = sequelize.define("GiangVien", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        tenGiangVien : DataTypes.STRING(45),
        vnuMail : DataTypes.STRING(45),
        matKhau : DataTypes.STRING(45)
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Khoa, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.hasMany(models.LinhVucLienQuan);
                this.hasMany(models.ChuDeLienQuan);

            }
        }
    });

    return GiangVien;
};