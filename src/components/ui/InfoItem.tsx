import Link from "next/link";

interface InfoItemProps {
  label: string;
  value: string;
  href?: string;
}

export default function InfoItem({ label, value, href }: InfoItemProps) {
  return (
    <div className="rounded-md border border-slate-800 bg-slate-900 p-3">
      <dt className="text-xs uppercase text-slate-400">{label}</dt>
      <dd className="mt-1 text-slate-100">
        {href ? (
          <Link href={href} className="text-lime-400 hover:underline">
            {value}
          </Link>
        ) : (
          value || "—"
        )}
      </dd>
    </div>
  );
}