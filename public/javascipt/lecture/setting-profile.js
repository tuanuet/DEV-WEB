var ClickHandler = function () {
    return {
        init: function (array) {
            ClickHandler.initClick(array);
            ClickHandler.initCheck();
        },
        initClick: function (array) {
            //Gán sự kiện cho textbox ở danh mục lớn
            for (var i = 0; i < array.length; i++) {
                $("#linhvuclienquan").find("ins").eq(array[i][0]).on("click", function () {
                    for (var i = 2; i < $("#linhvuclienquan").children().length; i++) {
                        var child = $("#linhvuclienquan").children().eq(i);
                        if (child.children().eq(0).children().eq(0).hasClass("checked")) {
                            var listChild = child.children().eq(1).children();
                            for (var j = 0; j < listChild.length; j++) {
                                listChild.eq(j).children().eq(0).addClass("checked");
                            }
                        } else {
                            var listChild = child.children().eq(1).children();
                            for (var j = 0; j < listChild.length; j++) {
                                listChild.eq(j).children().eq(0).removeClass("checked");
                            }
                        }
                    }
                })
            }

            //Gán sự kiện cho các textbox nhỏ
        },

        initCheck: function () {
            var temp = $(".checked");
            for (var i = 0; i < temp.length; i++) {
                temp.eq(i).parent().addClass("checked");
            }
        }
    };

}();

var check = false;

function updateInfor() {
    var array = [];
    for(var i = 0; i < $("#linhvuclienquan").find("ins").length; i++) {
        if($("#linhvuclienquan").find("ins").eq(i).parent().hasClass("checked")) {
            array.push($("#linhvuclienquan").find("ins").eq(i).parent().children().eq(0).val());
        }
    }
    var gv = {
        chude : $("#huongnghiencuu").val(),
        arrayListLV : array
    }
    $.ajax({
        url: "/users/giangvien/updateinfor",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(gv),
        success: function (datajson) {
            console.log(datajson);
            $("#addNoti").text(datajson.msg);
            if (datajson.result == true) {
                check = true;
            } else {
                check = false;
            }
        }

    });
}

function changeType() {
    var gv = {
        id: $('#idGV').val(),
        password: $("#passOld").val()
    };
    $.ajax({
        url: '/users/giangvien/comparepass',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(gv),
        success: function (datajson) {
            $("#addNoti").text(datajson.msg);
            if (datajson.result == true) {
                check = true;
            } else {
                check = false;
            }
        }

    });
}

var checkMatch = false;

function changePass() {
    if ($("#passNew").val() == $("#passNewAgain").val()) {
        $("#addNotiMatch").html("Mật khẩu khớp");
        checkMatch = true;
    } else {
        $("#addNotiMatch").html("Mật khẩu không khớp");
        checkMatch = false;
    }
}

function saveResult() {
    var gv = {
        id: $('#idGV').val(),
        password: $("#passNew").val()
    };
    if (check && checkMatch) {
        $('#savepass').prop('disabled', true);
        $.ajax({
            url: '/users/giangvien/savepass',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(gv),
            success: function (datajson) {
                toastr["success"](datajson.msg);

                toastr.options = {
                    "closeButton": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                reset();
            }
        });
    }
}

function reset() {
    $('#savepass').prop('disabled', false);
    $("#addNotiMatch").text("");
    $("#addNoti").text("");
    $("#passOld").val("");
    $("#passNew").val("");
    $("#passNewAgain").val("");
}