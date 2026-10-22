import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/motion-primitives";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { usePageContent } from "@/hooks/use-page-content";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Github, Send, Facebook, Instagram, Music2 } from "lucide-react";

const URL = "https://sidoineahizigbe.online/contact";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contacter Sidoine Ahizigbe — Devis froid, clim & digital au Bénin" },
      {
        name: "description",
        content:
          "Contactez Sidoine Ahizigbe, fondateur de KONFORTECH BÉNIN à Abomey (Zou) : devis froid & climatisation, projets digitaux, partenariats. WhatsApp +229 01 95 49 83 59.",
      },
      {
        name: "keywords",
        content:
          "contact Sidoine Ahizigbe, devis climatisation Bénin, chambre froide Abomey, KONFORTECH BÉNIN contact, WhatsApp technicien froid",
      },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "BJ-ZO" },
      { name: "geo.placename", content: "Abomey, Zou, Bénin" },
      { property: "og:title", content: "Contact — Sidoine Ahizigbe" },
      { property: "og:description", content: "Parlons de votre projet technique ou digital au Bénin." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Sidoine Ahizigbe" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Sidoine Ahizigbe" },
      { name: "twitter:description", content: "Devis, partenariats et projets : réponse sous 24 h." },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: URL,
          mainEntity: {
            "@type": "Organization",
            name: "KONFORTECH BÉNIN",
            founder: { "@type": "Person", name: "Sidoine Ahizigbe" },
            email: "sidoineah964@gmail.com",
            telephone: "+2290195498359",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abomey",
              addressRegion: "Zou",
              addressCountry: "BJ",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+2290195498359",
              contactType: "customer service",
              availableLanguage: ["fr"],
            },
          },
        }),
      },
    ],
  }),
});


const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  subject: z.string().trim().min(2, "Sujet requis").max(150),
  message: z.string().trim().min(10, "Décrivez votre projet (10 caractères min.)").max(1500),
});

function Contact() {
  const CONTACT = useSiteSettings();
  const { t } = usePageContent("contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const d = parsed.data;
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    try {
      await submitToWeb3Forms({
        subject: `Nouveau message du site : ${d.subject}`,
        from_name: d.name,
        email: d.email,
        message: d.message,
        botcheck,
      });
      toast.success("Message envoyé ! Sidoine vous répond sous 24 h.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Envoi impossible. Vérifiez votre connexion ou passez par WhatsApp.");
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };


  const field = "mt-2 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">{t("eyebrow", "Contact")}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
          {t("title", "Parlons de votre projet.")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {t("intro", "Devis technique, plateforme digitale, partenariat ou recrutement : je réponds sous 24 h.")}
        </p>

      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form onSubmit={submit} noValidate aria-busy={sending} className="glass-card rounded-3xl p-6 sm:p-8">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              checked={!!botcheck}
              onChange={(e) => setBotcheck(e.target.checked ? "1" : "")}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm">Nom</label>
                <input id="name" value={form.name} onChange={set("name")} className={field} placeholder="Votre nom" />
                {errors['name'] && <p className="mt-1 text-xs text-destructive">{errors['name']}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm">Email</label>
                <input id="email" value={form.email} onChange={set("email")} className={field} placeholder="vous@email.com" />
                {errors['email'] && <p className="mt-1 text-xs text-destructive">{errors['email']}</p>}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="subject" className="text-sm">Sujet</label>
              <input id="subject" value={form.subject} onChange={set("subject")} className={field} placeholder="Installation, développement, partenariat…" />
              {errors['subject'] && <p className="mt-1 text-xs text-destructive">{errors['subject']}</p>}
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="text-sm">Description du projet</label>
              <textarea id="message" rows={6} value={form.message} onChange={set("message")} className={field} placeholder="Décrivez votre besoin…" />
              {errors['message'] && <p className="mt-1 text-xs text-destructive">{errors['message']}</p>}
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] glow-ring disabled:opacity-60"
            >
              {sending ? "Envoi…" : "Envoyer le message"} <Send className="size-4" />
            </button>

          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-display text-lg font-semibold">Coordonnées</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a href={`tel:${CONTACT.phone_raw}`}>{CONTACT.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" /> {CONTACT.location}
              </li>
            </ul>
            <div className="mt-6 grid gap-2">
              {[
                { href: CONTACT.whatsapp, icon: MessageCircle, label: "WhatsApp" },
                { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: CONTACT.github, icon: Github, label: "GitHub" },
                { href: CONTACT.facebook, icon: Facebook, label: "Facebook" },
                { href: CONTACT.instagram, icon: Instagram, label: "Instagram" },
                { href: CONTACT.tiktok, icon: Music2, label: "TikTok" },
              ]
                .filter((l) => Boolean(l.href))
                .map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" /> {label}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Localisation — Abomey, Zou — Bénin"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.30%2C6.31%2C2.50%2C6.45&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
