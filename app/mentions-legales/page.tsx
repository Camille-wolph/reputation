import type { Metadata } from "next";
import Legal, { Todo } from "../components/Legal";

export const metadata: Metadata = { title: "Mentions légales — Réputation" };

export default function MentionsLegales() {
  return (
    <Legal titre="Mentions légales">
      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom ou raison sociale : <Todo>nom, prénom ou raison sociale</Todo></li>
        <li>Statut : <Todo>micro-entrepreneur, société…</Todo></li>
        <li>SIRET : <Todo>numéro SIRET</Todo></li>
        <li>Adresse : <Todo>adresse postale</Todo></li>
        <li>Email : <Todo>adresse email de contact</Todo></li>
        <li>Téléphone : <Todo>numéro de téléphone</Todo></li>
        <li>TVA : <Todo>numéro de TVA, ou « TVA non applicable, article 293 B du CGI »</Todo></li>
      </ul>
      <h2>Directeur de la publication</h2>
      <p><Todo>nom du directeur de la publication</Todo></p>
      <h2>Hébergeur</h2>
      <p>
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        Site : vercel.com.
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, éléments graphiques et le nom Réputation sont protégés. Toute
        reproduction sans autorisation écrite est interdite.
      </p>
      <h2>Contact</h2>
      <p>Pour toute question, écrivez à <Todo>adresse email de contact</Todo>.</p>
    </Legal>
  );
}
