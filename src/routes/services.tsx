import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion-primitives";
import {
  Snowflake,
  Wrench,
  Sun,
  Code2,
  Smartphone,
  Cpu,
  Cog,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { usePageContent } from "@/hooks/use-page-content";

const URL = "https://sidoineahizigbe.online/services";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services froid, climatisation & digital au Bénin — Sidoine Ahizigbe" },
      {
        name: "description",
        content:
          "Froid industriel, climatisation, maintenance, énergie solaire, développement web, applications mobiles, IoT et conseil digital à Abomey et partout au Bénin.",
      },
      {
        name: "keywords",
        content:
          "froid industriel Bénin, climatisation Abomey, chambre froide, maintenance frigorifique, énergie solaire Bénin, développement web Bénin, IoT",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BJ-ZO" },
      { name: "geo.placename", content: "Abomey, Zou, Bénin" },
      { property: "og:title", content: "Services — KONFORTECH BÉNIN" },
      {
        property: "og:description",
        content: "Froid, climatisation, technologies et accompagnement entrepreneurial au Bénin.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Sidoine Ahizigbe" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services — KONFORTECH BÉNIN" },
      {
        name: "twitter:description",
        content: "Froid, climatisation, solutions digitales et IoT au Bénin.",
      },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Froid, climatisation et solutions digitales",
          provider: {
            "@type": "Organization",
            name: "KONFORTECH BÉNIN",
            founder: { "@type": "Person", name: "Sidoine Ahizigbe" },
            url: "https://sidoineahizigbe.online",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abomey",
              addressRegion: "Zou",
              addressCountry: "BJ",
            },
          },
          areaServed: { "@type": "Country", name: "Bénin" },
          url: URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sidoineahizigbe.online" },
            { "@type": "ListItem", position: 2, name: "Services", item: URL },
          ],
        }),
      },
    ],
  }),
});

const icons = [Snowflake, Cog, Wrench, Sun, Code2, Smartphone, Cpu, Lightbulb, TrendingUp];

const fallback = {
  g1: [
    ["Froid industriel", "Chambres froides, groupes frigorifiques, chaîne du froid."],
    ["Climatisation", "Étude, installation et mise en service de systèmes CVC."],
    ["Maintenance", "Préventive et curative, avec contrats de suivi."],
    ["Solutions énergétiques", "Solaire photovoltaïque et efficacité énergétique."],
  ],
  g2: [
    ["Développement web", "Sites vitrines, plateformes métier et back-offices."],
    ["Applications mobiles", "Apps multiplateformes rapides et hors-ligne."],
    ["Solutions IoT", "Capteurs connectés, supervision et alertes temps réel."],
    ["Automatisation", "Processus automatisés et intégrations sur mesure."],
  ],
  g3: [
    ["Conseil", "Cadrage technique et choix d'équipements."],
    ["Transformation digitale", "Digitalisation des opérations et du suivi client."],
    ["Solutions personnalisées", "Conception sur mesure, du besoin au déploiement."],
  ],
};

function Services() {
  const { t, list } = usePageContent("services");

  const groups = [
    { title: t("group1_title", "Froid & Climatisation"), items: list("group1_items", fallback.g1) },
    { title: t("group2_title", "Technologies"), items: list("group2_items", fallback.g2) },
    { title: t("group3_title", "Entrepreneuriat"), items: list("group3_items", fallback.g3) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">{t("eyebrow", "Services")}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
          {t("title", "Une expertise double : le terrain technique, la puissance du digital.")}
        </h1>
      </Reveal>

      <div className="mt-16 space-y-16">
        {groups.map((g, gi) => (
          <section key={g.title}>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">{g.title}</h2>
              <div className="rule-line mt-4 w-32" />
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {g.items.map((item, i) => {
                const Icon = icons[(gi * 4 + i) % icons.length]!;
                return (
                  <Reveal key={`${item[0]}-${i}`} delay={i * 0.06}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:-translate-y-1.5 hover:border-accent/60">
                      <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 font-display text-base font-semibold">{item[0]}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item[1]}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <Reveal>
        <div className="mt-20 rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-transparent to-accent/15 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("cta_title", "Besoin d'une solution sur mesure ?")}
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            {t("cta_button", "Demander un devis")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
