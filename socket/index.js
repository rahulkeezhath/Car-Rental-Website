const io = require('socket.io')(1502,{
    cors:{
        origin:"http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    // register a new user on socket server
    socket.on('new-user-add', (newUserId) => {

         // if user is not add previously
        if(!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        io.emit('get-users', activeUsers)
    })

    // send message
    socket.on('send-message', (data) => {
        const {receiverId} = data;
        const user = activeUsers.find((user) => user.userId === receiverId)
        if(user) {
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        io.emit('get-users', activeUsers)
    })
})