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
        idTrai : {
          type:DataTypes.INTEGER,
          allowNull : false
        },
        idPhai : {
          type: DataTypes.INTEGER,
          allowNull : false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasMany(models.LinhVucLienQuan);
            },
            themLinhVuc : function(nameLV, idParent, success, failure) {
              this.findOne({
                where : {id : idParent}
              }).then(function(data) {
                if (data != null) {
                  this.create({
                    tenLinhVuc : nameLV,
                    idTrai : data.idTrai,
                    idPhai : data.idPhai + 1
                  }).then(function(data) {
                    this.update({
                        idTrai : idTrai + 2,
                        idPhai : idPhai + 2
                      }, {
                        where : idTrai >= data.idPhai - 1
                      })
                  }).then(success).catch(failure)
                } else {
                   this.create({
                     tenLinhVuc : nameLV,
                     idTrai : 0,
                     idPhai : 1
                   })
                }
              }).catch(failure)
            }
        }
    });

    return LinhVuc;
};
