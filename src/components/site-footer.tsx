import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle, Facebook, Instagram, Music2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";


export const CONTACT = {
  phone: "+229 01 95 49 83 59",
  phoneRaw: "+2290195498359",
  whatsapp: "https://wa.me/2290195498359",
  email: "sidoineah964@gmail.com",
  linkedin: "https://www.linkedin.com/in/sidoine-ahizigbe",
  github: "https://github.com/sidoine-ahizigbe",
  location: "Abomey, Zou — Bénin",
};

export function SiteFooter() {
  const s = useSiteSettings();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="font-display text-xl font-semibold">SIDOINE AHIZIGBE</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Étudiant en fin de formation en froid & climatisation, entrepreneur technologique et
              fondateur de KONFORTECH BÉNIN. Solutions techniques et digitales, basées au Bénin.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { href: s.whatsapp, icon: MessageCircle, label: "WhatsApp" },
                { href: s.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: s.github, icon: Github, label: "GitHub" },
                { href: s.facebook, icon: Facebook, label: "Facebook" },
                { href: s.instagram, icon: Instagram, label: "Instagram" },
                { href: s.tiktok, icon: Music2, label: "TikTok" },
                { href: `mailto:${s.email}`, icon: Mail, label: "Email" },
              ]
                .filter((l) => Boolean(l.href))
                .map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-semibold">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(
                [
                  { to: "/a-propos", label: "À propos" },
                  { to: "/projets", label: "Projets" },
                  { to: "/services", label: "Services" },
                  { to: "/competences", label: "Compétences" },
                  { to: "/realisations", label: "Réalisations" },
                  { to: "/zone-intervention", label: "Zone d'intervention (Zou)" },
                  { to: "/contact", label: "Contact" },


                ] as const
              ).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <a href={`tel:${s.phone_raw}`}>{s.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${s.email}`}>{s.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {s.location}
              </li>
            </ul>
          </div>
        </div>




        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Sidoine Ahizigbe — site personnel.</p>
          <p>Froid & Climatisation • Technologies • Innovation</p>

        </div>
      </div>
    </footer>
  );
}
