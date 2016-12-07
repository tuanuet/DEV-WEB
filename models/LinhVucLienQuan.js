"use strict";

module.exports = function (sequelize, DataTypes) {
    var LinhVucLienQuan = sequelize.define("LinhVucLienQuan", {
    }, {
        timestamps: false,
    });
    return LinhVucLienQuan;
};
