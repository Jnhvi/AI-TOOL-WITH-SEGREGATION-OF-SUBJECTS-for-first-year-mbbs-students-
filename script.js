let subject = "Physiology"; // default subject

function setSubject(newSubject) {
  subject = newSubject;
  addMessage("system", `🔄 Switched to ${subject}. Ask me anything.`);
}

function addMessage(sender, text) {
  const chatOutput = document.getElementById("chat-output");
  const message = document.createElement("div");
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatOutput.appendChild(message);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage("You", userText);
  userInput.value = "";

  // OpenAI call
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-...mTEA"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a helpful medical tutor specialized in ${subject}.` },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  const aiText = data.choices?.[0]?.message?.content || "Sorry, I didn't get that.";
  addMessage("AI", aiText);
}
