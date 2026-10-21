import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/projets", label: "Projets" },
  { to: "/services", label: "Services" },
  { to: "/competences", label: "Compétences" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/zone-intervention", label: "Zone Zou" },
  { to: "/contact", label: "Contact" },

] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-full border border-border bg-background/70 px-4 py-2.5 backdrop-blur-xl sm:px-5">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg bg-primary/15 font-display text-sm font-bold text-primary">
            SA
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            Sidoine <span className="text-muted-foreground">Ahizigbe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-full px-3 py-1.5 text-sm transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Collaborer
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-3xl border border-border bg-background/95 p-3 backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
