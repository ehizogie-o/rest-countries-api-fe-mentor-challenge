import { Box, Skeleton } from "@mui/material";

interface imageSkeletonProps {
  width: number;
  height: number;
}

const HomeSkeletonLoader = () => {
  return (
    <Box height={400}>
      <Skeleton width={300} height={180} />
      <Skeleton width={200} />
      <Skeleton width={150} />
    </Box>
  );
};

export const ImageSkeletonLoader = ({ width, height }: imageSkeletonProps) => {
  return <Skeleton width={`${width}%`} height={height} />;
};

export default HomeSkeletonLoader;
