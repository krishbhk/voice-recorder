const socket = io("/");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

navigator.mediaDevices.getUserMedia({ audio: true }).then(function(mediaStream) {
var mediaRecorder = new MediaRecorder(mediaStream);
mediaRecorder.onstart = function(e) {
    console.log("Chunks initialized");
    this.chunks = [];
};
mediaRecorder.ondataavailable = function(e) {
    this.chunks.push(e.data);
};
mediaRecorder.onstop = function(e) {
    var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
    socket.emit('radio', blob);
};

startBtn.addEventListener("click", myFunction1);

function myFunction1() {
    // Start recording
    mediaRecorder.start();
    document.getElementById("text").innerText = "Recording Started";
}

stopBtn.addEventListener("click", myFunction2);

function myFunction2() {
    // Stop recording
    mediaRecorder.stop();
    document.getElementById("text").innerText = "Recording Stopped";
}

// Stop recording after 5 seconds and broadcast it to server
setInterval(function() {
    mediaRecorder.stop();
    mediaRecorder.start();
  }, 5000);
});