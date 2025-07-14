document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const clearButton = document.getElementById('clearChat');


    let messages = JSON.parse(localStorage.getItem('chatHistory')) || [];


    messages.forEach(msg => {
        if (msg.sender === 'user') {
            addUserMessage(msg.text);
        } else {
            addBotMessage(msg.text);
        }
    });

    if (messages.length === 0) {
        addBotMessage("Olá, sou o SJBot, robô de atendimento do Arraia da Conquista. Gostaria de saber alguma informação sobre o evento?");
    }

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);


    clearButton.addEventListener('click', () => {
        localStorage.removeItem('chatHistory');
        chatBox.innerHTML = '';
        messages = [];
        addBotMessage("Olá, sou o SJBot, robô de atendimento do Arraia da Conquista. Gostaria de saber alguma informação sobre o evento?");
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addUserMessage(message);
        userInput.value = '';

        const typingIndicator = addTypingIndicator();

        fetch('http://localhost:6000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
            .then(response => response.json())
            .then(data => {
                chatBox.removeChild(typingIndicator);
                addBotMessage(data.response);
            })
            .catch(error => {
                console.error('Erro:', error);
                chatBox.removeChild(typingIndicator);
                addBotMessage("Desculpe, estou tendo problemas para me conectar. Tente novamente mais tarde.");
            });
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        messages.push({ sender: 'user', text: message });
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        messages.push({ sender: 'bot', text: message });
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.textContent = 'Digitando...';
        typingDiv.style.opacity = '0.7';
        typingDiv.style.fontStyle = 'italic';
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return typingDiv;
    }
});
