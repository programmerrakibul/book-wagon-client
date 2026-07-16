import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import Container from "@/components/ui/container";
const BookDetailsSkeleton = () => (
  <section className="bg-muted/30 py-8 sm:py-12">
    <Container>
      <SkeletonLayout variant="details" />
    </Container>
  </section>
);
export default BookDetailsSkeleton;
