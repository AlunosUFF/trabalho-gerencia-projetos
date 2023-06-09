console.log("Server")

// const { PlayerEvent, ServerEvent } =  require("../shared/events.model");
// const { DomainSocket } = require("../shared/models");
// // import * as express from "express";



// const express = require('express');
// console.log(express)
// const http = require('http');
// const { Server: SocketIOServer } = require('socket.io');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const uuid = require("uuid")

// // Configurar o diretório onde estão os arquivos estáticos
// const staticPath = path.join(`${path.resolve(__dirname,"../../")}`, 'dist');
// app.use(express.static(staticPath, { 'extensions': ['html'] }));

// // Rota para servir o arquivo index.html
// app.get('/', (_req , res) => {
//   res.sendFile(path.join(staticPath, 'index.html'));
// });


// const io = new SocketIOServer(server);

// const port = process.env.PORT || 3000;

// // Configurar o Socket.IO
// // io.on('connection', (socket: DomainSocket) => {
// //   console.log('Novo cliente conectado ',socket.id);
  
// //   // Lidar com eventos do Socket.IO aqui
// // });

// // // Inicia o servidor
// // server.listen(port, () => {
// //   console.log(`Servidor iniciado em http://localhost:${port}`);
// // });

// class GameServer {
//   // private gameHasStarted:boolean = false;

//   constructor() {
//     this.socketEvents();
//   }

//   connect(port) {
//     server.listen(port, () => {
//       console.log(`Servidor iniciado em http://localhost:${port}`);
//     });
//   }

//    socketEvents()  {
//     io.on(ServerEvent.connected, (socket) => {
//         this.attachListeners(socket);
//   });
  
// }
//   attachListeners(socket) {
//     this.addSignOnListener(socket);
//     this.addSignOutListener(socket)
//   }

//   addSignOnListener(socket) {
//     alert("Player connectou!: " + uuid() )
//   }

//   addSignOutListener(socket) {
//     socket.on(ServerEvent.disconnected, () => {
//         if (socket.player) {
//             socket.broadcast.emit(PlayerEvent.quit, socket.player.id);
//         }
//     });
//   }
// }

// const gameSession = new GameServer();
// gameSession.connect(3000)