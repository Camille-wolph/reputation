import type { Metadata } from "next";
import Legal, { Todo } from "../components/Legal";

export const metadata: Metadata = { title: "Politique de confidentialité — Réputation" };

export default function Confidentialite() {
  return (
    <Legal titre="Politique de confidentialité">
      <h2>Qui est responsable ?</h2>
      <p>
        <Todo>raison sociale, adresse, email de contact</Todo> est responsable
        des données collectées sur ce site et dans le cadre de l’abonnement.
      </p>
      <h2>Quelles données, et pourquoi ?</h2>
      <ul>
        <li>
          Clients professionnels : email, nom de l’établissement, informations
          de facturation. Finalité : fournir le service et facturer (exécution
          du contrat, obligations comptables).
        </li>
        <li>
          Paiement : traité par Stripe. L’Éditeur ne voit ni ne conserve votre
          numéro de carte.
        </li>
        <li>
          Clients de nos clients : email ou téléphone, note et commentaire.
          Pour ces données, Réputation agit comme sous-traitant du
          professionnel, qui reste responsable de ses propres clients.
        </li>
        <li>
          Visiteurs du site : mesure d’audience sans cookie ni profilage
          publicitaire. <Todo>nom de l’outil de mesure, une fois choisi</Todo>
        </li>
      </ul>
      <h2>Avec qui sont-elles partagées ?</h2>
      <p>
        Uniquement avec les prestataires nécessaires au service : Vercel
        (hébergement), Supabase (base de données), Stripe (paiement), Resend
        (envoi d’emails). <Todo>vérifier cette liste au moment de la mise en service</Todo>
      </p>
      <h2>Transferts hors Union européenne</h2>
      <p>
        Certains prestataires sont situés aux États-Unis. Les transferts sont
        encadrés par les garanties prévues par le RGPD (clauses contractuelles
        types ou cadre de protection des données UE–États-Unis).
      </p>
      <h2>Durée de conservation</h2>
      <p>
        <Todo>durées : par exemple, données du compte conservées pendant l’abonnement puis supprimées sous X mois ; factures conservées 10 ans</Todo>
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l’accès, la rectification, l’effacement, la
        limitation ou la portabilité de vos données, et vous opposer à leur
        traitement, en écrivant à <Todo>adresse email de contact</Todo>. Vous
        pouvez aussi saisir la CNIL (cnil.fr).
      </p>
      <h2>Cookies</h2>
      <p>
        Ce site n’utilise aucun cookie publicitaire ni de suivi. Si cela change,
        cette page sera mise à jour et votre accord sera demandé.
      </p>
    </Legal>
  );
}
