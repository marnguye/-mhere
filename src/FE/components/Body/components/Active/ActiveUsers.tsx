import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export default function ActiveUsers() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (typeof data.activeUsers === "number") {
        setCount(data.activeUsers);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      ws.close();
    };
  }, [])

  return (
    <Grid sx={{
      width: 1, height: 55, p: 2,
      "& .MuiInputBase-root": { borderRadius: "10px", bgcolor: "#71797E" }
    }}
    >
      <Typography>
        🟢 {count} ACTIVE USERS
      </Typography>
    </Grid>
  )
}
