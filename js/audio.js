$(document).ready(function() {
  var display = function(selector, animation, next) {
    $('.label').hide();
    $('.fa').hide();
    $('#' + selector).addClass('animated ' + animation[0]);
    $('#' + selector + '-label').addClass('animated ' + animation[1]);
    $('#' + selector).show();
    $('#' + selector + '-label').show();

    if (next) {
      $('#' + selector).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        setTimeout(next, 1000);
      });
    }
  }

  display('headphones', ["fadeInDown", "fadeInUp"]);

  setTimeout(function() {
    var errorCallback = function(err) {
      display("error", ["fadeInDown", "fadeInUp"]);
    };

    navigator.media = (navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia);

    var context = new (window.AudioContext || window.webkitAudioContext)();

    if (navigator.media && context) {
      navigator.media({audio: true}, function(stream) {
        var microphone = context.createMediaStreamSource(stream);
        var delay = context.createDelay();
        var gain = context.createGain();
        delay.delayTime.value = 0.2;
        gain.gain.value = 1.8;

        microphone.connect(delay);
        delay.connect(gain);
        gain.connect(context.destination);

        display('speak', ["fadeInDown", "fadeInUp"], function() {
          display('speak', ["fadeOutUp", "fadeOutDown"], function(){
            $('#text').text('mon petit poney');
            $('#text').show();
            $('#text').addClass('animated fadeInDown');
          });
        });
      }, errorCallback);
    } else {
      errorCallback();
    }
  }, 2000);
});