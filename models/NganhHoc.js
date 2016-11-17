/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var NganhHoc = sequelize.define("NganhHoc", {
        kh: {
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        tenNganhHoc : DataTypes.STRING(45),
        moTa :DataTypes.TEXT

    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Khoa, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                this.hasMany(models.SinhVien)
            }
        }
    });

    return NganhHoc;
};