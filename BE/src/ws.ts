import { WebSocketServer } from "ws";
import { Server } from "http";

export function initWS(server: Server) {
  const wss = new WebSocketServer({ server });
  let activeUsers = 0;

  wss.on("connection", (ws) => {
    activeUsers++;
    broadcast();

    ws.on("close", () => {
      activeUsers--;
      broadcast();
    })
    function broadcast() {
      const payload = JSON.stringify({ activeUsers });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(payload);
        }
      });
    }
  });
} 
