
function submitButtonHandler(evt) {
    //Tao hieu ung xoay tron
    //Sinh đoạn html
    var data = "";
    switch (evt.id) {
        case "khoiTaoSV":
            $('#showContentHere').load("../../html/khoa/string-khoiTaoSV.html");
            break;
        case "khoiTaoGV":
            $('#showContentHere').load("../../html/khoa/string-khoiTaoGV.html");
            break;
        case "DKKL" :
           $('#showContentHere').load("../../html/khoa/string-uploadSVDuDK.html");
            break;
        case "moDK" :
           $('#showContentHere').load("../../html/khoa/string-moDK.html");
            break;
        case "QLLV" :
            $('#showContentHere').load("../../html/khoa/string-quanLyLinhVuc.html");

        default:
    }
}