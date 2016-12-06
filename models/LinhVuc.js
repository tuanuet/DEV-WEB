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
                }).then(callback)
            },
            getParentBig : function (callback) {
                this.min('idParent').then(callback)
            },
            showFullTree :function () {
                this.getParentBig(function (data) {
                    for(var i = 0; i < data.length; i++) {

                    }
                });
            }
        }
    });

    return LinhVuc;
};
