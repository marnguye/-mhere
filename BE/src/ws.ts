import { WebSocketServer } from "ws";

export function initWS(server: any) {
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
      wss.clients.forEach((client) => client.send(payload));
    }
  });
} 
