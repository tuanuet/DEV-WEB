$(document).ready(function () {
    var lvlq = $("#linhvuclienquan");
    for(var i = 1 ;i < lvlq.children().length; i++) {
        var child = lvlq.children().eq(i);
        child.children().eq(0).children().eq(0).children().eq(0).on( "click", function () {
            if (child.children().eq(0).children().eq(0).hasClass("checked")) {
                var listChild = child.children().eq(1).children();
                for(var j = 0; j < listChild.length; j++) {
                    listChild.eq(j).children().eq(0).addClass("checked");
                }
            }
        })
    }
})