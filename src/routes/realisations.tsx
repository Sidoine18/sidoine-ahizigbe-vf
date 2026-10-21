import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { GITHUB_REALISATIONS } from "@/data/site-data";

const URL = "https://sidoineahizigbe.online/realisations";
const TITLE = "Réalisations GitHub — Sidoine Ahizigbe";
const DESCRIPTION = "Découvrez les dépôts GitHub de Sidoine Ahizigbe à travers leurs captures d’écran et leur code source.";

export const Route = createFileRoute("/realisations")({
  component: Realisations,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: TITLE,
        description: DESCRIPTION,
        url: URL,
        author: { "@type": "Person", name: "Sidoine Ahizigbe" },
      }),
    }],
  }),
});

function Realisations() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">Réalisations</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Mes dépôts GitHub</h1>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {GITHUB_REALISATIONS.map((project) => (
          <Reveal key={project.repositoryUrl}>
            <article className="overflow-hidden rounded-lg border border-border bg-surface/60">
              <a href={project.imageUrl} target="_blank" rel="noreferrer" aria-label={`Voir la capture de ${project.title}`}>
                <img src={project.imageUrl} alt={project.imageAlt} width={1280} height={1835} className="aspect-[16/11] w-full object-cover object-top" />
              </a>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="flex min-w-0 items-center gap-2 break-all font-display text-xl font-semibold"><Github className="size-5 shrink-0 text-primary" />{project.title}</h2>
                  {project.example && <span className="shrink-0 text-xs text-accent">Exemple</span>}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
                <Button asChild variant="outline" className="mt-5">
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Voir le dépôt <ExternalLink /></a>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
