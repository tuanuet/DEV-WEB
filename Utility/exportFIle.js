var fs = require('fs');
var officegen = require('officegen');
var docx = officegen('docx');
// Đoạn trên là đoạn import

//Cách căn lề khác
var pObj = docx.createP();

//Tạo bảng tiêu đề
var tieuDe = [
	[{ ///Tùy chọn của các cột 
        val: "ĐẠI HỌC QUỐC GIA HÀ NỘI",
        opts: {
            sz: '26',
            cellColWidth: 15000,
        }
    } , {
    	val: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        opts: {
            sz: '26',
            cellColWidth: 15000,
        }
    }],

     ['TRƯỜNG ĐẠI HỌC CÔNG NGHỆ' , 'Độc lập - Tự do - Hạnh phúc'],]

var tieuDeStyle = {
    tableSize: 50,
    tableFontFamily: "Times New Roman",
}

docx.createTable(tieuDe, tieuDeStyle);

var pObj = docx.createP();
pObj.addText('HIỆU TRƯỞNG');
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('TRƯỜNG ĐẠI HỌC CÔNG NGHỆ');
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('Căn cứ Quy định về Tổ chức hoạt động của cá đơn vị thành viên và đơn vị trực thuộc Đại học Quốc gia Hà Nội ban hành theo nghị quyết số 3568/QĐ-ĐHQGHN ngày 08/10/2014 của Giám đốc Đại học Quốc gia Hà Nội;')
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('Căn cứ "Quy chế đào tạo đại học ở Đại học Quốc gia Hà Nội" ban hành theo Quyết định số 3079/QĐ-ĐHQGHN ngày 26/10/2010 và được sửa đổi, bổ sung theo Quyết định số 685/QĐ-ĐHQGHN ngày 08/03/2013 của Giám đốc Đại học Quốc gia Hà Nội;')
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('ahihi')

docx.putPageBreak(); //Ngắt trang


//Tạo bảng danh sách
var table = [
    [{ ///Tùy chọn của các cột  ( ở đây có 3 cột)
        val: "TT",
        opts: {
            b: true,
            sz: '26',
        }
    } , {
    	val: "Mã SV",
        opts: {
            b: true,
            sz: '26',
        }
    } , {
    	val: "Ngày sinh",
        opts: {
            b: true,
            sz: '26',
        }
    } , {
    	val: "Lớp",
        opts: {
            b: true,
            sz: '26',
        }
    } , {
    	val: "Tên đề tài",
        opts: {
            b: true,
            sz: '26',
        }
    } , {
    	val: "Cán bộ hướng dẫn/ Cán bộ đồng hướng dẫn",
        opts: {
            b: true,
            sz: '26',
            cellColWidth: 3000,
        }

    } , {
    	val: "Đơn vị công tác",
        opts: {
            b: true,
            sz: '26',
            cellColWidth: 2000,
        }
    }],

    [1, '14020613', '19/06/1996' , 'K59CLC' , 'Nhận dạng giọng nói của máy' , 'Phan Xuân Hiếu' , 'Đại học Công Nghệ'],]

var tableStyle = {
    tableSize: 24,
    tableFontFamily: "Times New Roman",
    borders: true
}

docx.createTable(table, tableStyle);

module.exports.exportFile = function (nameFile){
    var out = fs.createWriteStream(nameFile + ".doc"); //Ghi file
    docx.generate(out);
    out.on('close', function() {});
}
