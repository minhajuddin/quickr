function setDefaultDuration(duration){
  localStorage.defaultDuration = duration;
}

function getDefaultDuration(){
  return localStorage.defaultDuration;
}

function setDefaultText(text){
  localStorage.defaultText = text;
}

function getDefaultText(){
  return localStorage.defaultText;
}

function updateBadge(text){
  chrome.browserAction.setBadgeText({text: text.toString()});
}
function show(message) {
  var time = /(..)(:..)/(Date());              // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var notification = webkitNotifications.createNotification(
      'images/128.gif',                      // The image.
      hour + time[2] + ' ' + period, // The title.
      message      // The body.
      );
  notification.show();
};
var renderTimer = function(){
  var timer = getTimer();
  var minutes = Math.floor(timer/60);
  var seconds = timer % 60;
  $("#countdown").html(minutes + ":" + seconds);
  setTimeout(renderTimer,1000);
};

function deactivate(){
  localStorage.isActive = 0;
}

function isActive(){
  return localStorage.isActive == 1;
}
function activate(){
  localStorage.isActive = 1;
}

var createReminder = function(){
  var timer = +$("#minutes").focus().val();
  var text = $("#text").val();
  $("#minutes").val('');
  $("#text").val('');
  timer = timer * 60;
  setTimer(timer, text);
  activate();
};

var popupInit = function(){
  $("#set-reminder").click(createReminder);
  $("#text").val(getDefaultText())
  $("#minutes").val(getDefaultDuration())
  renderTimer();
  $("#minutes").focus();
  $("#text,#minutes").keydown(function(event,ui){
      if(event.which == "13")
      createReminder();
      });
};
var setTimer = function(timer, text){
  if(timer < 0) return;
  if(typeof text !== 'undefined'){
    localStorage.text = text;
  }
  localStorage.timer = timer;
};
var getText = function(){
  return localStorage.text;
};

var getTimer = function(){
  return +localStorage.timer
};

var updateTimer = function(){
  var timer = getTimer();
  var minutes = Math.floor(timer/60);
  minutes = minutes + 'm';
  updateBadge(minutes);
  if(timer === 0 && isActive()){
    show(getText());
    deactivate();
  }
  if(timer > 0){
    setTimer(timer - 1);
  }
  setTimeout(updateTimer, 1000);
}

var backgroundInit = function(){
  if(typeof getDefaultDuration() === 'undefined'){
    setDefaultDuration(30);
  }
  if(typeof getDefaultText() === 'undefined'){
    setDefaultText('Ad hoc');
  }
  setTimer(0);
  updateTimer();
  deactivate();
};
