import { useTheme } from "@emotion/react";
import { Box, Card, CircularProgress, Paper } from "@mui/material";
import LoadingToDoCard from "./LoadingToDoCard";

const LoadingStatusBoardView = (key) => {
  const theme = useTheme();
  return (
    <Box
      className="status-column"
      key={key}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        m: 1,
        maxWidth: theme.spacing(40),
      }}
    >
      <Card
        className="statusTitle"
        elevation={1}
        sx={{
          alignSelf: "center",
          width: "fit-content",
          maxWidth: theme.spacing(40),
          marginBottom: 1,
          flexShrink: 0,
          pl: 1.5,
          pr: 1.5,
        }}
      >
        <CircularProgress size={25} sx={{ marginRight: 1 }} />
      </Card>
      <Paper
        elevation={1}
        sx={{
          backgroundColor: "neutral.main",
          minWidth: theme.spacing(40),
          overflowY: "auto",
          flexGrow: 1,
          p: 1,
        }}
      >
        <LoadingToDoCard />
      </Paper>
    </Box>
  );
};

export default LoadingStatusBoardView;
