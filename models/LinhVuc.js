/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var LinhVuc = sequelize.define("LinhVuc", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenLinhVuc: {
          type : DataTypes.STRING(45),
          allowNull : false
        },
        idParent : DataTypes.INTEGER
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsToMany(models.GiangVien,{through: 'LinhVucLienQuans',timestamps: false});
                this.hasMany(models.LinhVuc,  {foreignKey: 'idParent'});
            },
            themLinhVuc : function (tenLv, idParent, callback, failure) {
                this.findAll({
                    where : { tenLinhVuc  : tenLv}
                }).then(function (data) {
                    if(!data || data.length == 0) {
                        this.create({
                            tenLinhVuc: tenLv,
                            idParent: idParent
                        }).then(callback).catch(failure)
                    } else {
                        failure;
                    }
                })
            },
            showAllLinhVuc :function (callback) {
                this.findAll({}).then(callback)
            },
            findGiangVien : function (idLV,models, callback) {
                this.findOne({
                    where : {id : idLV},
                    include : [{
                        model : models.GiangVien
                    }]
                }).then(callback)
            },
            getLevel2OfTree : function (callback) {
                this.findOne({
                    where : {idParent : null}
                }).then(function (parent) {
                    if(parent) {
                        LinhVuc.findAll({
                            where: {idParent: null},
                            include: [{
                                model: LinhVuc,
                            }]
                        }).then(callback)
                    } else {
                        LinhVuc.min('idParent').then(function (data) {
                            LinhVuc.findAll({
                                where: {idParent: data},
                                include: [{
                                    model: LinhVuc,
                                }]
                            }).then(callback)
                        })
                    }
                })
            },
            getChildLevel1OfParent : function (idParent, models, callback,failure) {
                this.findOne({
                    where : {id : idParent},
                    include : [{
                        model : LinhVuc
                    },{
                        model : models.GiangVien
                    }]
                }).then(callback).catch(failure)
            }
        }
    });

    return LinhVuc;
};
