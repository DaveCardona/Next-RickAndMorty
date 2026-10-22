export default function Loading() {
  return (
    <div className="grid animate-pulse gap-6 md:grid-cols-[300px_1fr]">
      <div className="aspect-square rounded-lg bg-slate-800" />
      <div className="space-y-4">
        <div className="h-8 w-1/2 rounded bg-slate-800" />
        <div className="h-24 rounded bg-slate-800" />
        <div className="h-24 rounded bg-slate-800" />
      </div>
    </div>
  );
}