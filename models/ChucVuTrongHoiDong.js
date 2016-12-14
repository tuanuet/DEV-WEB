/**
 * Created by DucToan on 14/12/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var ChucVuTrongHoiDong = sequelize.define("ChucVuTrongHoiDong", {
        HoiDongId : {
            type : DataTypes.INTEGER,
            primaryKey: true
        },
        ChucVuId :  {
            type : DataTypes.INTEGER,
            primaryKey: true
        },
        GiangVienId :  {
            type : DataTypes.STRING(11),
             primaryKey: true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
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
                this.belongsTo(models.GiangVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            insertNewData : function(hoidongId, chucvuid, giangvienid, callback) {
                this.create({
                    HoiDongId : hoidongId,
                    ChucVuId : chucvuid,
                    GiangVienId : giangvienid
                }).then(callback)
            },
            getAllHoiDongOfGV:function(gvID, callback) {
                this.findAll({
                    where : {
                        GiangVienId : gvID
                    }
                }).then(callback)
            },
            getAllGiangVien:function(idHD, models, callback) {
                console.log(idHD);
                this.findAll({
                    where : {
                        HoiDongId : idHD
                    }
                }).then(callback)
            }
        }
    });
    return ChucVuTrongHoiDong;
};
