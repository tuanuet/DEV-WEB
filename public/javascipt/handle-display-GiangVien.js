function displayLectures(evt) {
  var id = evt.id;
  var listGV = $(".meet-our-team");

  for (var i = 0; i < listGV.length; i++) {
    if(listGV.eq(i).hasClass(id)) {
      listGV.eq(i).parent().css("display","");
    } else {
      listGV.eq(i).parent().css("display","none");
    }
  }
}
