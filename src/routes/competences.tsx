import { createFileRoute } from "@tanstack/react-router";
import { Languages, Check } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { usePageContent } from "@/hooks/use-page-content";

const URL = "https://sidoineahizigbe.online/competences";

export const Route = createFileRoute("/competences")({
  component: Skills,
  head: () => ({
    meta: [
      { title: "Compétences de Sidoine Ahizigbe — Froid, développement web & business" },
      {
        name: "description",
        content:
          "Compétences de Sidoine Ahizigbe : froid et climatisation, thermodynamique, énergie solaire, maintenance industrielle, React, JavaScript, IoT et gestion de projets au Bénin.",
      },
      {
        name: "keywords",
        content:
          "compétences technicien froid Bénin, thermodynamique, énergie solaire, React, JavaScript, IoT, gestion de projets, Abomey",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BJ-ZO" },
      { property: "og:title", content: "Compétences de Sidoine Ahizigbe" },
      {
        property: "og:description",
        content: "Un profil hybride entre froid & climatisation, développement logiciel et entrepreneuriat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Sidoine Ahizigbe" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Compétences de Sidoine Ahizigbe" },
      {
        name: "twitter:description",
        content: "Froid & climatisation, développement web et pilotage de projets.",
      },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sidoineahizigbe.online" },
            { "@type": "ListItem", position: 2, name: "Compétences", item: URL },
          ],
        }),
      },
    ],
  }),
});

function Skills() {
  const { t, list } = usePageContent("competences");

  const groups = [
    { title: t("group1_title", "Énergie"), skills: list("group1_skills") },
    { title: t("group2_title", "Technologie"), skills: list("group2_skills") },
    { title: t("group3_title", "Business"), skills: list("group3_skills") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">{t("eyebrow", "Compétences")}</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          {t("title", "Un profil hybride, entre machine et code.")}
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {groups.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 0.1}>
            <div className="glass-card h-full rounded-lg p-6">
              <h2 className="font-display text-lg font-semibold">{g.title}</h2>
              <div className="mt-6 space-y-5">
                {g.skills.map((s, i) => (
                  <div key={`${s[0]}-${i}`} className="border-t border-border pt-4">
                    <h3 className="flex items-start gap-2 text-sm font-medium"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{s[0]}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <section className="mt-16 border-t border-border pt-8">
        <h2 className="flex items-center gap-3 text-2xl font-semibold"><Languages className="size-6 text-accent" /> Langues</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">{list("languages").map(row => <div key={row[0]}><h3 className="font-medium">{row[0]}</h3><p className="mt-2 text-sm text-muted-foreground">{row[1]}</p></div>)}</div>
      </section>
    </div>
  );
}
