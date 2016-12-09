/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var NganhHoc = sequelize.define("NganhHoc", {
        kh: {
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        tenNganhHoc: DataTypes.STRING(100),
        moTa: DataTypes.TEXT,
        KhoaId : DataTypes.STRING(45)
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
                this.hasMany(models.SinhVien)
            },
            createNH : function (data, callback, failure) {
                this.create({
                    kh: data.kh,
                    tenNganhHoc: data.tenNganhHoc,
                    moTa: data.moTa,
                    KhoaId : data.KhoaId
                }).then(callback).catch(failure)
            }
        }
    });

    return NganhHoc;
};
