/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var LinhVucLienQuan = sequelize.define("LinhVucLienQuan", {

    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.GiangVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.belongsTo(models.LinhVuc, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    LinhVucLienQuan.removeAttribute('id')
    return LinhVucLienQuan;
};