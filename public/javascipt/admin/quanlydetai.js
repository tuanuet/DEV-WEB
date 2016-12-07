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
    //send trang thai nguoi dung

    var input = document.getElementsByClassName('input');
    for(var i=0;i<input.length;i++){
        input[i].onchange = function (event) {
            var checkbox = event.target;
            var data;
            var idSinhVien = parseInt(event.path[4].childNodes[1].outerText)
            if (checkbox.checked) {
                if(event.target.className.indexOf('duocBaoVeKhong')>=0){
                    data = {
                        id : idSinhVien,
                        duocBaoVeKhong : 1
                    }
                } else if(event.target.className.indexOf('nopHoSoChua')>=0){
                    data = {
                        id:idSinhVien,
                        nopHoSoChua : 1
                    }
                } else if(event.target.className.indexOf('nopQuyenChua')>=0){
                    data = {
                        id:idSinhVien,
                        nopQuyenChua : 1
                    }
                }
            } else {
                if(event.target.className.indexOf('duocBaoVeKhong')>=0){
                    data = {
                        id : idSinhVien,
                        duocBaoVeKhong : 0
                    }
                } else if(event.target.className.indexOf('nopHoSoChua')>=0){
                    data = {
                        id:idSinhVien,
                        nopHoSoChua : 0
                    }
                } else if(event.target.className.indexOf('nopQuyenChua')>=0){
                    data = {
                        id:idSinhVien,
                        nopQuyenChua : 0
                    }
                }
            }
            console.log(data)
        }
    }
});
