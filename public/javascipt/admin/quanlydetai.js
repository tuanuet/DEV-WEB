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
});
