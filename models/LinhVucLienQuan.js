"use strict";

module.exports = function (sequelize, DataTypes) {
    var LinhVucLienQuan = sequelize.define("LinhVucLienQuan", {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
            GiangVienId: DataTypes.STRING(11) ,
            LinhVucId : DataTypes.INTEGER(11)
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
    return LinhVucLienQuan;
};
