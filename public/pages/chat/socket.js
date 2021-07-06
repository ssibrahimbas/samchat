const alertify = new Alertify()

let oldSocket = JSON.parse(storage.getBySessionStorage('socket'))

const socket = io('/rooms');

const mainNamespace = io('/');

socket._id = oldSocket._id;
socket.lastTime = oldSocket.lastTime;
socket.currentReceiverId = oldSocket.currentReceiverId;

socket.emit('user-is-seen', true);
mainNamespace.emit('connection-main', oldSocket);
let conversationId;

window.addEventListener('visibilitychange', function() {
  if(document.visibilityState === 'visible') {
    socket.receiverIsSeen = true;
  }
});

const getRoomName = async () => {
  let roomName = await getConversation(senderId, receiverId);
  conversationId = roomName.data._id;
  socket.currentRoom = conversationId;
  socket.emit('join-room', conversationId, socket._id);
  socket.emit('user-is-seen', true);
  await getMessagesToUI(conversationId);
};

getRoomName().then().catch(err => console.log(err));

const allEventListeners = () => {
  messageForm.addEventListener("submit", (e) => submitMessage(e));
  messageInput.addEventListener("keypress", () => feedbackTypeTyping());
  messageInput.addEventListener("blur", () => feedbackTypeOnline());
};

const submitMessage = (e) => {
  e.preventDefault();
  sendMessage();
};

const feedbackTypeOnline = () => {
  socket.emit("feedback", {
    feedback: `çevrimiçi`,
    conversationId,
  });
};

const feedbackTypeTyping = () => {
  socket.emit("feedback", {
    feedback: `yazıyor...`,
    conversationId,
  });
};

const scrollToBottom = () => {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
};

const changeFeedbackMessage = (data) => {
  feedbackElement.textContent = data;
}

const seenMessages = () => {
  const messages = document.querySelectorAll('#seen');
  messages.forEach(message => {
    message.removeAttribute('class');
  })
  request.seenAllMessageByConversationIdAndUserId(socket.currentRoom, socket._id).then().catch(err => console.log(err));
}

allEventListeners();
feedbackTypeOnline();

const sendMessage = () => {
  if (messageInput.value === "") return;
  const data = {
    conversation: {
      _id: conversationId,
    },
    sender: {
      _id: senderId,
    },
    receiver: {
      _id: receiverId,
    },
    name: receiverNameElement.textContent,
    message: messageInput.value,
    dateTime: new Date(),
    isSeen: socket.receiverIsSeen
  };
  console.log('ISSEN',socket.receiverIsSeen)
  socket.emit("message", data);
  addMessageToUI(data);
  messageInput.value = "";
  setMessageToDatabase(data).then().catch(err => console.log(err));
};

socket.on("chat-message", (data) => {
  messageTone
    .play()
    .then()
    .catch((err) => console.log(err));
    addMessageToUI(data);
});

socket.on("feedback-message", (data) => {
  changeFeedbackMessage(data.feedback);
});

socket.on('is-seen', (bool) => {
  console.log('HOOP',bool)
  bool && seenMessages()
  socket.receiverIsSeen = bool;
})

socket.on('seen-messages', () => {
  seenMessages();
})

mainNamespace.on('message-alert', (data) => {
  if(data.receiver._id === socket._id) {
    alertify.showAlert('info', data)
  }
})