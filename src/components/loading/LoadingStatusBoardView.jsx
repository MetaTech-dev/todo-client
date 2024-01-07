import { useTheme } from "@emotion/react";
import { Box, Card, CardHeader, Skeleton } from "@mui/material";
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
        maxWidth: theme.spacing(40),
      }}
    >
      <Card
        elevation={2}
        sx={{
          backgroundColor: "neutral.main",
          minWidth: theme.spacing(40),
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <CardHeader
          title={<Skeleton variant="text" animation="wave" />}
          titleTypographyProps={{
            variant: "h6",
          }}
        />
        <LoadingToDoCard />
      </Card>
    </Box>
  );
};

export default LoadingStatusBoardView;
