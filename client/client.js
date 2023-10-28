const socket = io(); // Establish Socket.IO connection

const messagesList = document.getElementById('messages');

// Function to add a new message to the messages list
function addMessage(message) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messagesList.appendChild(listItem);
}

// Event listener for receiving previous messages from the server
socket.on('previousMessages', (messages) => {
    messages.forEach((message) => {
        addMessage(message);
    });
});

// Event listener for receiving new messages from the server
socket.on('message', (message) => {
    addMessage(message);
});
