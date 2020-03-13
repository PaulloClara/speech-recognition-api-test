const outputEl = document.querySelector("#output");
const buttonEl = document.querySelector("#capture");

const API = { recognition: {} };

try {
  API.recognition = new SpeechRecognition();
} catch {
  try {
    API.recognition = new webkitSpeechRecognition();
  } catch {
    alert("Your browser does not support the SpeechRecognition API");
    buttonEl.setAttribute("disabled", true);
  }
}

const { recognition } = API;

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
