import { Box, Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <Box height={400}>
      <Skeleton width={300} height={180} />
      <Skeleton width={200} />
      <Skeleton width={150} />
    </Box>
  );
};

export default SkeletonLoader;
