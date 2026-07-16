import { SkeletonLayout } from "@/components/shared/skeleton-layout";
const BookCardSkeleton = ({ length = 6 }) => <SkeletonLayout count={length} />;
export default BookCardSkeleton;
