/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#submitkhoarutdetai').click(function () {
        $.ajax({
            url : '/users/khoa/truongchapnhanxoa',
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