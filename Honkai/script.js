import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/v1/chat";

document.querySelector("#chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.querySelector("#user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("Você", message);
  input.value = "";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  addMessage("IA", data.choices[0].message.content);
});

function addMessage(sender, text) {
  const chat = document.getElementById("chat-window");
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "IA" ? "ia" : "user");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
