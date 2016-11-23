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
        tenLinhVuc: DataTypes.STRING(45),
        KhoaId : DataTypes.STRING(15),
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
                this.belongsToMany(models.GiangVien, {through : 'LinhVucLienQuans',timestamps: false});
                this.belongsTo(models.Khoa, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return LinhVuc;
};
