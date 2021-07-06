const imageElement = document.querySelector("#profile-image");
const receiverNameElement = document.querySelector("#receiver-name");
const feedbackElement = document.querySelector("#feedback");
const messageContainer = document.querySelector("#message-container");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");

const receiverId = storage.getBySessionStorage("receiverId");
const senderId = storage.getBySessionStorage("senderId");

const messageTone = new Audio("/songs/notification.mp3");

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const getReceiverInfoToUI = (receiver) => {
  receiverNameElement.textContent = receiver.name;
  imageElement.setAttribute("src", `/uploads/images/${receiver.profileImage}`);
};
