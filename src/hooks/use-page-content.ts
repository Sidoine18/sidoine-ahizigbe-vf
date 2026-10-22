import { useMemo } from "react";
import { PAGE_CONTENT } from "@/data/site-data";

/** Parse a "list" value: one item per line, fields separated by "|". */
export function parseList(value: string): string[][] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => part.trim()));
}

export function usePageContent(page: string) {
  return useMemo(() => {
    const map = PAGE_CONTENT[page] ?? {};
    const t = (key: string, fallback = "") => {
      const v = map[key];
      return v && v.trim() ? v : fallback;
    };
    const list = (key: string, fallback: string[][] = []) => {
      const v = map[key];
      if (!v || !v.trim()) return fallback;
      const parsed = parseList(v);
      return parsed.length ? parsed : fallback;
    };
    return { t, list };
  }, [page]);
}
