//jslint predefined vars => localStorage,chrome
//localStorage,chrome, webkitNotifications, setTimeout
var Quickr = (function(){
  return {
    Convert:{
              toInt:function(input){
                      if(typeof input === 'string'){
                        return +input;
                      }
                      if(typeof input === 'number'){
                        return input;
                      }
                      return null;
                    }
            },
    activate:function(){
               this.set('trigger',true);
             },
    get:function(key){
          return localStorage[key];
        },
    set:function(key, val){
          localStorage[key] = val;
        },
    setIfNull:function(key, val){
                if(typeof this.get(key) === 'undefined'){
                  this.set(key,val);
                }
              },
    init:function(options){
         },
    setBadge: function(text){
                chrome.browserAction.setBadgeText({text: text.toString()});
              },
    createReminder : function(timer, text){
                       var remainingSeconds = timer * 60;
                       this.set('remainingSeconds', remainingSeconds);
                       this.set('text', text);
                       this.activate();
                     },
    notify:function(message){
             var time = /(..)(:..)/(Date());              // The prettyprinted time.
             var hour = time[1] % 12 || 12;               // The prettyprinted hour.
             var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
             var notification = webkitNotifications.createNotification(
                 'images/128.gif',                      // The image.
                 hour + time[2] + ' ' + period, // The title.
                 message      // The body.
                 );
             notification.show();
           },
    backgroundInit:function(){
                     this.setIfNull('defaultDuration', 30);
                     this.setIfNull('defaultText','Ad hoc');
                     this.set('remainingSeconds', 0);
                     this.set('trigger','');
                     this.checkTimer();
                   },
    checkTimer: function(){
                  var trigger = !!this.get('trigger');
                  if(trigger){
                    this.updateTimer();
                    this.set('trigger','');
                  }
                  var that = this;
                  setTimeout(function(){
                      that.checkTimer();
                      }, 1000);
                },
    timerString:function(){
                  var remainingSeconds = this.getRemainingSeconds();
                  var minutes = Math.floor(remainingSeconds/60);
                  var seconds = remainingSeconds % 60;
                  return minutes + ":" + seconds;
                },
    getRemainingSeconds:function(){
                          return +this.get('remainingSeconds');
                        },
    getRemainingMinutes:function(){
                          return Math.floor(this.getRemainingSeconds()/60);
                        },
    updateTimer : function(){
                    //get the remainingSeconds
                    var remainingSeconds = this.getRemainingSeconds();
                    remainingSeconds = remainingSeconds - 1;
                    this.set('remainingSeconds',remainingSeconds);
                    this.setBadge(this.getRemainingMinutes().toString() + 'm');
                    //if it is > 0 update badge, timer and set a callback
                    if(remainingSeconds > 0){
                      var that = this;
                      setTimeout(function(){
                          that.updateTimer();
                          }, 1000);
                    }else{
                      this.notify(this.get('text'));
                    }
                  }
  };
}());
