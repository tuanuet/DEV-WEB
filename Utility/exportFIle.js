var fs = require('fs');
var officegen = require('officegen');
var docx = officegen('docx');
// Đoạn trên là đoạn import

//Cách căn lề khác
var pObj = docx.createP();

//Tạo bảng tiêu đề
var tieuDe1 = [
    [{ ///Tùy chọn của các cột 
        val: "ĐẠI HỌC QUỐC GIA HÀ NỘI",
        opts: {
            sz: '22',
            cellColWidth: 15000,
        }
    } , {
        val: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        opts: {
            sz: '20',
            cellColWidth: 15000,
        }
    }],

     ['TRƯỜNG ĐẠI HỌC CÔNG NGHỆ' , 'Độc lập - Tự do - Hạnh phúc'],
     ['--------------------','--------------------'],
     ['Số: 732 / QĐ-ĐT' ,''],]

var tieuDe1Style = {
    tableSize: 50,
    sz: 20,
    tableFontFamily: "Times New Roman",
}

docx.createTable(tieuDe1, tieuDe1Style);

var pObj = docx.createP();
pObj.options.align = 'right';
pObj.addText('Hà Nội, ngày 19 tháng 6 năm 2016', {italic: true});

var pObj = docx.createP();
pObj.options.align = 'center';
pObj.addText('QUYẾT ĐỊNH' , {font_size: 14, bold: true });
pObj.addLineBreak();
pObj.addText('Về việc duyệt điều kiện và danh sách sinh viên thuộc Khoa Công nghệ Thông tin làm khóa luận tốt nghiệp' , {font_size: 12 });
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('(bảo vệ đợt 1 năm 2016)');
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('---------------------------------------')

var pObj = docx.createP();
pObj.options.align = 'center';
pObj.addText('HIỆU TRƯỞNG', {font_size: 14, bold: true });
pObj.addLineBreak();
pObj.addText('TRƯỜNG ĐẠI HỌC CÔNG NGHỆ' , {font_size: 14, bold: true });

var pObj = docx.createP();
pObj.addText('   Căn cứ Quy định về Tổ chức hoạt động của cá đơn vị thành viên và đơn vị trực thuộc Đại học Quốc gia Hà Nội ban hành theo nghị quyết số 3568/QĐ-ĐHQGHN ngày 08/10/2014 của Giám đốc Đại học Quốc gia Hà Nội;')
pObj.addLineBreak();
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('   Căn cứ "Quy chế đào tạo đại học ở Đại học Quốc gia Hà Nội" ban hành theo Quyết định số 3079/QĐ-ĐHQGHN ngày 26/10/2010 và được sửa đổi, bổ sung theo Quyết định số 685/QĐ-ĐHQGHN ngày 08/03/2013 của Giám đốc Đại học Quốc gia Hà Nội;')

docx.putPageBreak(); //Ngắt trang

var tieuDe2 = [
    [{ ///Tùy chọn của các cột 
        val: "ĐẠI HỌC QUỐC GIA HÀ NỘI",
        opts: {
            sz: '22',
            cellColWidth: 15000,
        }
    } , {
        val: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        opts: {
            sz: '20',
            cellColWidth: 15000,
        }
    }],

     ['TRƯỜNG ĐẠI HỌC CÔNG NGHỆ' , 'Độc lập - Tự do - Hạnh phúc'],
     ['--------------------','--------------------'],]

var tieuDe2Style = {
    tableSize: 50,
    sz: 20,
    tableFontFamily: "Times New Roman",
}
docx.createTable(tieuDe2, tieuDe2Style);

//Tên bảng
var pObj = docx.createP({ align: 'center' }); 
pObj.addText('DANH SÁCH SINH VIÊN, TÊN CÁN BỘ HƯỚNG DẪN KHÓA LUẬN TỐT NGHIỆP VÀ ĐỀ TÀI THỰC HIỆN CỦA SINH VIÊN KHOA CÔNG NGHỆ THÔNG TIN BẢO VỆ ĐỢT 1 NĂM 2016' ,{bold: true, font_size: 13});
pObj.addLineBreak(); //Ngắt dòng
pObj.addText('(kèm theo Quyết định số 237/QĐ-ĐT ngày 19/6/1996)');

//Tạo bảng danh sách
var table = [
    [{ ///Tùy chọn của các cột  ( ở đây có 3 cột)
        val: "TT",
        opts: {
            b: true,
            sz: '26',
            align: "center",
            vAlign: "center",
        }
    } , {
        val: "Mã SV",
        opts: {
            b: true,
            sz: '26',
            align: "center",
            vAlign: "center",
        }
    } , {
        val: "Ngày sinh",
        opts: {
            b: true,
            sz: '26',
            align: "center",
            vAlign: "center",
        }
    } , {
        val: "Lớp",
        opts: {
            b: true,
            sz: '26',
            align: "center",
            vAlign: "center",
        }
    } , {
        val: "Tên đề tài",
        opts: {
            b: true,
            sz: '26',
            cellColWidth: 3000,
            align: "center",
            vAlign: "center",
        }
    } , {
        val: "Cán bộ hướng dẫn/ Cán bộ đồng hướng dẫn",
        opts: {
            b: true,
            sz: '26',
            cellColWidth: 3000,
            align: "center",
            vAlign: "center",
        }

    } , {
        val: "Đơn vị công tác",
        opts: {
            b: true,
            sz: '26',
            cellColWidth: 2000,
            align: "center",
            vAlign: "center",
        }
    }],

    [1, '14020613', '19/06/1996' , 'K59CLC' , 'Nhận dạng giọng nói của máy' , 'Phan Xuân Hiếu' , 'Đại học Công Nghệ'],]

var tableStyle = {
    tableSize: 24,
    tableFontFamily: "Times New Roman",
    borders: true
}

docx.createTable(table, tableStyle);

var FILENAME = "CongVan.doc"; //Tên file
var out = fs.createWriteStream(FILENAME); //Ghi file
docx.generate(out);
out.on('close', function() {});