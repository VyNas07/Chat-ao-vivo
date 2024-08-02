const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const message = {
      text: input.value,
      sender: 'me'
    };
    appendMessage(message);
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const message = {
    text: msg,
    sender: 'other'
  };
  appendMessage(message);
});

function appendMessage(message) {
  const item = document.createElement('li');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(message.sender === 'me' ? 'sent' : 'received');
  msgDiv.innerHTML = `
    <img src="user-icon.png" alt="User">
    <p>${message.text}</p>
  `;
  item.appendChild(msgDiv);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}
