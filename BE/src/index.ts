import http from "http";
import { app } from "./app";
import { initWS } from "./ws";

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

initWS(server);

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
})

