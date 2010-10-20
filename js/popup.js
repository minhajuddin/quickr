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

  $("#set-reminder").click(createReminder);


  //var renderTimer = function(){
    //$("#countdown").html(Quickr.timerString());
    //setTimeout(renderTimer,1000);
  //};
  //renderTimer();
  $("#text,#minutes").keydown(function(event,ui){
    if(event.which == "13"){
      createReminder();
    }
  });
}


