/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#submitdetai').click(function () {
        var tenDeTai = $('#tenDeTai').val().trim()
        var GiangVienId = $('#GiangVienId').val().trim()
        var data = {
            tenDeTai : tenDeTai,
            GiangVienId : GiangVienId
        }
        if (validateDeTai(tenDeTai,GiangVienId)){
            $.ajax({
                url : '/users/sinhvien/insertdetai',
                type : 'POST',
                data : JSON.stringify(data),
                contentType: 'application/json',  // tell jQuery not to set contentType
                success : function(data) {
                    if(data){
                        if(data.status){
                            $('<div class="alert-danger">'+data.msg+'</div><br>').insertBefore('#form')
                        }
                        else{
                            alert(data.msg)
                        }
                    }else {
                        alert('Đường truyên mạng kém! vui lòng xem lại')
                    }
                }
            });
        }else {
            $('<div class="alert-danger">Sai form, kiểm tra lại</div><br>').insertBefore('#form')
        }
    })

});
function validateDeTai(tenDeTai,id) {
    if(tenDeTai != "" && id != "")
        return true
    else return false
}