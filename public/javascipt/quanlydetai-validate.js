/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#deleteDeTai').click(function () {
        $.ajax({
            url : '/users/khoa//deletedetaikhonghople',
            type : 'get',
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