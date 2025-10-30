// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-India, hi-India";
const btn = document.querySelector("#listen-btn");

// Attach click event listener to the button
btn.addEventListener("click", function () {
  // Function to convert text to speech
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  // Some handle to recognized commands
  function handleCommand(command) {
    if (command.includes("open youtube")) {
      speak("Opening YouTube...");
      window.open("https://www.youtube.com/", "_blank");
    } else if (command.includes("open facebook")) {
      speak("Opening Facebook...");
      window.open("https://www.facebook.com/", "_blank");
    } else if (command.includes("open instagram")) {
      speak("Opening Instagram...");
      window.open("https://www.instagram.com/", "_blank");
    } else if (command.includes("open blackbox")) {
      speak("Opening BlackBox...");
      window.open("https://www.blackbox.ai/", "_blank");
    } else if (command.includes("open whatsapp")) {
      speak("Opening WhatsApp...");
      window.open("https://web.whatsapp.com/", "_blank");
    } else {
      // If the command is not recognized, perform a Google search
      speak("Here is the result for " + command);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
    }

    // Reload the page after a short delay
    setTimeout(() => {
      location.reload();
    }, 3000); // Adjust the delay as needed (3000 ms = 3 seconds)
  }

  // Greet the user and then start listening
  speak("Hello Sir, how can I help you?");

  // Delay to ensure greeting completes before starting recognition
  setTimeout(() => {
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    btn.style.backgroundColor = "red";
    recognition.start();
  }, 3500);

  // When a result is received
  recognition.onresult = (event) => {
    console.log(event);
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  // When recognition ends
  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
    btn.style.backgroundColor = "red";
  };
});