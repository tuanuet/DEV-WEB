/**
 * còn lỗi chưa hoàn thành xong
 */
$(document).ready({
  /**
   * Xử lý thêm class "Active" khi sang trang khác
   */
  var menuBars = [{tag : $('#index'), path : "/"},
  {tag : $('#introKhoa'), path : "/introKhoa"},
  {tag : $('#researchs'), path :  "/researchs"},
  {tag : $('#news'), path :  "/news"},
  {tag : $('#regKhoaLuan'), path :  "/regKhoaLuan"}]

  for (var menuBar in menuBars) {
    var pathCurrent = $(location).attr('pathname');
    for (var i = 1; i < menuBars.length; i++) {
      if( pathCurrent.indexOf(menuBars[i].path) != -1) {
        for (var temp in menuBars) {
          if(temp.tag.hasClass("active"))
            temp.tag.removeClass("active");
        }
        menuBars[i].tag.addClass("active");
      }
    }
  }
})
