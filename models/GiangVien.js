/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var GiangVien = sequelize.define("GiangVien", {
        id: {
            type: DataTypes.STRING(11),
            primaryKey: true
        },
        tenGiangVien: {
          type: DataTypes.STRING(100),
          allowNull :false
        },
        vnuMail: DataTypes.STRING(45),
        matKhau: DataTypes.STRING(45),
        DonViId : DataTypes.INTEGER(11),
        avatar : DataTypes.STRING,
        chuDeHuongNghienCuu : {
          type:DataTypes.TEXT,
          allowNull : true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.DonVi, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.belongsToMany(models.LinhVuc, {through : 'LinhVucLienQuans', timestamps: false});
                this.belongsToMany(models.DeTai, {through : 'PhanBien'});
            },
            insertBulkGV : function (gvs,callback,callback2) {

                this.bulkCreate(gvs).then(callback).catch(callback2)
            },
            getGiangVienByTaiKhoan: function (taiKhoan, callback) {
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
            getGVByID: function (idKhoa, callback) {
                this.findOne({
                    where: {
                        id: idKhoa
                    }
                }).then(callback)
            },
            insertOneGV : function (gv,callback,callback2) {
                this.create(gv).then(callback).catch(callback2)
            }
        }
    });

    return GiangVien;
};
