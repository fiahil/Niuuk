$(document).ready(function() {
    navigator.media = (navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia);

    var context = new (window.AudioContext || window.webkitAudioContext)();

    if (navigator.media && context) {
        var errorCallback = function(err) {
            console.log("NO. " + err);
        };

        navigator.media({audio: true}, function(stream) {
            var microphone = context.createMediaStreamSource(stream);
            var delay = context.createDelay();
            var gain = context.createGain();
            delay.delayTime.value = 0.2;
            gain.gain.value = 1.8;

            microphone.connect(delay);
            delay.connect(gain);
            gain.connect(context.destination);
        }, errorCallback);
    } else {
        errorCallback();
    }
});