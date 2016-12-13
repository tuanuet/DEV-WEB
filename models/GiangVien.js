/**
 * Created by Admin on 17/11/2016.
 */
var utility = require('../Utility/utility')
var sequelize =require('sequelize')
var bcrypt = require('bcryptjs');
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
                this.belongsToMany(models.LinhVuc,{through: 'LinhVucLienQuans',timestamps: false});
                this.hasMany(models.DeTai);
                this.hasMany(models.PhanBien)
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
                // if (candidatePassword == hash)
                //     callback(null, true)
                // else callback(null, false)
                bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
                    if (err) throw err;
                    callback(null, isMatch);
                });
            },
            getPassword : function (id, callback) {
                this.findOne({
                    where : {id : id}
                }).then(callback)
            },
            updatePassword : function (id, newpass, callback, failure) {
                this.update({
                    matKhau : newpass
                }, {
                    where : {id : id}
                }).then(callback).catch(failure)
            },
            getGVByID: function (id, callback) {
                this.findOne({
                    where: {
                        id: id
                    }
                }).then(callback)
            },
            insertOneGV : function (gv,callback,callback2) {
                this.create(gv).then(callback).catch(callback2)
            },
            getGiangVienAndKhoaAndDonViAndLinhVucLienQuan : function (id,models,success,failure) {
                this.findOne({
                    where : {id : id},
                    include : [{
                        model : models.DonVi,
                        include: [{
                            model : models.Khoa
                        }]
                        }, {
                            model : models.LinhVuc
                        }
                    ]
                }).then(success).catch(failure)
            },
            getGiangVienByName : function (query,success,failure) {
                var arr = query.toLowerCase().split(" ");
                var tenGiangVien = utility.chuyendoichuhoa(query.trim()).trim();
                this.findAll({
                    where : {
                        $or: [
                            {
                                tenGiangVien: {
                                    $like: '%'+tenGiangVien+'%'
                                }
                            }
                        ]
                    }
                }).then(success).catch(failure)
                // sequelize.query('SELECT `id`, `tenGiangVien`, `vnuMail`, `matKhau`, `DonViId`, `avatar`, `chuDeHuongNghienCuu` FROM `GiangViens` AS `GiangVien` WHERE (`GiangVien`.`tenGiangVien` LIKE N:search_name )',
                //     { replacements: { search_name: '%'+tenGiangVien+'%'  }, type: sequelize.QueryTypes.SELECT }
                // ).then(success).catch(failure)

            },
            getGiangVienByHuongNghienCuu : function (query,models,success,failure) {
                var arr = query.trim().toLowerCase().split(" ");
                var query1 = query.trim().toLowerCase();
                var query2 = utility.chuyendoichuhoa(query.trim()).trim();
                this.findAll({
                    where : {
                        chuDeHuongNghienCuu: {
                            $or: [
                                {
                                    $like: '%'+query1+'%'
                                },
                                {
                                    $like: '%'+query2+'%'
                                }
                            ]
                        }
                    },
                    include :{
                        model : models.DonVi
                    }
                }).then(success).catch(failure)
            },
            updateChudeNghienCuu : function (idGV,chudeMoi, callback) {
                this.update({
                    chuDeHuongNghienCuu : chudeMoi
                }, {
                    where : {id : idGV}
                }).then(callback)
            },
            updateAvatar : function (id,url,success,failure) {
                this.update(
                    {avatar : url},{
                        where : {id : id}
                    }).then(success).catch(failure)
            }
        }
    });

    return GiangVien;
};
