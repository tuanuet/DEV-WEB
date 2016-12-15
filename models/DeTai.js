/**
 * Created by Admin on 17/11/2016.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var DeTai = sequelize.define("DeTai", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        HoiDongId : DataTypes.INTEGER,
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
                this.belongsTo(models.HoiDong, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull : true
                    }
                });
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
            /*
             * Insert detai
             * Kiem tra xem có bn giang vien đã đc đk đề tài < 5 thì cho đk, >=5 thì thôi
             * Kiểm tra xem có tồn tại tenDeTai chưa nếu tồn tại thì ko cho đk
             */
            insertDeTai : function (data, models,success, failure) {
                // this.findAndCountAll({
                //     where : {
                //         GiangVienId : data.GiangVienId
                //     }
                // }).then(function (result) {
                //     if(result.count < 5){
                //
                //     }else{
                //         failure("Giảng viên đã đủ sinh viên đăng kí, vui lòng chọn giảng viên khác")
                //     }
                // }).catch(function () {
                //     failure("Quá trình đăng kí bị lỗi, vui lòng kiểm tra lại")
                // })
                this.findOne({
                    where : {
                        $or : [{
                            tenDeTai :
                                {
                                    $like : '%'+data.tenDeTai+'%'
                                }
                            }, {SinhVienId : data.SinhVienId}
                        ]
                    }}
                ).then(function (detai) {
                    if(detai){
                        failure("Đã tốn tại đề tài, vui lòng đăng kí lại")
                    }else {
                        this.create(data).then(success).catch(function () {
                            failure("Quá trình đăng kí bị lỗi, vui lòng kiểm tra lại")
                        })
                    }
                })

            },
            getDeTaiAndSinhVienByGiangVienId : function (id,models,success,failure) {
                this.findAll({
                    where : { GiangVienId : id},
                    include : [
                        {model : models.SinhVien}
                    ]
                }).then(success).catch(failure)
            },
            submitDeTaiBySinhVienId : function (svId,success,failure) {
                this.update(
                    {duocGiangVienChapNhan : 1},
                    {where : {SinhVienId : svId}}
                ).then(success).catch(failure)
            },
            deleteBulkDeTaiBySinhVienId : function (svIds,success,failure) {
                var dem=0;
                for(var i = 0;i<svIds.length;i++){
                    this.destroy({
                        where : {SinhVienId : svIds[i]}
                    }).then(function () {
                        dem++;
                        if(dem == svIds.length){
                            success();
                        }
                    }).catch(function () {
                        return failure(i)
                    })
                }
            },
            deleteDeTaiBySinhVienId:function (svID,success,failure) {
                this.destroy({
                    where : {SinhVienId : svID}
                }).then(success).catch(failure)
            },
            chotDeTaiDuocChapNhan : function (khoaId,models,success,failure) {
                this.findAll({
                    where : {duocGiangVienChapNhan : 1},
                    include : [
                        {
                            model: models.GiangVien,
                            include : [
                                {
                                    model : models.DonVi,
                                    include : {
                                        model : models.Khoa,
                                        where : {
                                            id : khoaId
                                        }
                                    }
                                }
                            ]
                        }]
                }).then(function (data) {
                    this.destroy({
                        where : {duocGiangVienChapNhan : 0}
                    }).then(function () {
                        success(data)
                    }).catch(failure)
                }).catch(failure)
            },
            getDeTaiAndSinhVienChuaNop : function (models,success,failure) {
                this.findAll({
                    where  : {nopHoSoChua : 0},
                    include : [{
                        model : models.SinhVien
                    }]
                }).then(success).catch(failure)
            },
            getDeTaiAndSinhVienAndGiangVien :function (khoaId,page,models,success,failure) {
                this.findAll({
                    include : [
                        {model : models.SinhVien},
                        {
                            model : models.GiangVien,
                            include : [
                                {
                                    model : models.DonVi,
                                    include : {
                                        model : models.Khoa,
                                        where : {
                                            id : khoaId
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    limit : 10,
                    offset : page*10,
                    order : 'SinhVienId ASC'
                }).then(success).catch(failure)
            },
            getDeTaiAndSinhVienAndGiangVienForExport :function (khoaId, models,success,failure) {
                this.findAll({
                    include : [
                        {model : models.SinhVien},
                        {
                            model : models.GiangVien,
                            include : [
                                {
                                    model : models.DonVi,
                                    include : {
                                        model : models.Khoa,
                                        where : {
                                            id : khoaId
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    order : 'SinhVienId ASC'
                }).then(success).catch(failure)
            },
            getCountDeTai : function (success,failure) {
                this.findAndCountAll().then(success).catch(failure)
            },
            getDeTaiAndSinhVienAndGiangVienBySinhVienId : function (SinhVienId,models,success,failure) {
                this.findOne({
                    where : {SinhVienId : SinhVienId},
                    include : [
                        {
                            model : models.SinhVien,
                            attributes : ['tenSinhVien','id']
                        },
                        {
                            model : models.GiangVien,
                            attributes : ['tenGiangVien']
                        }
                    ],
                    attributes: ['tenDeTai','nopQuyenChua','nopHoSoChua','duocBaoVeKhong','duocGiangVienChapNhan']
                }).then(success).catch(failure)
            },
            updateNopHoSoBySinhVienId :function (SinhVienId,data,success,failure) {
                this.update({
                    nopHoSoChua: data.nopHoSoChua
                },{
                    where : {SinhVienId : SinhVienId}
                }).then(success).catch(failure)
            },
            updateNopQuyenBySinhVienId :function (SinhVienId,data,success,failure) {
                this.update({
                    nopQuyenChua: data.nopQuyenChua
                },{
                    where : {SinhVienId : SinhVienId}
                }).then(success).catch(failure)
            },
            /**
             * tim kiem de tai chư nộp hồ sơ
             * xoa tất cả đề tài ko nộp hồ sơ
             * @param models
             * @param success
             * @param failure
             */
            validateHoSo : function (models,success,failure) {
                this.findAll({
                    where : {
                        nopHoSoChua : 1,
                        duocGiangVienChapNhan : 1
                    },
                    include: [
                        {model : models.SinhVien},
                        {model : models.GiangVien}
                    ]
                }).then(function (data) {
                    success(data)
                }).catch(failure)
            },
            deleteDeTaiUnvalidate :function (success,failure) {
                this.destroy({
                    where : {
                        $or : [{
                            nopHoSoChua : 0
                        },{
                            duocGiangVienChapNhan : 0
                        }]
                    }
                }).then(success).catch(failure)
            },
            updateDeTaiSuaDoi : function (detais,success,failure) {
                var dem=0;
                for(var i = 0;i<detais.length;i++){
                    this.update({
                        GiangVienId :detais[i].GiangVienId,
                        tenDeTai : detais[i].tenDeTai
                    },{where :{id : detais[i].id}}).then(function (dts) {
                        dem++;
                        if(dem == detais.length){
                            success();
                        }
                    }).catch(function () {
                        return failure(i)
                    })
                }
            },
            getDeTaiBySinhVienId : function (idSinhVien,success,failure) {
                this.findOne({
                    where :{SinhVienId  : idSinhVien}
                }).then(success).catch(failure)
            },
            getNameOldDeTaiByChangeDeTai : function (ids,success,failure) {
                var arr = new Array()
                for(var i=0;i<ids.length;i++){
                    this.findOne({
                        where : {id : ids[i]}
                    }).then(function (detai) {
                        var name = detai.dataValues.tenDeTai
                        arr.push(name)
                        if(arr.length == ids.length){
                            success(arr);
                        }
                    }).catch(function (err) {
                        failure("Lỗi hệ thống")
                    })
                }

            },
            getAllDeTaiDuocBaoVe : function (callback) {
                this.findAll({
                    where : {
                        nopHoSoChua : 1
                    }
                }).then(callback)
            },
            updateHoiDong : function (idDeTai, hoidongid, callbback) {
                this.update({
                    HoiDongId: hoidongid
                }, {
                    where : {id : idDeTai}
                }).then(callbback)
            },
            getAllDeTaiHasIDHoiDong : function(idHD, callback) {
                this.findAll({
                    where : {
                        HoiDongId : idHD
                    }
                }).then(callback)
            },
            getHoiDongOfDeTai : function(idDT, callback) {
                this.findOne({
                    where : {
                        id : idDT
                    }
                }).then(callback)
            }
        }
    });

    return DeTai;
};
