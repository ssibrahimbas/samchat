const addMessageToUI = (data) => {
  const date = new Date(data.dateTime);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const element = `
          <div class="message-${
            data.sender._id === senderId ? "right" : "left"
          }">
              <p class="message">${data.message}</p>
              <small>${hours}:${minutes} ${
    data.sender._id === senderId && data.isSeen
      ? "<span>&#10004;</span><span id='seen'>&#10004;</span>"
      : data.sender._id === senderId
      ? "<span>&#10004;</span><span class='waiting' id='seen'>&#10004;</span>"
      : ""
  }</small>
          </div>
      `;
  messageContainer.innerHTML += element;
  scrollToBottom();
  feedbackTypeOnline();
  setMessageToLocalStorage(conversationId, data);
};

const getMessagesToUI = async (conversationId) => {
  const messages = await getMessagesFromDatabase(conversationId);
  messages.forEach((message) => {
    const date = new Date(message.dateTime);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const element = `
      <div class="message-${
        message.sender._id === senderId ? "right" : "left"
      }">
          <p class="message">${message.message}</p>
          <small>${hours}:${minutes} ${
      message.sender._id === senderId && message.isSeen
        ? "<span>&#10004;</span><span id='seen'>&#10004;</span>"
        : message.sender._id === senderId
        ? "<span>&#10004;</span><span class='waiting' id='seen'>&#10004;</span>"
        : ""
    }</small>
      </div>
      `;
    messageContainer.innerHTML += element;
  });
  scrollToBottom();
  feedbackTypeOnline();
};
