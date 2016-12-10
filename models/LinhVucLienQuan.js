"use strict";

module.exports = function (sequelize, DataTypes) {
    var LinhVucLienQuan = sequelize.define("LinhVucLienQuan", {
        GiangVienId :{
            type: DataTypes.STRING(11),
            primaryKey: true
        },
        LinhVucId : {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
        classMethods : {
            addNew : function (idGV, idLV, callback) {
                this.findOrCreate ({
                    where : {
                        GiangVienId: idGV,
                        LinhVucId: idLV
                    }
                }).then(callback)
            },
            findAllLinhVucOfGV : function (idGV, callback) {
                this.findAll({
                    where : {GiangVienId : idGV}
                }).then(callback)
            },
            deleteLinhVuc : function (idGV, idLV, callback) {
                this.destroy({
                    where : {
                        GiangVienId: idGV,
                        LinhVucId : idLV
                    }
                }).then(callback)
            },
            deleteAllLinhVucOf : function (idGV, callback) {
                this.destroy({
                    where : {
                        GiangVienId: idGV
                    }
                }).then(callback)
            }
        }
    });
    return LinhVucLienQuan;
};
