import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Snowflake, Leaf, FlaskConical, CalendarDays, Layers, Github } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { PROJECTS, SITE_SETTINGS } from "@/data/site-data";

const TITLE = "Projets de Sidoine Ahizigbe — Froid, IoT, web & innovation au Bénin";
const DESCRIPTION = "KONFORTECH BÉNIN, ColdTrack, ClimConnect, SkyHarvest, MoleculeX, AERZUA Academy et CampusEvent : projets, prototypes et explorations de Sidoine Ahizigbe.";
export const Route = createFileRoute("/projets")({
  component: Projects,
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://sidoineahizigbe.online/projets" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://sidoineahizigbe.online/projets" }],
  }),
});
const categories = ["Tous", "Technologie", "IoT", "Innovation", "Éducation", "Entrepreneuriat"];
const projectIcons = { skyharvest: Leaf, moleculex: FlaskConical, campusevent: CalendarDays };

function Projects() {
  const [category, setCategory] = useState("Tous");
  const featured = PROJECTS[0];
  const visible = PROJECTS.filter((p) => category === "Tous" ? p.id !== featured?.id : p.category === category);
  return (
    <main className="mx-auto max-w-6xl px-4 pt-32 pb-10">
      <Reveal>
        <div className="flex items-center gap-3 text-sm text-accent"><span className="h-px w-8 bg-accent" /> PROJETS & EXPLORATIONS</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Mes projets.<br /><span className="text-primary">Du terrain au numérique.</span></h1>
        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <p className="max-w-xl text-muted-foreground">Froid, plateformes web, objets connectés : des solutions en ligne, des prototypes en développement et des pistes de recherche.</p>
          <Button variant="outline" asChild><a href={SITE_SETTINGS.github} target="_blank" rel="noopener noreferrer"><Github /> Mon GitHub <ArrowUpRight /></a></Button>
        </div>
      </Reveal>

      {category === "Tous" && featured && <Reveal className="mt-12">
        <article className="grid overflow-hidden border-y border-border py-8 md:grid-cols-2 md:gap-10">
          <div className="relative"><img src={featured.image_url || "/images/konfortech.jpg"} alt="KONFORTECH BÉNIN — solutions techniques et numériques" width={1024} height={640} className="aspect-[8/5] w-full rounded-lg object-cover" /></div>
          <div className="flex flex-col justify-center pt-7 md:pt-0">
            <p className="text-xs uppercase tracking-widest text-accent">01 / Entrepreneuriat</p>
            <h2 className="mt-4 text-3xl font-semibold">{featured.title}</h2>
            <p className="mt-3 text-sm text-primary">Fondateur & CEO · Depuis août 2026</p>
            <p className="mt-5 text-muted-foreground">{featured.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{featured.tags.map(tag => <span key={tag} className="rounded border border-border px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>)}</div>
            <Button variant="link" className="mt-6 self-start px-0" asChild><Link to="/contact">Parlons d’un projet <ArrowRight /></Link></Button>
          </div>
        </article>
      </Reveal>}

      <section className="mt-12" aria-label="Catalogue de projets">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-5">
          <div className="flex flex-wrap gap-2" aria-label="Filtrer les projets">{categories.map(c => <Button key={c} variant={c === category ? "default" : "ghost"} size="sm" aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</Button>)}</div>
          <p role="status" className="text-xs text-muted-foreground">{visible.length} projets</p>
        </div>
        <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const Icon = projectIcons[p.id as keyof typeof projectIcons] ?? (p.category === "IoT" ? Snowflake : Layers);
            return <Reveal key={p.id} className="h-full">
              <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
                {p.image_url ? <img src={p.image_url} alt={p.title} width={1024} height={640} loading="lazy" className="aspect-[8/5] w-full object-cover" /> : <div className="flex aspect-[8/5] items-center justify-between border-b border-border bg-secondary/40 px-7" aria-hidden="true"><Icon className="size-14 text-primary" strokeWidth={1} /><span className="max-w-36 text-right font-display text-xl text-muted-foreground">{p.title}</span></div>}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-widest text-accent">{p.category}</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold">{p.title}</h2>
                  <p className="mt-3 text-xs text-primary">{p.status}{"role" in p && p.role ? ` · ${p.role}` : ""}</p>
                  <p className="mt-4 text-sm font-medium">{p.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{p.tags.map(tag => <span key={tag} className="rounded border border-border px-2 py-1 text-xs text-muted-foreground">{tag}</span>)}</div>
                  <div className="mt-auto pt-6">{"url" in p && p.url ? <Button variant="link" className="px-0" asChild><a href={p.url} target="_blank" rel="noopener noreferrer">Voir le site <ArrowUpRight /></a></Button> : <Button variant="link" className="px-0" asChild><Link to="/contact">Échanger sur ce projet <ArrowUpRight /></Link></Button>}</div>
                </div>
              </article>
            </Reveal>;
          })}
        </div>
      </section>
      <section className="mt-16 flex flex-col justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center">
        <div><h2 className="text-2xl font-semibold">Une idée à construire ensemble ?</h2><p className="mt-2 text-muted-foreground">Technique, numérique ou recherche : échangeons.</p></div>
        <Button asChild size="lg"><Link to="/contact">Me contacter <ArrowUpRight /></Link></Button>
      </section>
    </main>
  );
}
