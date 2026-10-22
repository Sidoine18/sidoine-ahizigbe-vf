import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/motion-primitives";
import { GraduationCap, Rocket, Target, HeartHandshake, Compass, Users, Award } from "lucide-react";
import { usePageContent } from "@/hooks/use-page-content";

const URL = "https://sidoineahizigbe.online/a-propos";

export const Route = createFileRoute("/a-propos")({
  component: About,
  head: () => ({
    meta: [
      { title: "À propos de Sidoine Ahizigbe — Technicien froid & climatisation à Abomey" },
      {
        name: "description",
        content:
          "Parcours, vision et valeurs de Sidoine Ahizigbe : étudiant en Froid & Climatisation à l’UNSTIM, basé à Abomey, fondateur de KONFORTECH BÉNIN et engagé dans le numérique.",
      },
      {
        name: "keywords",
        content:
          "Sidoine Ahizigbe, technicien froid climatisation Bénin, Abomey, Zou, KONFORTECH BÉNIN, entrepreneur technologique béninois",
      },
      { name: "author", content: "Sidoine Ahizigbe" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BJ-ZO" },
      { name: "geo.placename", content: "Abomey, Zou, Bénin" },
      { property: "og:title", content: "À propos — Sidoine Ahizigbe" },
      {
        property: "og:description",
        content:
          "Le parcours d'un jeune technicien et entrepreneur béninois qui transforme ses idées en innovations concrètes.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Sidoine Ahizigbe" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "À propos — Sidoine Ahizigbe" },
      {
        name: "twitter:description",
        content: "Étudiant en fin de formation en froid & climatisation et entrepreneur technologique au Bénin.",
      },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: URL,
          name: "À propos de Sidoine Ahizigbe",
          mainEntity: {
            "@type": "Person",
            name: "Sidoine Ahizigbe",
            jobTitle: "Étudiant en fin de formation en Froid & Climatisation",
            worksFor: { "@type": "Organization", name: "KONFORTECH BÉNIN" },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abomey",
              addressRegion: "Zou",
              addressCountry: "BJ",
            },
            url: "https://sidoineahizigbe.online",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sidoineahizigbe.online" },
            { "@type": "ListItem", position: 2, name: "À propos", item: URL },
          ],
        }),
      },
    ],
  }),
});

const timelineIcons = [GraduationCap, Compass, Rocket, Target];

const fallbackTimeline = [
  ["Formation", "Étudiant en fin de formation en Froid & Climatisation", "Thermodynamique, froid & climatisation, maintenance industrielle : les fondations techniques."],
  ["Premières expériences", "Terrain et maintenance industrielle", "Interventions sur installations frigorifiques, climatisation et réseaux électriques."],
  ["Création", "KONFORTECH BÉNIN & projets digitaux", "Naissance d'une entreprise hybride : expertise technique et solutions numériques."],
  ["Vision future", "Industrialiser l'innovation africaine", "Des solutions IoT et énergétiques accessibles, conçues au Bénin pour toute la sous-région."],
];

const fallbackValues = [
  ["Rigueur", "Chaque installation, chaque ligne de code répond à une exigence de fiabilité."],
  ["Innovation utile", "La technologie n'a de sens que si elle résout un problème réel."],
  ["Transmission", "Former, partager et faire grandir les talents autour de moi."],
  ["Engagement", "Des délais tenus, une transparence totale avec chaque client."],
];

function About() {
  const { t, list } = usePageContent("a-propos");
  const timeline = list("timeline", fallbackTimeline);
  const values = list("values", fallbackValues);
  const portrait = t("portrait_image", "") || "/images/sidoine.jpg";

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-10">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">{t("eyebrow", "À propos")}</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          {t(
            "title",
            "Le parcours d'un jeune technicien et entrepreneur béninois qui transforme ses idées en innovations concrètes.",
          )}
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <img
            src={portrait}
            alt="Portrait de Sidoine Ahizigbe, étudiant en fin de formation en froid et climatisation à Abomey"
            className="glass-card aspect-[4/5] w-full rounded-3xl object-cover object-top p-1.5"
          />
        </Reveal>
        <Reveal delay={0.1} className="space-y-4 text-muted-foreground">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {t("story_title", "Mon histoire")}
          </h2>
          <p>
            {t(
              "story_p1",
              "Né et formé au Bénin, j'ai grandi avec la conviction que les défis techniques de notre continent appellent des réponses conçues localement.",
            )}
          </p>
          <p>
            {t(
              "story_p2",
              "En parallèle, j'ai appris à coder. La combinaison de l'énergie et du digital permet de créer des solutions inédites.",
            )}
          </p>
          <h2 className="pt-4 font-display text-2xl font-semibold text-foreground">
            {t("vision_title", "Ma vision")}
          </h2>
          <p>
            {t(
              "vision_text",
              "Faire de KONFORTECH BÉNIN une référence de l'ingénierie technique intelligente en Afrique de l'Ouest.",
            )}
          </p>
          <h2 className="pt-4 font-display text-2xl font-semibold text-foreground">
            {t("ambitions_title", "Mes ambitions")}
          </h2>
          <p>
            {t(
              "ambitions_text",
              "Déployer des solutions IoT énergétiques à l'échelle régionale et former une nouvelle génération de techniciens.",
            )}
          </p>
        </Reveal>
      </div>

      <section className="mt-24">
        <Reveal>
          <h2 className="text-3xl font-bold">{t("timeline_title", "Mon parcours")}</h2>
        </Reveal>
        <div className="relative mt-10 space-y-6 border-l border-border pl-6 sm:pl-10">
          {timeline.map((row, i) => {
            const Icon = timelineIcons[i % timelineIcons.length]!;
            return (
              <Reveal key={`${row[0]}-${i}`} delay={i * 0.08}>
                <div className="group relative rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
                  <span className="absolute -left-[calc(1.5rem+9px)] top-8 grid size-[18px] place-items-center rounded-full bg-primary shadow-[0_0_18px_var(--glow)] sm:-left-[calc(2.5rem+9px)]" />
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-accent" />
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{row[0]}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{row[1]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{row[2]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="flex items-center gap-3 text-3xl font-bold"><Users className="size-7 text-primary" /> Engagements</h2>
        <div className="mt-8 grid gap-x-8 sm:grid-cols-2">{list("engagements").map((e) => <div key={e[1]} className="border-t border-border py-5"><p className="text-xs text-accent">{e[0]}</p><h3 className="mt-2 font-semibold">{e[1]}</h3><p className="mt-2 text-sm text-muted-foreground">{e[2]}</p></div>)}</div>
      </section>

      <section className="mt-24">
        <h2 className="flex items-center gap-3 text-3xl font-bold"><Award className="size-7 text-accent" /> Certificats & formations</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">{list("certifications").map((c, i) => <div key={`${c[1]}-${i}`} className="rounded-lg border border-border p-4"><p className="text-xs text-primary">{c[0]}</p><p className="mt-1 text-sm">{c[1]}</p></div>)}</div>
      </section>

      <section className="mt-24">
        <Reveal>
          <h2 className="flex items-center gap-3 text-3xl font-bold">
            <HeartHandshake className="size-7 text-primary" /> {t("values_title", "Mes valeurs")}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={`${v[0]}-${i}`} delay={i * 0.07}>
              <div className="glass-card h-full rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold">{v[0]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v[1]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
