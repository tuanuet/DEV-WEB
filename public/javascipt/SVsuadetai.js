/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#submitsuadetai').click(function () {
        var tenDeTai = $('#tenDeTai').val().trim()
        var GiangVienId = $('#GiangVienId').val().trim()
        var idDeTai = parseInt(document.getElementById('idDeTai').innerHTML)
        var data = {
            idDeTai : idDeTai,
            tenDeTai : tenDeTai,
            GiangVienId : GiangVienId
        }
        if (validateDeTai(idDeTai,tenDeTai,GiangVienId)){
            $.ajax({
                url : '/users/sinhvien/luutamthoi',
                type : 'POST',
                data : JSON.stringify(data),
                contentType: 'application/json',  // tell jQuery not to set contentType
                success : function(data) {
                    if(data){
                        if(data.err){
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
function validateDeTai(idDeTai,tenDeTai,id) {
    if(idDeTai&&tenDeTai != "" && id != "")
        return true
    else return false
}