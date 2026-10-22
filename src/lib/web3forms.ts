// Web3Forms : clé publique destinée au navigateur (protégez-la côté Web3Forms : domaine autorisé).
export const WEB3FORMS_ACCESS_KEY = "da996ef4-7556-4b11-877e-eb3c651b5073";
const ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormsPayload = {
  subject: string;
  from_name?: string;
  email?: string;
  message?: string;
  /** Champ piège anti-robot : doit rester vide. */
  botcheck?: string;
  [key: string]: string | undefined;
};

export async function submitToWeb3Forms(payload: Web3FormsPayload): Promise<void> {
  if (payload.botcheck) return; // robot : on ignore silencieusement
  const { botcheck: _b, ...rest } = payload;
  // FormData = requête "simple" (pas de pré-vérification CORS).
  const body = new FormData();
  body.append("access_key", WEB3FORMS_ACCESS_KEY);
  for (const [k, v] of Object.entries(rest)) if (v != null) body.append(k, v);
  const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body });
  const result = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!res.ok || !result.success) {
    throw new Error(result.message || "Échec de l'envoi du formulaire.");
  }
}
