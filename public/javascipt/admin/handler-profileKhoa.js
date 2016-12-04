  function submitButtonHandler(evt) {
      var idButtonNew = {
        id : evt.id
      }
      //Tao hieu ung xoay tron


      //make the AJAX call
      $.ajax({
        url: '/handlerRederAdmin',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(idButtonNew),
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (htmlData) {
    var $data = $('#showContentHere');
    $data.html('');

    //update the UI with the data returned from the AJAX call
    $.each(htmlData, function (key, val) {
      $data.append(htmlData.htmlStr);
    });
  };