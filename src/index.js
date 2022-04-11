import { Server as WebSocketServer } from "socket.io";
import http from "http";

import Sockets from "./sockets.js";
import app from "./app.js";
import { PORT } from "./config.js";

const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("Server on http://localhost:", PORT);

const io = new WebSocketServer(httpServer);

Sockets(io);
