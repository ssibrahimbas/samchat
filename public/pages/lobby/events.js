// window.addEventListener('visibilitychange', function() {
//   if(document.visibilityState === 'hidden') {
//     // TODO --> Burada bildirim gönderilecek
//     //console.log('')
//   }else if(document.visibilityState === 'visible') {
//      // TODO -->Kullanıcı zaten aktif
//     //console.log('Kullanıcı zaten aktif')
//   }
// });

const allEventListeners = () => {
  persons.addEventListener("click", (e) => handleReceiverAndLocateUrl(e));
  persons.addEventListener("click", (e) => showEditForm(e));
  document.body.addEventListener("click", (e) => hideEditForm(e));
  editForm.addEventListener("submit", (e) => handleSubmit(e));
};

const handleReceiverAndLocateUrl = (e) => {
  if (e.target.className.indexOf("btn-link") >= 0) {
    id =
      e.target.parentElement.parentElement.children[1].children[0].getAttribute(
        "key"
      );
    storage.setSessionStorage("receiverId", id);
    oldSocket.currentReceiverId = id;
    storage.setSessionStorage("socket", JSON.stringify(oldSocket));
    window.location.href = "/pages/chat/chat.html";
  }
};

const showEditForm = (e) => {
  if (e.target.id === "card-edit") {
    editDiv.removeAttribute("style");
  }
};

const hideEditForm = (e) => {
  if (
    e.target.id !== "card-edit" &&
    e.target.id !== "profile_image" &&
    e.target.id !== "edit-form" &&
    e.target.id !== "btn-edit-submit"
  ) {
    editDiv.setAttribute("style", "display:none");
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  const file = fileInput.files[0];
  data.append("profile_image", file);
  request
    .profileImageUpload(data, true)
    .then((res) => console.log(res)) // TODO --> DELETE CONSOLE.LOG(RES)
    .catch((err) => console.log(err)); // TODO --> DELETE CONSOLE.LOG(ERR)
};

allEventListeners();
