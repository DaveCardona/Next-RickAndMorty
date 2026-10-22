interface ListSkeletonProps {
  count?: number;
  className?: string;
  itemClassName?: string;
}

export default function ListSkeleton({
  count = 8,
  className = "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
  itemClassName = "aspect-[3/4]",
}: ListSkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse rounded-lg bg-slate-800 ${itemClassName}`} />
      ))}
    </div>
  );
}