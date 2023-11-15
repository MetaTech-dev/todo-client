import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
} from "@mui/material";

const LoadingToDoCard = () => {
  return (
    <Card
      elevation={3}
      sx={(theme) => ({
        maxWidth: theme.spacing(40),
      })}
    >
      <CardContent>
        <Skeleton height={40} animation="wave" />
        <Divider />
        <Skeleton height={80} animation="wave" />
        <Divider sx={{ mb: 1 }} />
        <Skeleton height={20} animation="wave" />
        <Skeleton height={20} animation="wave" />
        <Skeleton height={20} width={100} animation="wave" />

        <CardActions>
          <Box sx={{ flexGrow: 1 }} />

          <Skeleton
            variant="circular"
            height={30}
            width={30}
            animation="wave"
          />

          <Skeleton
            variant="circular"
            height={30}
            width={30}
            animation="wave"
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default LoadingToDoCard;
