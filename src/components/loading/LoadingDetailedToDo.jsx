import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Skeleton,
} from "@mui/material";

const LoadingDetailedToDo = () => {
  return (
    <Card
      sx={{
        p: 2,
        width: "90%",
      }}
      elevation={2}
    >
      <Skeleton height={70} animation="wave" variant="rounded" sx={{ m: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", m: 2 }}>
        <Skeleton height={50} width={140} animation="wave" sx={{ mr: 1 }} />
        <Skeleton
          height={35}
          width={35}
          animation="wave"
          variant="circular"
          sx={{ mr: 1 }}
        />
        <Box sx={{ flex: 1 }} />
        <Skeleton height={50} width={100} animation="wave" sx={{ mr: 1 }} />
      </Box>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Skeleton height={50} width={140} animation="wave" sx={{ mr: 1 }} />
          <Skeleton height={50} width={180} animation="wave" sx={{ mr: 1 }} />
          <Skeleton height={50} width={110} animation="wave" sx={{ mr: 1 }} />
          <Skeleton height={50} width={100} animation="wave" sx={{ mr: 1 }} />
        </Box>
        <Skeleton
          height={200}
          animation="wave"
          id="bigskelly"
          variant="rounded"
        />
      </CardContent>
    </Card>
  );
};

export default LoadingDetailedToDo;
