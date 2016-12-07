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
                this.hasMany(models.LinhVucLienQuan);
                this.hasMany(models.LinhVuc,  {foreignKey: 'idParent'});
            },
            findLinhVuc : function (tenLv) {
                find
            },
            themLinhVuc : function (tenLv, idParent, callback, failure) {
                this.findAll({
                    where : { tenLinhVuc  : tenLv}
                }).then(function (data) {
                    console.log(data);
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
            findAllChild : function (idParent, callback) {
                this.findAll({
                    where : {idParent : idParent}
                }).then(callback(data))
            },
            getLevel2OfTree : function (callback) {
                this.min('idParent').then(function (data) {
                    console.log(data);
                    LinhVuc.findAll({
                        where : {idParent : data},
                        include : [{
                            model : LinhVuc,
                        }]
                    }).then(callback)
                })
            },
            getChildLevel1OfParent : function (idParent, callback) {
                this.findOne({
                    where : {id : idParent},
                    include : [{
                        model : LinhVuc
                    }]
                }).then(callback)
            }
        }
    });

    return LinhVuc;
};
