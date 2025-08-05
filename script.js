const subjects = {
  anatomy: [],
  physiology: [],
  biochemistry: []
};
let currentSubject = "anatomy";

const navButtons = document.querySelectorAll('nav button');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('nav button.active').classList.remove('active');
    btn.classList.add('active');
    currentSubject = btn.getAttribute('data-subject');
    renderChat();
  });
});

const form = document.getElementById('chat-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('user-input');
  const userMsg = input.value.trim();
  if (!userMsg) return;
  subjects[currentSubject].push({ sender: 'user', text: userMsg });
  renderChat();
  input.value = '';
  setTimeout(() => {
    const botMsg = "Mock answer: " + userMsg + " in " + currentSubject;
    subjects[currentSubject].push({ sender: 'bot', text: botMsg });
    renderChat();
  }, 500);
});

function renderChat() {
  const container = document.getElementById('chat-container');
  container.innerHTML = '';
  subjects[currentSubject].forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message', msg.sender === 'user' ? 'msg-user' : 'msg-bot');
    div.textContent = msg.sender === 'user' ? "You: " + msg.text : msg.text;
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
}

renderChat();
