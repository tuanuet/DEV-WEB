/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var DeTaiXoa = sequelize.define("DeTaiXoa", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        DeTaiId : DataTypes.INTEGER
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {
            },
            //Tìm đề tài từ sinh viên Id
            insertDeTaiIdBySinhVienId : function (SinhVienId,models,success,failure) {
                models.DeTai.getDeTaiBySinhVienId(SinhVienId,function (detai) {
                    if(detai){
                        models.DeTaiXoa.findOne({
                            where : {DeTaiId : detai.dataValues.id}
                        }).then(function (dtx) {
                            if(dtx){
                                failure();
                            }else{
                                models.DeTaiXoa.create({DeTaiId: detai.dataValues.id}).then(success).catch(failure)
                            }
                        })
                    }
                },failure)
            },
            getCountDeTai : function (success,failure) {
                this.findAndCountAll().then(success).catch(failure)
            }
        }
    });

    return DeTaiXoa;
};
