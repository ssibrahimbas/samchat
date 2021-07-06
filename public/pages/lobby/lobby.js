const alertify = new Alertify()

const socket = io("/");

const request = new Request();
const storage = new Storage();

socket._id = storage.getBySessionStorage("senderId");
socket.lastTime = Date.now();
let oldSocket = {
  _id: socket._id,
  lastTime: socket.lastTime,
};
socket.emit("connection-main", oldSocket);

/*
socket.on('online', (key) => {
  const NodeElements = document.querySelectorAll('.username');
  elements = Array.prototype.slice.call(NodeElements)
  elements.forEach(element => {
    let onlineElement = element.parentElement.parentElement.children[0].children[1];
    if (element.getAttribute('key') === key && onlineElement.getAttribute('style') === 'display: none;') {
      onlineElement.removeAttribute('style');
    }
  })
})
*/
socket.on('message-alert', (data) => {
  if(data.receiver._id === socket._id) {
    alertify.showAlert('info', data)
  }

})

socket.on("online", (onlineSockets) => {
  socket.onlineSockets = onlineSockets;
  voidUsersStatusToOnline(onlineSockets);
});

const voidUsersStatusToOnline = (usersStatus) => {
  const NodeElements = document.querySelectorAll(".username");
  elements = Array.prototype.slice.call(NodeElements);
  elements.forEach((element) => {
    let onlineElement =
      element.parentElement.parentElement.children[0].children[1];
    if (
      usersStatus.indexOf(element.getAttribute("key")) >= 0 &&
      element.getAttribute("key") !== socket._id &&
      onlineElement.getAttribute("style") === "display: none;"
    ) {
      onlineElement.removeAttribute("style");
    }
  });
};

const persons = document.querySelector("#persons");
const editForm = document.querySelector("#edit-form");
const fileInput = document.querySelector("#profile_image");
const editDiv = document.querySelector("#edit-form-div");

const getAllUsers = async () => {
  let users;
  await request
    .get("/api/user/getall")
    .then((res) => (users = res))
    .catch((err) => console.log(err)); // TODO --> DELETE CONSOLE.LOG(ERR)
  getAllUsersToUI(Array.from(users.data));
};

const getAllUsersToUI = (users) => {
  console.log(socket.onlineSockets, socket._id);
  users.forEach((user) => {
    const senderId = storage.getBySessionStorage("senderId");
    const divElement = `
    <div class="card">
        <div class="card-top">
            <img src='/uploads/images/${
              user.profileImage
            }' width="200" height="200" />
            <div class="img-online" ${
              socket.onlineSockets &&
              socket.onlineSockets.indexOf(user._id) >= 0 &&
              user._id !== socket._id
                ? ""
                : "style='display: none;'"
            }></div>
        </div>
        <div class="card-fill">
            <span class='username' key=${user._id}>${user.name}</span>
            <span>${user.email}</span>
        </div>
        
        <div class="card-action" ${
          user._id === senderId ? "style='display: none;'" : ""
        }>
                <button class="btn btn-link">Mesaj Gönder</button>
        </div>

        <div class="card-action" ${
          user._id !== senderId ? "style='display: none;'" : ""
        }>
                <button class="btn" id="card-edit">Düzenle</button>
        </div>

    </div>
        `;
    persons.innerHTML += divElement;
  });
};

getAllUsers();
