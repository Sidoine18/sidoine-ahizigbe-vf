import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Snowflake, Code2, Cpu, Sun, Zap, Quote, FileDown } from "lucide-react";
import { Reveal, Counter } from "@/components/motion-primitives";
import { EnergyCore } from "@/components/energy-core";
import { usePageContent } from "@/hooks/use-page-content";
import { ZOU_COMMUNES } from "@/lib/zou";


const TITLE = "Sidoine Ahizigbe — Étudiant en fin de formation en Froid & Climatisation à Abomey, Bénin";
const DESCRIPTION =
  "Sidoine Ahizigbe, CEO de KONFORTECH BÉNIN à Abomey (Zou) : froid & climatisation, maintenance, énergie solaire, développement web et solutions IoT pour particuliers et entreprises au Bénin.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Sidoine Ahizigbe, KONFORTECH BÉNIN, technicien froid et climatisation Bénin, climatisation Abomey, chambre froide Zou, développement web Bénin, solutions IoT, énergie solaire Bénin",
      },
      { name: "author", content: "Sidoine Ahizigbe" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BJ-ZO" },
      { name: "geo.placename", content: "Abomey, Zou, Bénin" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_BJ" },
      { property: "og:url", content: "https://sidoineahizigbe.online/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://sidoineahizigbe.online/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://sidoineahizigbe.online/#person",
              name: "Sidoine Ahizigbe",
              url: "https://sidoineahizigbe.online/",
              jobTitle: "Étudiant en fin de formation en Froid et Climatisation, fondateur de KONFORTECH BÉNIN",
              telephone: "+2290195498359",
              email: "sidoineah964@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Abomey",
                addressRegion: "Zou",
                addressCountry: "BJ",
              },
              knowsAbout: [
                "Froid industriel",
                "Climatisation",
                "Maintenance industrielle",
                "Énergie solaire",
                "Développement web",
                "IoT",
              ],
              sameAs: [
                "https://www.linkedin.com/in/sidoine-ahizigbe",
                "https://github.com/sidoine-ahizigbe",
              ],
            },
            {
              "@type": ["Organization", "LocalBusiness", "HVACBusiness"],
              "@id": "https://sidoineahizigbe.online/#konfortech",
              name: "KONFORTECH BÉNIN",
              founder: { "@id": "https://sidoineahizigbe.online/#person" },
              description:
                "Conception de solutions techniques : développement web, froid & climatisation pour particuliers et entreprises au Bénin.",
              telephone: "+2290195498359",
              email: "sidoineah964@gmail.com",
              priceRange: "₣₣",
              openingHours: "Mo-Sa 08:00-19:00",
              areaServed: [
                { "@type": "AdministrativeArea", name: "Zou, Bénin" },
                ...ZOU_COMMUNES.map((c) => ({ "@type": "City", name: c.name })),
                { "@type": "Country", name: "Bénin" },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Abomey",
                addressRegion: "Zou",
                addressCountry: "BJ",
              },
              geo: { "@type": "GeoCoordinates", latitude: 7.1826, longitude: 1.9912 },
            },
            {
              "@type": "FAQPage",
              "@id": "https://sidoineahizigbe.online/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Qui est le meilleur spécialiste du froid et de la climatisation dans le Zou au Bénin ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sidoine Ahizigbe, étudiant en fin de formation en froid & climatisation et fondateur de KONFORTECH BÉNIN, basé à Abomey. Il intervient dans les 9 communes du Zou : Abomey, Bohicon, Agbangnizoun, Covè, Djidja, Ouinhi, Za-Kpota, Zangnanado et Zogbodomey. Contact : +229 01 95 49 83 59.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quels services propose Sidoine Ahizigbe ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Installation, entretien et dépannage de climatiseurs, chambres froides et froid commercial ou industriel, énergie solaire, ainsi que développement web, applications mobiles et solutions IoT.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quels sont les tarifs ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Diagnostic à partir de 7 500 FCFA, installation d'un climatiseur split à partir de 25 000 FCFA, site web professionnel à partir de 100 000 FCFA. Devis gratuit avant intervention.",
                  },
                },
              ],
            },

            {
              "@type": "WebSite",
              url: "https://sidoineahizigbe.online/",
              name: "Sidoine Ahizigbe",
              inLanguage: "fr",
              publisher: { "@id": "https://sidoineahizigbe.online/#person" },
            },
          ],
        }),
      },
    ],
  }),
});

