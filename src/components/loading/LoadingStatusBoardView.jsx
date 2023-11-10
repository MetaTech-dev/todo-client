import { useTheme } from "@emotion/react";
import { Box, Card, Paper, Typography } from "@mui/material";

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
        elevation={5}
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
        <Typography
          sx={{
            fontWeight: "450",
            fontSize: "22px",
            opacity: ".8",
            textAlign: "center",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Typography>
      </Card>
      <Paper
        elevation={10}
        sx={{
          backgroundColor: "neutral",
          minWidth: theme.spacing(40),
          overflowY: "auto",
          flexGrow: 1,
          p: 1,
        }}
      ></Paper>
    </Box>
  );
};

export default LoadingStatusBoardView;
