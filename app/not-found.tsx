import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Cette page n’existe pas
      </h1>
      <p className="mt-4 leading-relaxed text-encre">
        Le lien est peut-être incomplet ou la page a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-rose px-6 py-3 font-bold text-white"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
