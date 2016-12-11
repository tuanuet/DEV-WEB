/**
 * Created by DucToan on 11/12/2016.
 */

var fs = require('fs');

var header  = function () {
    return "\<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>\<head>\<meta charset=\"utf-8\"><title>Microsoft Office</title><style>table,th,td {border: 1px solid black;border-collapse: collapse;}</style></head><body>";
}


/**
 * Tạo bảng ở dạng html
 * @param title : Tiêu đề của bảng
 * @param listNameColumn : Danh sách tên các cột có trong bảng
 * @param listRow : Dữ liệu các hàng của bảng
 * @returns {string} nội dung của bảng hoàn chỉnh ở dạng html
 */
module.exports.tableTeamplate = function (title, listNameColumn, listRow) {
    var tableStr = "\<table width=\"100%\">";

    var rowFirstStr = "\<tr>";
    for (var i = 0; i < listNameColumn.length; i++) {
        rowFirstStr += "\<th>" + listNameColumn[i] + "\</th>";
    }
    rowFirstStr += "\</tr>";

    var allRowStr = "";
    for (var i = 0; i < listRow.length; i++) {
        allRowStr = "\<tr>";
        for(var j = 0; j < listRow[i].length; j++) {
            allRowStr += "\<td>" + listRow[i][j] + "\</td>";
        }
        allRowStr = "\</tr>";
    }

    tableStr += rowFirstStr + allRowStr + "\</table>"

    return tableStr;
}

/**
 * Luu noi dung thanh tep .doc
 * @param content : Nội dung cần ghi vào file.Được trình bày bằng html nằm trong thẻ <body>content</body>
 * @param namefile : tên file muốn lưu vào
 */
module.exports.createFile = function (content, namefile) {
    var stream = fs.createWriteStream(namefile + ".doc");
    stream.once('open', function() {
        var fullContent = header + content + "\</body></html>";
        stream.write(fullContent);
        stream.end();
    });
}
