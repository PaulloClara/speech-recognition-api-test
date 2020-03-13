const outputEl = document.querySelector("#output");

function captureVoice() {
  const recognition = new webkitSpeechRecognition();

  recognition.interimResults = true;
  recognition.lang = "pt-BR";
  recognition.continuous = true;
  recognition.start();
  recognition.onresult = evt => {
    const result = evt.results[evt.results.length - 1];

    if (result.isFinal) {
      outputEl.innerText = result[0].transcript.trim();
      recognition.stop();
    }
  };
}
