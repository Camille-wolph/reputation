import type { Metadata } from "next";
import Legal, { Todo } from "../components/Legal";

export const metadata: Metadata = { title: "Conditions générales de vente — Réputation" };

export default function CGV() {
  return (
    <Legal titre="Conditions générales de vente">
      <h2>1. Objet</h2>
      <p>
        Ces conditions encadrent la vente de l’abonnement Réputation, proposé
        par <Todo>raison sociale, SIRET, adresse</Todo> (« l’Éditeur »), à des
        clients professionnels (« le Client »).
      </p>
      <h2>2. Le service</h2>
      <p>
        Réputation permet de générer un lien et un QR code à transmettre aux
        clients du Client après une prestation, de leur envoyer une relance
        automatique par email au bout de deux jours, de recueillir des retours
        privés et de suivre les résultats dans un tableau de bord. Pendant la
        phase de lancement (« accès fondateur »), la configuration initiale du
        compte peut être réalisée manuellement par l’Éditeur, par email.
      </p>
      <h2>3. Prix et paiement</h2>
      <p>
        Le prix est de 39 € par mois et par établissement, ou 390 € par an
        (offre annuelle). <Todo>préciser : « TTC » ou « TVA non applicable,
        article 293 B du CGI »</Todo>. Le paiement s’effectue en ligne par
        carte, via le prestataire Stripe, et se renouvelle à chaque échéance.
      </p>
      <h2>4. Durée et résiliation</h2>
      <p>
        L’abonnement est sans engagement. Le Client peut le résilier à tout
        moment <Todo>modalité : depuis son espace, ou par email à l’adresse de
        contact</Todo>. La résiliation prend effet à la fin de la période déjà
        payée, sans frais.
      </p>
      <h2>5. Garantie satisfait ou remboursé</h2>
      <p>
        Pendant 14 jours à compter du premier paiement, le Client peut demander
        le remboursement intégral, sans justification, en écrivant à l’adresse
        de contact. Le remboursement est effectué sous 5 jours ouvrés, sur le
        moyen de paiement utilisé.
      </p>
      <h2>6. Obligations du Client</h2>
      <p>
        Le Client s’engage à respecter les règles des plateformes d’avis
        (notamment Google), à ne pas trier ni filtrer les clients selon leur
        note, et à n’envoyer des messages qu’à des personnes dont il est en
        droit de conserver les coordonnées.
      </p>
      <h2>7. Responsabilité</h2>
      <p>
        L’Éditeur met tout en œuvre pour assurer un service continu mais ne
        garantit ni le nombre, ni la teneur des avis recueillis, ni leur
        affichage par Google, qui reste indépendant de Réputation.
      </p>
      <h2>8. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans la politique de
        confidentialité, accessible depuis le pied de page.
      </p>
      <h2>9. Droit applicable et litiges</h2>
      <p>
        Ces conditions sont soumises au droit français. En cas de litige, une
        solution amiable sera recherchée avant toute action. À défaut, les
        tribunaux compétents seront <Todo>juridiction compétente</Todo>.
      </p>
      <p>
        <Todo>si vous vendez aussi à des particuliers : nom et coordonnées du médiateur de la consommation</Todo>
      </p>
    </Legal>
  );
}
