import http from "http";
import { app } from "./app";
import { initWS } from "./ws";

const server = http.createServer(app);

initWS(server);

server.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
})

