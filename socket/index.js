let sockets = [];

const removeSocket = (userId) => {
    sockets = sockets.filter((socket) => socket.userId !== userId);
};

const receiverIsOnline = (receiverId) => {
    sockets.forEach((socket) => {
        if (socket._id === receiverId) return true;
    });
    return false;
};

const onConnected = (socket) => {
    socket.on("connection-main", (data) => {
        socket._id = data._id;
        socket.lastTime = Date.now();
        sockets.indexOf(socket) < 0 ? sockets.push(socket) : "";
        socket.broadcast.emit("online", socket._id);
    });

    socket.on("join-room", (roomName) => {
        socket.join(roomName);
        socket.currentRoom = roomName;
        socket.lastTime = Date.now();
        socket.online = true;
        socket.broadcast.to(socket.currentRoom).emit("seen-messages");

        // TODO --> Görüldü Mesajı Gönderilecek
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnected-feedback");
        socket.lastTime = Date.now();
        sockets.indexOf();
        removeSocket(socket._id);
    });

    socket.on("message", (data) => {
        socket.LastTime = Date.now();
        if (socket.online) {
            socket.broadcast.to(socket.currentRoom).emit("seen-messages");
        }
        receiverIsOnline(data.receiver._id) && socket.broadcast.to(data.conversation._id).emit('seen-messages');
        socket.broadcast.to(data.conversation._id).emit("chat-message", data);
    });

    socket.on('check-message', (data) => {
        if (socket.online) {
            socket.broadcast.to(socket.currentRoom).emit("seen-messages");
        }
        receiverIsOnline(data.receiver._id)
        data.isSeen = receiverIsOnline(data.receiver._id);
        socket.broadcast.to(data.conversation._id).emit('successful check-message', data);
    })

    socket.on("feedback", (data) => {
        socket.broadcast.to(data.conversationId).emit("feedback-message", data);
    });

    socket.on('user not-seen', () => {
        socket.broadcast.to(socket.currentRoom).emit('user is not here');
    })

    socket.on('user seen', () => {
        socket.broadcast.to(socket.currentRoom).emit('user is here');
    })
};

module.exports = {
    onConnected,
};
