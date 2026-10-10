import Link from "next/link";

export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-yellow-200 px-1 font-semibold text-nuit">
      [À COMPLÉTER : {children}]
    </span>
  );
}

export default function Legal({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-encre underline">
        Retour à l’accueil
      </Link>
      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
        {titre}
      </h1>
      <p className="mt-2 text-sm text-encre">Dernière mise à jour : 10 octobre 2026</p>
      <div className="mt-8 space-y-4 leading-relaxed [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}
