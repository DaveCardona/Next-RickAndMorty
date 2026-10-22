import { SITE_NAME, COPYRIGHT_YEAR } from "@/lib/constants";

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-400 sm:flex-row">
                <p>
                    © {COPYRIGHT_YEAR} {SITE_NAME}
                </p>
                <p>
                    Datos de{" "}
                    <a
                        href="https://rickandmortyapi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-400 hover:underline"
                    >
                        The Rick and Morty API
                    </a>
                </p>
            </div>
        </footer>
    );
}