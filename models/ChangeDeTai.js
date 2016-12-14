/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var ChangeDeTai = sequelize.define("ChangeDeTai", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        GiangVienId : DataTypes.STRING(11),
        SinhVienId: DataTypes.INTEGER(11),
        tenDeTai: DataTypes.STRING(225),
        thoiGianNop: DataTypes.DATE,
        thoiGianSua: DataTypes.DATE,
        nopHoSoChua: DataTypes.INTEGER(1),
        duocBaoVeKhong: DataTypes.INTEGER(1),
        nopQuyenChua: DataTypes.INTEGER(1),
        duocGiangVienChapNhan : DataTypes.INTEGER(1)
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.GiangVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull : false
                    }
                });
                this.belongsTo(models.SinhVien, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull : false
                    }
                });
            },
            /**
             * Tim kiem DeTai cu theo Id
             * insert thong tin dc update vao models (GiangVienId va tenDeTai)
             * @param id
             * @param data
             * @param models
             * @param success
             * @param failure
             */
            insertDeTai :function (id,data,models,success,failure) {
                models.DeTai.findOne({
                    where : {id : id}
                }).then(function (detai) {

                    //kiem tra xem ten de tai co trung voi ai ko
                    //trung thi phải nhap lai
                    console.log(detai.dataValues)
                    var detai_temp = {
                        id: id,
                        GiangVienId : data.GiangVienId,
                        SinhVienId: detai.dataValues.SinhVienId,
                        tenDeTai: data.tenDeTai,
                        thoiGianNop: detai.dataValues.thoiGianNop,
                        thoiGianSua: detai.dataValues.thoiGianSua,
                        nopHoSoChua: detai.dataValues.nopHoSoChua,
                        duocBaoVeKhong: detai.dataValues.duocBaoVeKhong,
                        nopQuyenChua: detai.dataValues.nopQuyenChua,
                        duocGiangVienChapNhan : detai.dataValues.duocGiangVienChapNhan
                    }
                    console.log(detai_temp)
                    models.ChangeDeTai.create(detai_temp).then(success).catch(failure)
                })
            }
        }
    });

    return ChangeDeTai;
};
