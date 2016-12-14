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
            },
            insertYkien : function (idDT , idChucVu, yKien , diem, callback) {
                this.find({
                    where : {
                        DeTaiId : idDT,
                        ChucVuId : parseInt(idChucVu)
                    }
                }).then(function (data) {
                    if(data) {
                        this.update({
                            yKien : yKien,
                            diem : parseInt(diem)
                        }, {
                            where : {
                                DeTaiId : idDT,
                                ChucVuId : parseInt(idChucVu)
                            }
                        }).then(callback)
                    } else {
                        this.create({
                            yKien : yKien,
                            diem : parseInt(diem),
                            DeTaiId : idDT,
                            ChucVuId : parseInt(idChucVu)
                        }).then(callback)
                    }
                })
            }
        }
    });

    return PhanBien;
};
