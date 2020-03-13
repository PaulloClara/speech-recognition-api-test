const outputEl = document.querySelector("#output");
const buttonEl = document.querySelector("#capture");

const API = { recognition: {} };

try {
  API.recognition = new SpeechRecognition();
} catch {
  try {
    API.recognition = new webkitSpeechRecognition();
  } catch {
    alert("Seu navegador não tem suporte a API SpeechRecognition");
    buttonEl.setAttribute("disabled", true);
  }
}

const { recognition } = API;

recognition.lang = "pt-BR";
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = evt => {
  const result = evt.results[evt.results.length - 1];

  if (result.isFinal) {
    outputEl.innerText = result[0].transcript.trim();
    recognition.stop();
  }
};

recognition.onstart = evt => {
  buttonEl.innerText = "Parar captura de voz";
  buttonEl.setAttribute("onclick", "recognition.stop()");
};

recognition.onend = evt => {
  buttonEl.innerText = "Iniciar captura de voz";
  buttonEl.setAttribute("onclick", "recognition.start()");
};
