import ListSkeleton from "@/components/ui/ListSkeleton";

export default function Loading() {
  return (
    <ListSkeleton
      count={6}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      itemClassName="h-32"
    />
  );
}