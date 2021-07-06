let sockets = []

const mainSpace = (socket, io) => {
    socket.on("connection-main", (data) => {
        socket._id = data._id;
        socket.online = true;
        socket.lastTime = Date.now();
        sockets.indexOf(socket._id) < 0 ? sockets.push(socket._id) : "";
        io.of('/').emit('online', sockets);
    });

    socket.on('disconnect', () => {
        socket.lastTime = Date.now();
        socket.online = false;
        sockets = sockets.filter(socketId => socketId !== socket._id);
    })
}

module.exports = mainSpace