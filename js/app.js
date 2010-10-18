function show(message) {
  var time = /(..)(:..)/(Date());              // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var notification = webkitNotifications.createNotification(
      'images/48.jpg',                      // The image.
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
var popupInit = function(){
    setTimeout(renderTimer, 1000);
    $("#set-reminder").click(function(){
      var timer = +$("#minutes").focus().val();
      $("#minutes").val('');
      timer = timer * 60;
      setTimer(timer);
      activate();
      });
};


var setTimer = function(timer){
  if(timer < 0) return;
  localStorage.timer = timer;
};
var getTimer = function(){
  return +localStorage.timer
};

var updateTimer = function(){
  var timer = getTimer();
  if(timer === 0 && isActive()){
    show('timeout');
    deactivate();
  }
  if(timer > 0){
    setTimer(timer - 1);
  }
  setTimeout(updateTimer, 1000);
}

var backgroundInit = function(){
    setTimer(0);
    updateTimer();
    deactivate();
};

    //setTimeout(function(){
    //show('Timeout');
    //}, timer * 1000);


/*
   var db = {
get:function(key){
var data = localStorage['key'];
return JSON.parse(data);
},
set:function(key, value){
var data = JSON.stringify(value);
localStorage['key'] = data;
}
};

function timeEqual(first, second){
if(first.hours != second.hours)
return false;
if(first.minutes != second.minutes)
return false;
return true;
};

function check(){
var slots = db.get('slots');
var i = 0;
var currentTime = new Date();
for(; i < slots.length; i++){
var slot = slots[i];
if(timeEqual(slot.endTime, toTime(currentTime))){
show('End of slot');
}
}
};

function Time(hours, minutes){
this.hours = hours;
this.minutes = minutes;
}

function toTime(date){
return new Time(date.getHours(), date.getMinutes());
}

function setupSlots(){
var slots = [
{endTime:new Time(15, 56)},
{endTime:new Time(15, 58)},
{endTime:new Time(15, 59)}
];
db.set('slots', slots);
};
*/
