export type Commune = {
  slug: string;
  name: string;
  intro: string;
  localites: string[];
  besoins: string[];
  lat: number;
  lng: number;
};

/** Les 9 communes du département du Zou (Bénin). */
export const ZOU_COMMUNES: Commune[] = [
  {
    slug: "abomey",
    name: "Abomey",
    intro:
      "Basé à Abomey, j'interviens en moins de 24h pour l'installation, l'entretien et le dépannage de climatiseurs, chambres froides et systèmes frigorifiques, ainsi que pour la création de sites web et applications.",
    localites: ["Centre-ville", "Vidolé", "Djègbé", "Houndjro", "Agbokpa", "Zounzonmè"],
    besoins: [
      "Installation de split et climatisation de bureaux",
      "Entretien et recharge de gaz",
      "Chambres froides pour commerces et restaurants",
      "Sites web et applications pour PME",
    ],
    lat: 7.1826,
    lng: 1.9912,
  },
  {
    slug: "bohicon",
    name: "Bohicon",
    intro:
      "Carrefour économique du Zou, Bohicon concentre commerces, hôtels et entrepôts. J'y assure la climatisation, le froid commercial et la digitalisation des activités.",
    localites: ["Bohicon centre", "Gare", "Sodohomè", "Avogbanna", "Lissèzoun", "Passagon"],
    besoins: [
      "Froid commercial pour boutiques et supermarchés",
      "Climatisation d'hôtels et de salles",
      "Maintenance préventive sous contrat",
      "Boutiques en ligne et gestion de stock",
    ],
    lat: 7.1782,
    lng: 2.0667,
  },
  {
    slug: "agbangnizoun",
    name: "Agbangnizoun",
    intro:
      "À Agbangnizoun, j'accompagne particuliers, écoles et centres de santé sur la climatisation, la conservation par le froid et les solutions solaires adaptées aux coupures.",
    localites: ["Agbangnizoun centre", "Lissazounmè", "Kinta", "Sinwé", "Adanhondjigon"],
    besoins: [
      "Climatisation résidentielle",
      "Conservation de produits agricoles",
      "Froid alimenté au solaire",
      "Présence en ligne pour artisans",
    ],
    lat: 7.0667,
    lng: 1.9667,
  },
  {
    slug: "cove",
    name: "Covè",
    intro:
      "À Covè, j'installe et je dépanne climatiseurs, congélateurs et vitrines réfrigérées, avec un service de diagnostic rapide et des pièces d'origine.",
    localites: ["Covè centre", "Adogbé", "Gounli", "Naogon", "Soli"],
    besoins: [
      "Dépannage de congélateurs et vitrines",
      "Installation de climatiseurs",
      "Contrats d'entretien annuels",
      "Sites vitrines pour commerçants",
    ],
    lat: 7.2183,
    lng: 2.3403,
  },
  {
    slug: "djidja",
    name: "Djidja",
    intro:
      "Zone agricole majeure, Djidja a besoin de solutions de conservation fiables. Je conçois des chaînes de froid, y compris hybrides solaires, adaptées aux producteurs.",
    localites: ["Djidja centre", "Agondji", "Dan", "Gobaix", "Mougnon", "Setto"],
    besoins: [
      "Chambres froides agricoles",
      "Froid solaire hors réseau",
      "Maintenance de groupes frigorifiques",
      "Outils numériques de suivi des récoltes",
    ],
    lat: 7.3439,
    lng: 1.9375,
  },
  {
    slug: "ouinhi",
    name: "Ouinhi",
    intro:
      "À Ouinhi, j'interviens sur la climatisation, la réfrigération et la conservation du poisson et des produits frais, avec des devis clairs et sans surprise.",
    localites: ["Ouinhi centre", "Dasso", "Sagon", "Tohouès"],
    besoins: [
      "Conservation de poisson et produits frais",
      "Installation et entretien de climatiseurs",
      "Dépannage d'urgence",
      "Digitalisation des petites entreprises",
    ],
    lat: 7.0833,
    lng: 2.4667,
  },
  {
    slug: "za-kpota",
    name: "Za-Kpota",
    intro:
      "À Za-Kpota, je propose installation, entretien et réparation de systèmes de froid et de climatisation, ainsi que la création de sites web pour les structures locales.",
    localites: ["Za-Kpota centre", "Allahé", "Kpakpamè", "Kpozoun", "Za-Tanta", "Zèko"],
    besoins: [
      "Climatisation de bureaux et écoles",
      "Réparation de réfrigérateurs",
      "Installations solaires",
      "Sites web associatifs et scolaires",
    ],
    lat: 7.1667,
    lng: 2.2,
  },
  {
    slug: "zangnanado",
    name: "Zangnanado",
    intro:
      "À Zangnanado, j'assure la mise en service, le nettoyage et la remise en état d'équipements frigorifiques, avec conseils d'économie d'énergie.",
    localites: ["Zangnanado centre", "Banamè", "Dovi", "Kpédékpo"],
    besoins: [
      "Remise en état d'équipements frigorifiques",
      "Économie d'énergie et bon dimensionnement",
      "Froid pour centres de santé",
      "Accompagnement digital",
    ],
    lat: 7.25,
    lng: 2.3333,
  },
  {
    slug: "zogbodomey",
    name: "Zogbodomey",
    intro:
      "À Zogbodomey, j'interviens sur la climatisation, le froid commercial et les solutions techniques pour ateliers, boutiques et habitations.",
    localites: ["Zogbodomey centre", "Cana I", "Cana II", "Koussoukpa", "Massi", "Tanwé-Hessou"],
    besoins: [
      "Climatisation d'habitations et d'ateliers",
      "Froid pour boutiques et buvettes",
      "Maintenance régulière",
      "Création de sites et pages professionnelles",
    ],
    lat: 7.0833,
    lng: 2.1,
  },
];

export const ZOU_COMMUNE_NAMES = ZOU_COMMUNES.map((c) => c.name);

export function getCommune(slug: string) {
  return ZOU_COMMUNES.find((c) => c.slug === slug);
}
