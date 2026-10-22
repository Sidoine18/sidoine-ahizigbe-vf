/**
 * Validation et génération du balisage Review / AggregateRating (schema.org)
 * à partir des témoignages stockés dans `page_content`
 * (une ligne par avis : auteur | texte | note | AAAA-MM-JJ).
 */

export type ReviewIssue = {
  line: number;
  level: "error" | "warning";
  field: "auteur" | "texte" | "note" | "date" | "format";
  message: string;
};

export type ParsedReview = {
  line: number;
  author: string;
  text: string;
  rating: number;
  date: string;
};

export type ReviewAudit = {
  reviews: ParsedReview[];
  issues: ReviewIssue[];
  errorCount: number;
  warningCount: number;
  averageRating: number;
  jsonLd: Record<string, unknown> | null;
};

export const REVIEW_FORMAT_HINT = "Auteur | Témoignage | Note (1-5) | Date (AAAA-MM-JJ)";

export function parseRating(value?: string): number {
  const n = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(n) && n > 0 && n <= 5 ? n : 5;
}

export function formatReviewDate(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Analyse le bloc texte des témoignages et remonte toutes les erreurs JSON-LD. */
export function auditReviews(raw: string | string[][]): ReviewAudit {
  const rows: string[][] = Array.isArray(raw)
    ? raw
    : raw
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => l.split("|").map((p) => p.trim()));

  const issues: ReviewIssue[] = [];
  const reviews: ParsedReview[] = [];
  const today = new Date();

  rows.forEach((parts, i) => {
    const line = i + 1;
    const [author = "", text = "", note = "", date = ""] = parts;

    if (parts.length < 4) {
      issues.push({
        line,
        level: parts.length < 2 ? "error" : "warning",
        field: "format",
        message: `Champs manquants (${parts.length}/4). Format attendu : ${REVIEW_FORMAT_HINT}.`,
      });
    }

    if (!author) {
      issues.push({ line, level: "error", field: "auteur", message: "Nom de l'auteur manquant (author.name requis)." });
    } else if (author.length < 2) {
      issues.push({ line, level: "warning", field: "auteur", message: "Nom d'auteur très court : peu crédible pour Google." });
    }

    if (!text) {
      issues.push({ line, level: "error", field: "texte", message: "Témoignage vide (reviewBody requis)." });
    } else if (text.length < 25) {
      issues.push({ line, level: "warning", field: "texte", message: "Témoignage trop court (< 25 caractères) : rich snippet peu probable." });
    }

    const rawNote = String(note).replace(",", ".");
    if (!note) {
      issues.push({ line, level: "warning", field: "note", message: "Note absente : 5/5 appliqué par défaut." });
    } else if (!Number.isFinite(Number(rawNote))) {
      issues.push({ line, level: "error", field: "note", message: `Note « ${note} » non numérique (ratingValue invalide).` });
    } else if (Number(rawNote) <= 0 || Number(rawNote) > 5) {
      issues.push({ line, level: "error", field: "note", message: `Note ${note} hors de l'échelle 1-5.` });
    }

    if (!date) {
      issues.push({ line, level: "warning", field: "date", message: "Date absente : datePublished recommandé par Google." });
    } else if (!ISO_DATE.test(date)) {
      issues.push({ line, level: "error", field: "date", message: `Date « ${date} » invalide : utilisez AAAA-MM-JJ.` });
    } else if (Number.isNaN(new Date(date).getTime())) {
      issues.push({ line, level: "error", field: "date", message: `Date « ${date} » inexistante au calendrier.` });
    } else if (new Date(date) > today) {
      issues.push({ line, level: "warning", field: "date", message: "Date dans le futur : Google peut ignorer l'avis." });
    }

    if (author && text) {
      reviews.push({ line, author, text, rating: parseRating(note), date: ISO_DATE.test(date) ? date : "" });
    }
  });

  const duplicates = new Map<string, number[]>();
  reviews.forEach((r) => {
    const key = `${r.author.toLowerCase()}::${r.text.toLowerCase()}`;
    duplicates.set(key, [...(duplicates.get(key) ?? []), r.line]);
  });
  duplicates.forEach((lines) => {
    if (lines.length > 1) {
      lines.slice(1).forEach((line) =>
        issues.push({ line, level: "warning", field: "format", message: "Avis en double : Google pénalise les avis dupliqués." }),
      );
    }
  });

  if (rows.length === 0) {
    issues.push({ line: 0, level: "error", field: "format", message: "Aucun témoignage : le balisage Review n'est pas généré." });
  }

  const averageRating = reviews.length
    ? Number((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1))
    : 0;

  const jsonLd = reviews.length
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "KONFORTECH BÉNIN — Sidoine Ahizigbe",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: averageRating,
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewBody: r.text,
          ...(r.date ? { datePublished: r.date } : {}),
          reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        })),
      }
    : null;

  return {
    reviews,
    issues,
    errorCount: issues.filter((i) => i.level === "error").length,
    warningCount: issues.filter((i) => i.level === "warning").length,
    averageRating,
    jsonLd,
  };
}
