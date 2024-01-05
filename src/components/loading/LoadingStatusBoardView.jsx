import { useTheme } from "@emotion/react";
import { Box, CardHeader, Paper } from "@mui/material";
import LoadingToDoCard from "./LoadingToDoCard";

const LoadingStatusBoardView = (key) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box
      className="status-column"
      key={key}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        maxWidth: theme.spacing(40),
      }}
    >
      <Paper
        elevation={2}
        sx={{
          backgroundColor: "neutral.main",
          minWidth: theme.spacing(40),
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <CardHeader
          title="..."
          sx={{
            borderRadius: "3px",
            backgroundColor: isDarkMode ? "inherit" : "primary.main",
            color: "primary.contrastText",
          }}
          titleTypographyProps={{
            variant: "h6",
          }}
        ></CardHeader>
        <LoadingToDoCard />
      </Paper>
    </Box>
  );
};

export default LoadingStatusBoardView;
