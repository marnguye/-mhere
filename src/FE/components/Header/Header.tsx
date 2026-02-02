import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Search from "./Search";
import ActiveUsers from "@components/Body/components/Active/ActiveUsers";

type HeaderProps = {
  onCountrySelect: (country: any) => void;
}

export default function Header({ onCountrySelect }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 55,
        width: 1,
        bgcolor: "transparent",
        // background: "radial-gradient(circle at center, transparent 0%, rgba(24, 19, 17, 0.4) 100%)",
        boxShadow: "none",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
          width: "40%",
          borderRadius: "15px",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          p: 2
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: 42 }}>
          'MHERE
        </Typography>
        <Search onSelect={onCountrySelect} />
      </Grid>
      <Grid>
        <ActiveUsers />
      </Grid>
    </AppBar>
  );
}

