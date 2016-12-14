/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var DonVi = sequelize.define("DonVi", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenDonVi : DataTypes.STRING,
        KhoaId : DataTypes.STRING(45)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.Khoa, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.hasMany(models.GiangVien);
            },
            getAllDonViOfIdKhoa :  function(idKhoa, callback)  {
                this.findAll({
                    where : {KhoaId : idKhoa }
                }).then(callback)
            }
        }
    });
    return DonVi;
};
