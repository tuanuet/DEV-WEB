/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var GiangVien = sequelize.define("GiangVien", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tenGiangVien : DataTypes.STRING(45),
        vnuMail : DataTypes.STRING(45),
        matKhau : DataTypes.STRING(45)
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
                this.hasMany(models.LinhVucLienQuan);
                this.hasMany(models.ChuDeLienQuan);

            },
            getGiangVienByTaiKhoan : function (taiKhoan,callback) {
                this.findOne({
                    where : {
                        vnuMail : taiKhoan
                    }
                }).then(callback)
            },
            comparePassword : function(candidatePassword, hash, callback) {
                if(candidatePassword == hash)
                    callback(null,true)
                else callback(null,false)
                // bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
                //     if (err) throw err;
                //     callback(null, isMatch);
                // });
            }
        }
    });

    return GiangVien;
};