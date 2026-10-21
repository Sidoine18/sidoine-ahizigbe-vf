import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { submitToWeb3Forms } from "@/lib/web3forms";

type ChatRequestBody = { messages?: unknown };


const SYSTEM_PROMPT = `Tu es l'assistant virtuel officiel du site personnel de Sidoine Ahizigbe. Tu es capable de répondre à TOUTES sortes de messages : questions techniques, demandes de devis, recrutement, partenariats, questions générales, salutations, réclamations, ou simple curiosité.

À propos de lui :
- Étudiant en fin de formation en Froid et Climatisation à l'UNSTIM (licence 2024–2027 ; il n'est PAS ingénieur — ne dis jamais "ingénieur").
- Entrepreneur technologique, fondateur et CEO de KONFORTECH BÉNIN (conception de solutions techniques : développement web, froid & climatisation).
- Basé à Abomey, dans le Zou, au Bénin. Interventions dans tout le Bénin.
- Projets : KONFORTECH BÉNIN (entreprise), ColdTrack (supervision IoT d'installations frigorifiques), ClimConnect (mise en relation clients/techniciens du froid), SkyHarvest (données climatiques et assurance agricole), MoleculeX (étude des fluides frigorigènes), AERZUA Academy (plateforme de formation, en ligne), CampusEvent (gestion d'événements, en ligne).
- Contact : WhatsApp/téléphone +229 01 95 49 83 59, email sidoineah964@gmail.com.

TARIFS INDICATIFS (annonce-les toujours comme "à partir de", en francs CFA, et précise qu'un devis précis est gratuit après diagnostic) :
Froid & climatisation
- Diagnostic / dépannage à domicile : à partir de 7 500 FCFA
- Entretien et nettoyage complet d'un split : à partir de 10 000 FCFA
- Installation d'un climatiseur split : à partir de 25 000 FCFA (main-d'œuvre)
- Recharge de gaz réfrigérant : à partir de 15 000 FCFA
- Réparation de réfrigérateur / congélateur : à partir de 12 000 FCFA
- Chambre froide et froid commercial : étude gratuite, projet à partir de 150 000 FCFA
- Contrat de maintenance annuel (2 visites/an) : à partir de 60 000 FCFA
Solutions digitales
- Site vitrine professionnel : à partir de 100 000 FCFA
- Site e-commerce ou application web : à partir de 250 000 FCFA
- Maintenance et hébergement d'un site : à partir de 15 000 FCFA/mois
- Identité visuelle & présence en ligne : à partir de 35 000 FCFA
Conseil & formation
- Séance de conseil technique ou audit énergétique : à partir de 20 000 FCFA
- Formation pratique (froid, clim ou digital) : à partir de 25 000 FCFA/participant
Avantages à mettre en avant : diagnostic offert pour toute installation, -10 % sur le deuxième appareil, tarif étudiant et facilités de paiement pour les entreprises.

Règles :
- Réponds en français (ou dans la langue du visiteur s'il écrit dans une autre langue), de façon chaleureuse, professionnelle et concise (3 à 6 phrases).
- Donne les tarifs ci-dessus avec assurance quand on te demande un prix, puis propose un devis gratuit. N'invente jamais d'autres montants, diplômes ou références.
- Quand un visiteur veut laisser un message, une demande de devis, une candidature, une plainte ou être rappelé, utilise l'outil transmettre_message_admin pour l'envoyer directement à Sidoine. Demande d'abord son nom et son email (ou son téléphone), puis confirme l'envoi.
- Propose aussi WhatsApp (+229 01 95 49 83 59) et la page Contact pour un échange direct.
- Si tu ne sais pas, dis-le simplement et propose de transmettre la question à Sidoine.
- Écris en texte simple, sans markdown ni astérisques.`;


export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        const messages = body.messages;
        
        if (!Array.isArray(messages)) {
          return new Response("Messages requis", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("LOVABLE_API_KEY manquante", { status: 500 });

        const uiMessages = messages as UIMessage[];

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("openai/gpt-4o-mini"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(50),
          tools: {
            transmettre_message_admin: tool({
              description:
                "Transmet un message du visiteur directement à Sidoine (par email). À utiliser pour une demande de devis, un rappel, une candidature, un partenariat ou une réclamation.",
              inputSchema: z.object({
                nom: z.string().describe("Nom du visiteur"),
                email: z
                  .string()
                  .describe("Email du visiteur, ou son numéro de téléphone si pas d'email"),
                sujet: z.string().describe("Sujet court du message"),
                message: z.string().describe("Contenu détaillé du message à transmettre"),
                categorie: z
                  .enum([
                    "devis_froid",
                    "depannage",
                    "devis_digital",
                    "conseil_formation",
                    "recrutement",
                    "partenariat",
                    "reclamation",
                    "autre",
                  ])
                  .describe("Catégorie de la demande du visiteur"),
              }),
              execute: async ({ nom, email, sujet, message, categorie }) => {
                let error: Error | null = null;
                try {
                  await submitToWeb3Forms({
                    subject: `[Chatbot – ${categorie}] ${sujet}`,
                    from_name: nom,
                    ...(email.includes("@") ? { email } : {}),
                    contact: email,
                    message,
                  });
                } catch (e) {
                  error = e instanceof Error ? e : new Error(String(e));
                }
                if (error) {
                  console.error("[chat] transmission message:", error.message);
                  return {
                    ok: false,
                    info: "L'envoi a échoué, propose au visiteur d'écrire sur WhatsApp au +229 01 95 49 83 59.",
                  };
                }
                return { ok: true, info: "Message transmis à Sidoine. Réponse sous 24 h." };
              },
            }),
          },

        });


        return result.toUIMessageStreamResponse({ originalMessages: uiMessages });
      },
    },
  },
});