const pillarIcons = [Snowflake, Code2, Cpu, Sun];

const statsFallback = [
  ["7", "Projets"],
  ["6", "Engagements 2026"],
  ["2027", "Fin de licence"],
  ["3", "Langues"],
];

const pillarsFallback = [
  ["Froid & Climatisation", "Installation, maintenance et optimisation de systèmes frigorifiques et climatiques."],
  ["Développement web", "Plateformes rapides, sûres et pensées pour l'usage réel des entreprises béninoises."],
  ["Solutions IoT", "Capteurs, supervision temps réel et alertes pour des équipements sous contrôle."],
  ["Énergie solaire", "Dimensionnement et déploiement d'installations photovoltaïques."],
];

function Home() {
  const { t, list } = usePageContent("accueil");
  const stats = list("stats", statsFallback);
  const pillars = list("pillars", pillarsFallback);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="hero-aura absolute inset-0 -z-10" />
        <div className="grid-mesh absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs text-muted-foreground"
            >
              <Zap className="size-3.5 text-accent" /> {t("hero_badge", "CEO — KONFORTECH BÉNIN")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance text-5xl font-bold leading-[0.95] sm:text-7xl"
            >
              <span className="text-gradient">Sidoine Ahizigbe</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-5 font-display text-lg text-foreground/85 sm:text-xl"
            >
              {t(
                "hero_subtitle",
                "Étudiant en fin de formation en Froid & Climatisation • Entrepreneur technologique • Créateur de solutions innovantes",
              )}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8 }}
              className="mt-5 max-w-xl text-muted-foreground"
            >
              {t(
                "hero_quote",
                "« Je conçois des solutions qui connectent l'énergie, la technologie et l'innovation pour répondre aux défis de demain. »",
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/projets"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] glow-ring"
              >
                {t("hero_cta_primary", "Découvrir mes projets")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {t("hero_cta_secondary", "Collaborer avec moi")}
              </Link>
              {t("cv_url", "") && (
                <a
                  href={t("cv_url", "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  <FileDown className="size-4" /> Télécharger mon CV
                </a>
              )}
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 opacity-70">
              <EnergyCore />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card mx-auto max-w-sm overflow-hidden rounded-[2rem] p-2"
            >
              <img
                src={"/images/sidoine.jpg"}
                alt="Sidoine Ahizigbe, étudiant en fin de formation en froid et climatisation à Abomey, fondateur de KONFORTECH BÉNIN"
                className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-top"
                width={640}
                height={800}
              />
              <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
                <span>Étudiant en fin de formation — Froid & Climatisation</span>
                <span className="text-accent">Abomey, Bénin</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const raw = s[0] ?? "";
            const value = parseInt(raw.replace(/\D/g, ""), 10) || 0;
            const suffix = raw.replace(/[0-9]/g, "");
            return (
              <Reveal key={`${s[1]}-${i}`} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-1">
                  <p className="font-display text-4xl font-bold text-gradient">
                    <Counter to={value} suffix={suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{s[1]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-accent">
            {t("pillars_eyebrow", "Expertises")}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            {t("pillars_title", "L'énergie et le digital, réunis dans une même exigence technique.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i % pillarIcons.length]!;
            return (
              <Reveal key={`${p[0]}-${i}`} delay={i * 0.07}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:-translate-y-1.5 hover:border-primary/50">
                  <div className="absolute inset-x-0 top-0 rule-line opacity-0 transition-opacity group-hover:opacity-100" />
                  <Icon className="size-6 text-primary" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{p[0]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p[1]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Reveal>
          <div className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <Quote className="size-8 text-accent" />
            <p className="mt-5 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">
              {t(
                "quote_text",
                "Le parcours d'un jeune technicien et entrepreneur béninois qui transforme ses idées en innovations concrètes.",
              )}
            </p>
            <Link to="/a-propos" className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
              Découvrir mon histoire <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Reveal>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-transparent to-accent/15 p-8 text-center sm:p-14">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t("cta_title", "Construisons le futur, ensemble.")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t("cta_text", "Un projet technique, une plateforme digitale ou un partenariat ? Discutons-en dès aujourd'hui.")}
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              Me contacter <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
