/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#inputSearch').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if($('#inputSearch').val() != ""){
                var idSinhVien = $('#inputSearch').val()
                var data = {
                    id : parseInt(idSinhVien)
                }
                console.log(idSinhVien)
                $.ajax({
                    url: '/users/khoa/searchsinhvien',
                    type: 'post',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function(data) {
                        if(data.msg){
                            alert(data.msg)
                        }else {
                            $('.tbody-hide').hide();
                            $('#hide-parent').append(data)
                        }
                    }
                });
            }else{
            }
        }
    });
    //return lai trang search ban dau
    $('#inputSearch').keyup(function () {
        if($('#inputSearch').val()==""){
            $('.tbody-hide').show();
            $('.newRow').remove();
        }
    })
    $('.input').change(function (even) {
        var query = $(this).parent().parent().parent().context.className
        var idSinhVien = parseInt($(this).parent().parent().parent().parent().children()[0].innerText)
        var data;
        var checkbox = even.target
        if (checkbox.checked) {
            if(query.indexOf('nopHoSoChua')>=0){
                data = {
                    id:idSinhVien,
                    nopHoSoChua : 1
                }
            } else if(query.indexOf('nopQuyenChua')>=0){
                data = {
                    id:idSinhVien,
                    nopQuyenChua : 1
                }
            }
        } else {
            if(query.indexOf('nopHoSoChua')>=0){
                data = {
                    id:idSinhVien,
                    nopHoSoChua : 0
                }
            } else if(query.indexOf('nopQuyenChua')>=0){
                data = {
                    id:idSinhVien,
                    nopQuyenChua : 0
                }
            }
        }
        console.log(data)
        $.ajax({
            url: '/users/khoa/updatedetai',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                if(data.msg){
                    alert(data.msg)
                }else {
                }
            }
        });
    })


});
