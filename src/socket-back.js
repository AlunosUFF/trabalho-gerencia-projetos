import io from "./server.js"

io.on("connection",(socket) => {
    console.log("Um novo jogador entrou -> ", socket.id)
})