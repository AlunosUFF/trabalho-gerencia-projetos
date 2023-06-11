import express from 'express';
import http from 'http';
import {  Response } from "express";
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url'
import { GameEvent, InputEvent, PlayerEvent, ServerEvent } from '../shared/events.model';
import { DomainSocket } from '../shared/models';

const app = express();

const server = http.createServer(app);
const io = new SocketIOServer(server);
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configurar o diretório onde estão os arquivos estáticos
const staticPath = path.join(__dirname, '../client');
app.use(express.static(staticPath, { extensions: ['html'] }));

// Rota para servir o arquivo index.html
app.get('/', (_, res:Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

class GameServer {

  constructor() {
    this.socketEvents();
  }

  public connect(port: number): void {
    server.listen(port, () => {
        console.info(`Listening on port ${port}`);
    });
  } 

  private socketEvents(): void {
    io.on(ServerEvent.connected, (socket: DomainSocket) => {
        console.log('Connected: ', socket.id)
        this.attachListeners(socket);
    });
  }

  private attachListeners(socket: DomainSocket): void {
      this.addSignOnListener(socket);
      // this.addMovementListener(socket);
      // this.addSignOutListener(socket);
      // this.addHitListener(socket);
      // this.addCometHitListener(socket);
      // this.addPickupListener(socket);
  }

  private addSignOnListener(socket: DomainSocket): void {
    socket.on(
      InputEvent.update,
        (msg)=>{
          console.log(socket.id, msg)
          socket.broadcast.emit(GameEvent.authentication, msg);
        });
        // (player: Player, gameSize: Coordinates) => {
        //     socket.emit(PlayerEvent.players, this.getAllPlayers());
        //     this.createPlayer(socket, player, gameSize);
        //     socket.emit(PlayerEvent.protagonist, socket.player);
        //     socket.broadcast.emit(PlayerEvent.joined, socket.player);
        //     this.gameInitialised(socket);
        // }
  }
}


const port = process.env.PORT || 3000;
const gameSession = new GameServer();
gameSession.connect(port);