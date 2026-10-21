import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/motion-primitives";
import { getCommune, ZOU_COMMUNES } from "@/lib/zou";
import { CONTACT } from "@/components/site-footer";
import { CheckCircle2, MapPin, Phone, MessageCircle, ArrowRight, Snowflake, Code2 } from "lucide-react";

const BASE = "https://sidoineahizigbe.online";

function faqFor(name: string) {
  return [
    {
      q: `Qui contacter pour un technicien en froid et climatisation à ${name} ?`,
      a: `Sidoine Ahizigbe, étudiant en fin de formation en froid & climatisation et fondateur de KONFORTECH BÉNIN, intervient à ${name} et dans tout le département du Zou. Contact direct : ${CONTACT.phone} (WhatsApp disponible).`,
    },
    {
      q: `Quel est le prix d'une intervention à ${name} ?`,
      a: `Le diagnostic démarre à 7 500 FCFA, l'installation d'un split à partir de 25 000 FCFA et la création d'un site web professionnel à partir de 100 000 FCFA. Un devis précis et gratuit est fourni avant toute intervention à ${name}.`,
    },
    {
      q: `Quel délai d'intervention à ${name} ?`,
      a: `Depuis Abomey, les interventions à ${name} sont généralement planifiées sous 24 à 48h, avec un service d'urgence pour les pannes de chambres froides et d'équipements sensibles.`,
    },
    {
      q: `Proposez-vous aussi des services digitaux à ${name} ?`,
      a: `Oui. En plus du froid et de la climatisation, je conçois sites web, applications mobiles et solutions IoT pour les entreprises et commerçants de ${name}.`,
    },
  ];
}

export const Route = createFileRoute("/zou/$commune")({
  loader: ({ params }) => {
    const commune = getCommune(params.commune);
    if (!commune) throw notFound();
    return { commune };
  },
  head: ({ params, loaderData }) => {
    const name = loaderData?.commune.name ?? params.commune;
    const url = `${BASE}/zou/${params.commune}`;
    const title = `Technicien froid & climatisation à ${name} (Zou, Bénin) — Sidoine Ahizigbe`;
    const description = `Spécialiste froid, climatisation, chambres froides, énergie solaire et solutions digitales à ${name}, département du Zou. Devis gratuit, intervention rapide. ${CONTACT.phone}.`;
    const faq = faqFor(name);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content: `technicien froid ${name}, climatisation ${name}, frigoriste ${name}, réparation climatiseur ${name}, chambre froide ${name}, développeur web ${name}, Zou Bénin, Sidoine Ahizigbe`,
        },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { name: "geo.region", content: "BJ-ZO" },
        { name: "geo.placename", content: `${name}, Zou, Bénin` },
        {
          name: "geo.position",
          content: `${loaderData?.commune.lat};${loaderData?.commune.lng}`,
        },
        { name: "ICBM", content: `${loaderData?.commune.lat}, ${loaderData?.commune.lng}` },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:site_name", content: "Sidoine Ahizigbe" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["LocalBusiness", "HVACBusiness"],
                "@id": `${url}#business`,
                name: `KONFORTECH BÉNIN — ${name}`,
                description,
                url,
                telephone: CONTACT.phoneRaw,
                email: CONTACT.email,
                priceRange: "₣₣",
                image: `${BASE}/og-image.jpg`,
                founder: {
                  "@type": "Person",
                  name: "Sidoine Ahizigbe",
                  jobTitle: "Étudiant en fin de formation en Froid & Climatisation",
                  url: BASE,
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: name,
                  addressRegion: "Zou",
                  addressCountry: "BJ",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: loaderData?.commune.lat,
                  longitude: loaderData?.commune.lng,
                },
                areaServed: ZOU_COMMUNES.map((c) => ({
                  "@type": "City",
                  name: c.name,
                })),
                knowsAbout: [
                  "Froid industriel",
                  "Climatisation",
                  "Chambre froide",
                  "Énergie solaire",
                  "Développement web",
                  "IoT",
                ],
                openingHours: "Mo-Sa 08:00-19:00",
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Zone d'intervention",
                    item: `${BASE}/zone-intervention`,
                  },
                  { "@type": "ListItem", position: 3, name, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: CommunePage,
});

function CommunePage() {
  const { commune } = Route.useLoaderData();
  const others = ZOU_COMMUNES.filter((c) => c.slug !== commune.slug);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-28">
      <Reveal>
        <nav aria-label="Fil d'ariane" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Accueil
          </Link>{" "}
          /{" "}
          <Link to="/zone-intervention" className="hover:text-foreground">
            Zone d'intervention
          </Link>{" "}
          / <span className="text-foreground">{commune.name}</span>
        </nav>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary" /> {commune.name}, Zou — Bénin
        </p>

        <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
          Technicien froid, climatisation & solutions digitales à{" "}
          <span className="text-primary">{commune.name}</span>
        </h1>

        <p className="mt-5 max-w-3xl text-muted-foreground">{commune.intro}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="size-4" /> Demander un devis gratuit
          </a>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            <Phone className="size-4" /> {CONTACT.phone}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Snowflake className="size-4 text-primary" /> Besoins couverts à {commune.name}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {commune.besoins.map((b: string) => (
                <li key={b} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Code2 className="size-4 text-accent" /> Localités desservies
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {commune.localites.map((l: string) => (
                <span
                  key={l}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {l}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Intervention également possible dans les villages environnants de la commune de{" "}
              {commune.name}.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">
            Questions fréquentes — {commune.name}
          </h2>
          <div className="mt-6 space-y-3">
            {faqFor(commune.name).map((f) => (
              <details key={f.q} className="glass-card rounded-2xl p-5">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">Autres communes du Zou</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/zou/$commune"
                params={{ commune: c.slug }}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Voir tous les services <ArrowRight className="size-4" />
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
