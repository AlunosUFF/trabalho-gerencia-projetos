import express from "express";
import url from "url";
import path from "path";
import http from "http";
import {Server} from "socket.io";

const app = express();
const port = process.env.port || 3000;

const atualDir = url.fileURLToPath(import.meta.url);
const publicDir = path.join(atualDir, "../..", "public");
app.use(express.static(publicDir));
console.log("public dir -> " + publicDir)

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => console.log(`Servidor escutando na porta ${port}`))

const io = new Server(serverHttp);

export default io;