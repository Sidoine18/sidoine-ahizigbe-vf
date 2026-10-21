# Vérifications effectuées avant l'envoi de cette archive

## Testées et validées

- Compilation de production (`npm run build`) : réussie, sans erreur.
- Vérification TypeScript : aucune erreur de typage.
- 9 pages testées en local : accueil, à propos, projets, services, compétences, réalisations, contact, zone d'intervention, pages communes — toutes répondent correctement.
- Images, portrait et CV : les 8 fichiers sont inclus dans l'archive (dossier `public/__l5e/assets-v1/`) et s'affichent sans dépendre de Lovable.
- Configuration Vercel : `vite.config.ts` bascule automatiquement au format de sortie Vercel quand le build tourne chez Vercel (détection automatique, aucun réglage à faire). Le mécanisme a été vérifié dans le code de l'outil de build ; le format Vercel ne peut pas être généré dans l'environnement Lovable lui-même.
- Aucune donnée privée ni clé secrète dans l'archive (le fichier `.env` est exclu ; seule la clé publique Web3Forms, faite pour être visible, est présente).

## Limites connues

- **Chatbot IA sur Vercel** : la clé IA de Lovable n'est pas exportable. Le chatbot répondra « service indisponible » tant qu'une clé n'est pas configurée (voir README section 8). Sur Lovable, il fonctionne sans rien faire.
- **Formulaire de contact** : l'envoi réel n'a pas pu être testé depuis l'environnement de développement (blocage réseau). Teste-le une fois le site en ligne ; si besoin, vérifie la restriction de domaine de la clé sur web3forms.com.
- **Polices** : chargées depuis Google Fonts, une connexion Internet est nécessaire pour les voir.
- L'image de partage social (og:image) n'est pas incluse : les réseaux sociaux afficheront une capture automatique du site.
