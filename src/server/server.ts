import express from 'express';
import http from 'http';
import {  Response } from "express";
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url'
import { GameEvent, InputEvent, LobbyEvents, PlayerEvent, ServerEvent } from '../shared/interfaces/events.model';
import { DomainSocket, PlayerContainer, WarMatch } from '../shared/interfaces/models';

import { v4 as uuidv4 } from 'uuid';
import { GamePlayer } from '../shared/model/GamePlayer';


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

  private hasLobby:boolean = false;
  private players: GamePlayer[] = [];
  private playersContainers: PlayerContainer[] = new Array(6).fill(
    {
      color: 0,
      activeType: 0,
      playerName: "",
      isEditing: true
    })

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
      console.log("Usuário conectado: " + socket.id + uuidv4())
         this.attachListeners(socket);
         socket.on(ServerEvent.disconnected , (reason)=>{
            console.log("Usuário desconectado:", reason, socket.id);
         })
    });
  }

  private attachListeners(socket: DomainSocket): void {
      this.addSignOnListener(socket);
      this.addLobbyListener(socket);
  }

  private addLobbyListener(socket: DomainSocket):void{
    socket.on(GameEvent.lobby, (warMatch:WarMatch)=>{
      socket.emit(GameEvent.lobby, {hasLobbed: true, warMatch, containers: this.playersContainers})
    })

    socket.on(InputEvent.update, (playerContainer:PlayerContainer)=>{
      this.playersContainers[playerContainer.index] = playerContainer
      socket.broadcast.emit(InputEvent.update, playerContainer);
    })

    
  } 

  private addSignOnListener(socket: DomainSocket): void {
    socket.on(GameEvent.authentication, ()=>{

    })
  }

  private gameLobbed(){
      if(!this.hasLobby){
        this.hasLobby = true;
      }
  }
}


const port = process.env.PORT || 3000;
const gameSession = new GameServer();
gameSession.connect(parseInt(port));