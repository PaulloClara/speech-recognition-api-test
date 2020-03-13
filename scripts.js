function captureVoice() {
  const recognition = new webkitSpeechRecognition();

  recognition.interimResults = true;
  recognition.lang = "pt-BR";
  recognition.continuous = true;
  recognition.start();
  recognition.onresult = evt => {
    for (let i = evt.resultIndex; i < evt.results.length; i++) {
      if (evt.results[i].isFinal) {
        document.querySelector("#output").innerText = evt.results[
          i
        ][0].transcript.trim();
        recognition.stop();
      }
    }
  };
}
