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
            addNew : function (idLV, idGV, callback) {
                this.create({
                    GiangVienId : idGV,
                    LinhVucId : idLV
                }).then(callback)
            }
        }
    });
    return LinhVucLienQuan;
};
