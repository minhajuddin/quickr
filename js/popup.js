var popupInit = function(){
  $("#minutes").focus();

  $("#text").val(Quickr.get('defaultText'));
  $("#minutes").val(Quickr.get('defaultDuration')).focus();

  var createReminder = function(){
    var timer = +$("#minutes").focus().val();
    var text = $("#text").val();
    $("#minutes").val('');
    $("#text").val('');
    Quickr.createReminder(timer, text);
  };

  $("#text,#minutes").keydown(function(event,ui){
    if(event.which == "13"){
      createReminder();
    }
  });
}


