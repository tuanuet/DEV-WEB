/**
 * Created by Admin on 17/11/2016.
 */

"use strict";

module.exports = function (sequelize, DataTypes) {
    var SinhVien = sequelize.define("SinhVien", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tenSinhVien: DataTypes.STRING(45),
        vnuMail: DataTypes.STRING(45),
        matKhau: DataTypes.STRING(45),
        duocDangKiKhoaLuanKhong: DataTypes.INTEGER(1),
        KhoaHocKh : DataTypes.STRING,
        NganhHocKh : DataTypes.STRING(15)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
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
            },
            insertBulkSV : function (svs,callback,callback2) {
                console.log(svs)
                this.bulkCreate(svs,{validate : true})
                    .then(callback)
                    .catch(callback2)
            },
            getSinhVienByTaiKhoan: function (taiKhoan, callback) {
                this.findOne({
                    where: {
                        vnuMail: taiKhoan
                    }
                }).then(callback)
            },
            comparePassword: function (candidatePassword, hash, callback) {
                if (candidatePassword == hash)
                    callback(null, true)
                else callback(null, false)
                // bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
                //     if (err) throw err;
                //     callback(null, isMatch);
                // });
            },
            getSVByID: function (idKhoa, callback) {
                this.findOne({
                    where: {
                        id: idKhoa
                    }
                }).then(callback)
            }
        }
    });

    return SinhVien;
};