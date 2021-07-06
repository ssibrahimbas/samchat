let sockets = [];
let rooms = [];

const checkThisRoomUndefined = (roomId) => {
    let result;
    rooms.forEach((room) => {
        if (room._id === roomId) {
            return (result = false);
        }
    });
    return result === false ? result : (result = true);
};

const addThisSocketToRoom = (socketId, roomId) => {
    if (checkThisRoomUndefined(roomId)) {
        let room = {
            _id: roomId,
            members: [socketId],
        };
        rooms.push(room);
        return;
    }
    rooms.forEach((room) => {
        if (room._id === roomId) {
            room.members.push(socketId);
        }
    });
};

const checkSocketIsThisRoom = (socketId, roomId) => {
    if (checkThisRoomUndefined(roomId)) return false;
    let res;
    rooms.forEach((room) => {
        room.members.indexOf(socketId) < 0 ? (res = false) : (res = true);
    });
    return res;
};

const removeThisSocketFromRoom = (socketId, roomId) => {
    if (checkSocketIsThisRoom(socketId, roomId)) {
        rooms.forEach((room) => {
            room.members = room.members.filter((member) => member !== socketId);
        });
    }
};

const checkHowOnlineUserThisRoom = (roomId) => {
    let result;
    rooms.forEach((room) => {
        room._id === roomId ? (result = room.members.length) : "";
    });
    return result === 2;
};

const roomSpace = (socket, io) => {
    socket.on("join-room", (roomName, id) => {
        socket._id = id;
        socket.join(roomName);
        socket.currentRoom = roomName;
        socket.lastTime = Date.now();
        addThisSocketToRoom(id, roomName);
        let isSeen = checkHowOnlineUserThisRoom(roomName)
        io.of('/rooms').to(roomName).emit("is-seen", isSeen);
    });

    socket.on("user-is-seen", (boolean) => {
        socket.broadcast.emit("is-seen", boolean);
    });

    socket.on("message", (data) => {
        socket.LastTime = Date.now();
        const isSeen = checkHowOnlineUserThisRoom(socket.currentRoom);
        socket.broadcast.emit("is-seen", isSeen);
        socket.broadcast.to(socket.currentRoom).emit("chat-message", data);
        if (!isSeen) {
            io.of('/').emit('message-alert', data)
        }
    });

    socket.on("feedback", (data) => {
        socket.broadcast.to(data.conversationId).emit("feedback-message", data);
    });

    socket.on("disconnect", () => {
        socket.lastTime = Date.now();
        socket.broadcast.emit("is-seen", false);
        removeThisSocketFromRoom(socket._id, socket.currentRoom);
    });
};

module.exports = roomSpace;
