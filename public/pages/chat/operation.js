const request = new Request();
const storage = new Storage();

const getReceiver = async (receiverId) => {
  let receiver;
  await request
    .get(`http://localhost:5400/api/user/${receiverId}`)
    .then((res) => (receiver = res))
    .catch((err) => console.error(err));
  getReceiverInfoToUI(receiver.data);
};

const onLoadChatApp = async () => {
  const receiverId = storage.getBySessionStorage("receiverId");
  const senderId = storage.getBySessionStorage("senderId");
  const conversation = await getConversation(senderId, receiverId);
  await getReceiver(receiverId);
  storage.setSessionStorage("roomName", conversation.data._id);
  let messages = await getMessagesFromDatabase(conversation.data._id);
  storage.setItemToLocalStorage(conversation.data._id, messages);
};

const getConversation = async (userId, receiverId) => {
  let conversation;
  await request
    .get(`http://localhost:5400/api/conversation/${userId}/with/${receiverId}`)
    .then((res) => (conversation = res))
    .catch((err) => console.error(err));
  if (!(conversation.data === null)) {
    await getMessagesFromDatabase(conversation.data._id);
    return conversation;
  } else {
    await request
      .post(
        `http://localhost:5400/api/conversation/${userId}/to/${receiverId}`,
        {}
      )
      .then((res) => (conversation = res))
      .catch((err) => console.error(err));
    return conversation;
  }
};

const setMessageToDatabase = async (message) => {
  await request
    .post(`http://localhost:5400/api/messages/add`, message)
    .then()
    .catch((err) => console.error(err));
};

const getMessagesFromDatabase = async (conversationId) => {
  let messages;
  await request
    .get(`http://localhost:5400/api/messages/${conversationId}`)
    .then((res) => (messages = res.data))
    .catch((err) => console.error(err));
  return messages;
};

const setMessageToLocalStorage = (conversationId, message) => {
  storage.setArrayValueToLocalStorage(conversationId, message);
};

const getMessagesFromLocalStorage = (conversationId) => {
  return storage.getArrayFromLocalStorageByKey(conversationId);
};

onLoadChatApp();
