import { SITE_SETTINGS } from "@/data/site-data";

export type SiteSettings = typeof SITE_SETTINGS;
export const DEFAULT_SETTINGS: SiteSettings = SITE_SETTINGS;

export function useSiteSettings(): SiteSettings {
  return SITE_SETTINGS;
}
