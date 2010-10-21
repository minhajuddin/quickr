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
               this.updateTimer();
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
                       remainingSeconds = timer * 60;
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
    updateTimer : function(){
                    //get the remainingSeconds
                    var remainingSeconds = Quickr.getRemainingSeconds();
                    //if it is > 0 update badge, timer and set a callback
                    console.log('remaining seconds is ', remainingSeconds, typeof remainingSeconds, remainingSeconds > 0);
                    if(remainingSeconds > 0){
                      this.notify(this.get('text'));
                      this.setBadge(remainingSeconds);
                      setTimeout(this.updateTimer, 1000);
                    }
                  }
  };
}());
