/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#submitrutdetai').click(function () {
        $.ajax({
            url : '/users/sinhvien/xinrutdetai',
            type : 'GET',
            success : function(data) {
                if(data){
                    alert(data.msg)
                }else {
                    alert('Đường truyên mạng kém! vui lòng xem lại')
                }
            }
        });
    })

});
function validateDeTai(idDeTai,tenDeTai,id) {
    if(idDeTai&&tenDeTai != "" && id != "")
        return true
    else return false
}