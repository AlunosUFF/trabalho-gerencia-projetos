import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url'

const app = express();
const server = http.createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configurar o diretório onde estão os arquivos estáticos
const staticPath = path.join(__dirname, '../client');
app.use(express.static(staticPath, { extensions: ['html'] }));

// Rota para servir o arquivo index.html
app.get('/', (_, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const io = new SocketIOServer(server);


// const gameSession = new GameServer()
// gameSession.connect(3000)
const port = process.env.PORT || 3000;

// Configurar o Socket.IO
io.on('connection', ():void => {
  console.log('Novo cliente conectado');

  // Lidar com eventos do Socket.IO aqui
});

// Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});