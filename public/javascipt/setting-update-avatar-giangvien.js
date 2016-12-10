/**
 * Created by Admin on 6/12/2016.
 */
jQuery(document).ready(function() {
    $('#submitavatargv').click(function () {
        var formData = new FormData();
        formData.append('file', $('#file')[0].files[0]);
        $.ajax({
            url : '/users/giangvien/updateavatar',
            type : 'POST',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {
                alert(data.msg);
            }
        });
    })

});
