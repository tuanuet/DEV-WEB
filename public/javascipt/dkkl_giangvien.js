/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('.btn-submit').click(function () {
        $('.btn-submit').removeClass("justClick")
        var idSinhVien = parseInt($(this).parent().parent().children()[0].innerText)
        var data = {
            id : idSinhVien,
            control : "submit"
        }
        $(this).addClass("justClick")
        $.ajax({
            url : '/users/giangvien/controldetai',
            type : 'POST',
            data : JSON.stringify(data),
            contentType: 'application/json',  // tell jQuery not to set contentType
            success : function(data) {
                if(data){
                    if(data.isSubmit==true){
                        $('.justClick').next().hide()
                        $('.justClick').hide();
                        $('.justClick').parent().append('<button class="btn btn-primary" type="button">Đã chấp nhận</button>')
                        $('.justClick').removeClass('justClick')
                    }
                    else{
                        alert('Có lỗi trên hệ thống, vui lòng kiểm tra lại')
                    }
                }else {
                    alert('Đường truyên mạng kém! vui lòng xem lại')
                }
            }
        });
    })
    $('.btn-delete').click(function () {
        $('.btn-delete').removeClass("justClick")
        var idSinhVien = parseInt($(this).parent().parent().children()[0].innerText)
        var data = {
            id : idSinhVien,
            control : "delete"
        }
        $(this).addClass("justClick")
        $.ajax({
            url : '/users/giangvien/controldetai',
            type : 'POST',
            data : JSON.stringify(data),
            contentType: 'application/json',  // tell jQuery not to set contentType
            success : function(data) {
                if(data){
                    if(data.isDelete==true){
                        $('.justClick').parent().parent().hide()
                        $('.justClick').removeClass('justClick')
                    }
                    else{
                        alert('Có lỗi trên hệ thống, vui lòng kiểm tra lại')
                    }
                }else {
                    alert('Đường truyên mạng kém! vui lòng xem lại')
                }
            }
        });
    })
});
