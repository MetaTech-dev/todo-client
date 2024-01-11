import { Card, CardContent, Divider, Paper, Skeleton } from "@mui/material";

const LoadingDetailedToDo = () => {
  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        p: 2,
        width: theme.spacing(120),
      })}
    >
      <Card elevation={2} sx={{ flex: 6, mr: 2 }}>
        <CardContent>
          <Skeleton height={50} animation="wave" />
          <Divider sx={{ mb: 1 }} />
          <Skeleton
            height={400}
            animation="wave"
            id="bigskelly"
            variant="rounded"
          />
        </CardContent>
      </Card>
      <Card elevation={2} sx={{ flex: 3 }}>
        <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
          <Skeleton height={50} animation="wave" />
          <Divider sx={{ mb: 1 }} />
          <Skeleton height={30} width={200} animation="wave" />
          <Divider sx={{ mb: 1 }} />
          <Skeleton height={30} width={220} animation="wave" />
          <Divider sx={{ mb: 1 }} />
          <Skeleton height={30} width={160} animation="wave" />
          <Divider sx={{ mb: 1 }} />
          <Skeleton height={30} width={80} animation="wave" />
          <Divider sx={{ mb: 1 }} />
          <Skeleton height={30} width={80} animation="wave" />
        </CardContent>
      </Card>
    </Paper>
  );
};

export default LoadingDetailedToDo;
