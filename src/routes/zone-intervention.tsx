import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion-primitives";
import { ZOU_COMMUNES } from "@/lib/zou";
import { CONTACT } from "@/components/site-footer";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";

const BASE = "https://sidoineahizigbe.online";
const URL = `${BASE}/zone-intervention`;
const TITLE = "Zone d'intervention — Froid, climatisation & digital dans tout le Zou (Bénin)";
const DESC =
  "Sidoine Ahizigbe intervient dans les 9 communes du Zou : Abomey, Bohicon, Agbangnizoun, Covè, Djidja, Ouinhi, Za-Kpota, Zangnanado, Zogbodomey. Froid, climatisation, solaire et solutions digitales.";

export const Route = createFileRoute("/zone-intervention")({
  component: ZonePage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "technicien froid Zou, climatisation Zou Bénin, frigoriste Abomey Bohicon, chambre froide Zou, développeur web Zou, Sidoine Ahizigbe",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "geo.region", content: "BJ-ZO" },
      { name: "geo.placename", content: "Zou, Bénin" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Sidoine Ahizigbe" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "HVACBusiness"],
              "@id": `${URL}#business`,
              name: "KONFORTECH BÉNIN",
              description: DESC,
              url: URL,
              telephone: CONTACT.phoneRaw,
              email: CONTACT.email,
              priceRange: "₣₣",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Abomey",
                addressRegion: "Zou",
                addressCountry: "BJ",
              },
              areaServed: ZOU_COMMUNES.map((c) => ({ "@type": "City", name: c.name })),
              founder: {
                "@type": "Person",
                name: "Sidoine Ahizigbe",
                jobTitle: "Étudiant en fin de formation en Froid & Climatisation",
                url: BASE,
              },
            },
            {
              "@type": "ItemList",
              name: "Communes desservies dans le Zou",
              itemListElement: ZOU_COMMUNES.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.name,
                url: `${BASE}/zou/${c.slug}`,
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
                { "@type": "ListItem", position: 2, name: "Zone d'intervention", item: URL },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

function ZonePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-28">
      <Reveal>
        <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary" /> Département du Zou — Bénin
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
          Un spécialiste du froid, de la climatisation et du digital dans{" "}
          <span className="text-primary">toutes les communes du Zou</span>
        </h1>
        <p className="mt-5 max-w-3xl text-muted-foreground">
          Basé à Abomey, j'interviens dans les 9 communes du département : installation et dépannage
          de climatiseurs, chambres froides, froid commercial et industriel, énergie solaire, mais
          aussi sites web, applications et solutions IoT pour les entreprises locales. Diagnostic à
          partir de 7 500 FCFA, installation de split à partir de 25 000 FCFA, site web
          professionnel à partir de 100 000 FCFA.
        </p>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="size-4" /> Décrire mon besoin sur WhatsApp
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZOU_COMMUNES.map((c) => (
            <Link
              key={c.slug}
              to="/zou/$commune"
              params={{ commune: c.slug }}
              className="glass-card group rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <h2 className="font-display text-lg font-semibold">{c.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                Voir les services <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </section>
      </Reveal>
    </main>
  );
}
