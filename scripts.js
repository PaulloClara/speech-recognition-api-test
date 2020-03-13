const outputEl = document.querySelector("#output");
const buttonEl = document.querySelector("#capture");

const recognition = new webkitSpeechRecognition();

recognition.lang = "pt-BR";
recognition.continuous = true;
recognition.interimResults = true;

function captureVoice() {
  recognition.onresult = evt => {
    const result = evt.results[evt.results.length - 1];

    if (result.isFinal) {
      outputEl.innerText = result[0].transcript.trim();
      recognition.stop();
    }
  };

  recognition.onstart = evt => {
    buttonEl.innerText = "Stop Voice Capture";
    buttonEl.setAttribute("onclick", "recognition.stop()");
  };

  recognition.onend = evt => {
    buttonEl.innerText = "Start Voice Capture";
    buttonEl.setAttribute("onclick", "captureVoice()");
  };

  recognition.start();
}
