# Site personnel de Sidoine Ahizigbe

Site vitrine personnel : présentation, projets, services, compétences, réalisations GitHub, contact et assistant IA.

- **Technologies** : TanStack Start (React 19), TypeScript, Tailwind CSS v4, Vite, Nitro.
- **Aucune base de données** : tout le contenu est dans des fichiers texte faciles à modifier.
- **Formulaire de contact** : Web3Forms (gratuit, les messages arrivent par email).
- **Chatbot IA** : fonctionne sur Lovable ; sur Vercel il faut une clé d'IA (voir plus bas).

---

## 1. Installer les outils (une seule fois)

1. **Node.js** (version 22 ou plus) : télécharge sur <https://nodejs.org> et installe avec les options par défaut.
2. **Visual Studio Code** : <https://code.visualstudio.com>.
3. Ouvre VS Code → `Fichier > Ouvrir le dossier` → choisis le dossier de ce projet.
4. Ouvre le terminal intégré de VS Code : menu `Terminal > Nouveau terminal`.

## 2. Installer les dépendances

Dans le terminal de VS Code, tape :

```bash
npm install
```

Attends la fin (quelques minutes la première fois). Un dossier `node_modules` apparaît : c'est normal, ne le supprime pas.

## 3. Lancer le site sur ton ordinateur

```bash
npm run dev
```

Ouvre ensuite <http://localhost:5173> dans ton navigateur. Le site se recharge tout seul à chaque modification. Pour arrêter : `Ctrl + C` dans le terminal.

## 4. Modifier les textes du site (le plus important)

**Presque tout le contenu est dans un seul fichier : `src/data/site-data.ts`.**

Ouvre-le dans VS Code. Il contient 4 grandes zones :

### a) `SITE_SETTINGS` — tes informations générales

```ts
"full_name": "Sidoine Ahizigbe",
"phone": "+229 01 95 49 83 59",
"email": "sidoineah964@gmail.com",
"facebook": "https://www.facebook.com/...",
```

Pour changer une information : modifie le texte **entre les guillemets**, puis enregistre (`Ctrl + S`). Ne touche ni aux guillemets, ni aux virgules, ni au texte avant les deux-points.

### b) `PAGE_CONTENT` — les textes de chaque page

Chaque page a un bloc : `"accueil"`, `"services"`, `"competences"`, `"a-propos"`, `"contact"`.

Les listes utilisent deux symboles spéciaux :

- `|` sépare les colonnes (exemple : `Titre|Description`).
- `\n` (barre oblique inverse + n) passe à la ligne suivante **à l'intérieur** du texte.

Exemple — les statistiques de la page d'accueil :

```ts
"stats": "7|Projets et explorations\n6|Engagements en 2026",
```

affiche deux cartes : « 7 — Projets et explorations » et « 6 — Engagements en 2026 ».

### c) `PROJECTS` — tes projets (page Projets)

Chaque projet est un bloc entre accolades `{ ... }`. Pour en ajouter un, copie un bloc existant, colle-le après le dernier, ajoute une virgule entre les deux, puis change les textes :

```ts
{
  id: "mon-nouveau-projet",
  title: "Nom du projet",
  category: "Technologie",
  year: "2026",
  status: "En cours",
  summary: "Phrase courte visible sur la carte.",
  description: "Description complète.",
  tags: ["Web", "IoT"],
  image_url: "/images/mon-projet.jpg",
  url: "https://lien-du-projet.com"
},
```

- `image_url` : chemin de l'image (voir section 5). Laisse `""` si tu n'as pas d'image.
- `url` : lien externe facultatif. Supprime la ligne si le projet n'a pas de lien.

### d) `GITHUB_REALISATIONS` — les captures de tes dépôts GitHub (page Réalisations)

Un exemple est déjà en place. Pour ajouter une capture :

1. Fais une capture d'écran de ton dépôt GitHub.
2. Place le fichier dans le dossier `public/images/` (crée-le s'il n'existe pas), par exemple `public/images/mon-depot.png`.
3. Dans `src/data/site-data.ts`, copie le bloc existant dans `GITHUB_REALISATIONS` et adapte :

```ts
{
  title: "mon-depot",
  description: "Courte description du dépôt.",
  repositoryUrl: "https://github.com/Sidoine18/mon-depot",
  imageUrl: "/images/mon-depot.png",
  imageAlt: "Capture du dépôt mon-depot sur GitHub.",
},
```

(Pour l'exemple fourni, l'image est importée en haut du fichier ; pour tes ajouts, le simple chemin `"/images/..."` suffit.)

## 5. Ajouter ou remplacer des images

1. Copie ton image dans le dossier `public/images/` (crée le dossier s'il n'existe pas).
2. Référence-la avec un chemin qui commence par `/images/`, par exemple `"/images/ma-photo.jpg"`.
3. Formats conseillés : `.jpg` pour les photos, `.png` pour les captures d'écran. Évite les fichiers de plus de 1 Mo.

Le portrait de la page À propos et la photo de la page d'accueil se changent ainsi : remplace la valeur de `"portrait_image"` (bloc `"a-propos"`) ou `"hero_image"` (bloc `"accueil"`) dans `src/data/site-data.ts`.

Ton CV (PDF) est dans `public/__l5e/assets-v1/.../CV-Sidoine-Ahizigbe.pdf`. Pour le remplacer, mets ton nouveau PDF dans `public/images/CV.pdf` et change la valeur de `"cv_url"` (bloc `"accueil"`) en `"/images/CV.pdf"`.

## 6. Modifier les communes du Zou (pages locales)

Les 9 pages « commune » sont générées depuis `src/lib/zou.ts`. Chaque commune a un nom, des quartiers et une description. Même règle : ne modifie que les textes entre guillemets.

## 7. Le formulaire de contact (Web3Forms)

Le formulaire envoie les messages sur ton email via Web3Forms (gratuit). La clé est dans `src/lib/web3forms.ts` :

```ts
export const WEB3FORMS_ACCESS_KEY = "da996ef4-...";
```

C'est une clé **publique** (normale qu'elle soit visible). Conseil : connecte-toi sur <https://web3forms.com> et restreins la clé à ton nom de domaine pour éviter les abus.

## 8. Le chatbot IA

Le chatbot (`src/routes/api/chat.ts`) utilise la passerelle IA de Lovable.

- **Sur Lovable** : il fonctionne sans rien configurer.
- **Sur Vercel** : la clé Lovable n'est pas exportable. Deux options :
  1. Désactiver le chatbot : supprime le composant dans `src/routes/__root.tsx` (la ligne `<ChatWidget />`).
  2. Le faire fonctionner avec une clé OpenAI : crée un compte sur <https://platform.openai.com>, génère une clé, ajoute-la dans Vercel (`Settings > Environment Variables`) sous le nom `LOVABLE_API_KEY`, et remplace dans `src/lib/ai-gateway.server.ts` la `baseURL` par `https://api.openai.com/v1` et le modèle dans `src/routes/api/chat.ts` par `openai/gpt-4o-mini` → utilise simplement `"gpt-4o-mini"`.

Les tarifs et le comportement du chatbot se modifient dans le texte `SYSTEM_PROMPT` de `src/routes/api/chat.ts`.

## 9. Mettre en ligne sur Vercel (gratuit)

### Première mise en ligne

1. Crée un compte sur <https://github.com> puis crée un **dépôt** (bouton `New`, donne-lui un nom, laisse-le public ou privé).
2. Envoie le code sur GitHub. Dans le terminal de VS Code :

```bash
git init
git add .
git commit -m "Mon site"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/TON-DEPOT.git
git push -u origin main
```

(Remplace `TON-PSEUDO/TON-DEPOT` par les tiens. Si `git` n'est pas installé : <https://git-scm.com>.)

3. Crée un compte sur <https://vercel.com> (choisis « Continue with GitHub »).
4. Sur Vercel : `Add New > Project` → sélectionne ton dépôt → clique **Deploy**. Ne change aucun réglage : Vercel détecte tout automatiquement (la configuration du projet bascule toute seule au format Vercel grâce à `vite.config.ts`).
5. Après 2-3 minutes, ton site est en ligne sur une adresse `https://ton-projet.vercel.app`.

### Après chaque modification

```bash
git add .
git commit -m "Description de ma modification"
git push
```

Vercel republie le site automatiquement à chaque `push`.

### Ton propre nom de domaine (facultatif)

Dans Vercel : `Settings > Domains` → ajoute ton domaine et suis les instructions affichées.

**Important après un changement de domaine** : remplace `https://sidoineahizigbe.lovable.app` par ta nouvelle adresse dans les fichiers de `src/routes/` (recherche `sidoineahizigbe.lovable.app` dans VS Code avec `Ctrl + Maj + F`, puis remplace tout). Cela met à jour le référencement (Google) et le sitemap.

## 10. Compiler pour la production (vérifier avant de publier)

```bash
npm run build
```

Si la commande se termine sans erreur rouge, le site est prêt. Pour voir le résultat en local :

```bash
npm run preview
```

## 11. Référencement (Google et IA)

Déjà en place, rien à faire :

- `sitemap.xml` et `robots.txt` générés automatiquement.
- Données structurées (fiche Google) sur chaque page.
- `public/llms.txt` : présentation lisible par les IA (ChatGPT, Perplexity…).
- Pages dédiées aux 9 communes du Zou.

Après la mise en ligne, inscris ton site sur <https://search.google.com/search-console> pour suivre ta position dans Google.

## 12. Dépannage

| Problème | Solution |
|---|---|
| `npm : commande introuvable` | Node.js n'est pas installé (ou rouvre le terminal après l'installation). |
| Erreur après une modification de `site-data.ts` | Vérifie guillemets, virgules et accolades autour de ta modification. Annule avec `Ctrl + Z` si besoin. |
| Le port 5173 est occupé | Ferme l'autre terminal qui fait tourner le site, ou tape `npm run dev -- --port 5174`. |
| Une image ne s'affiche pas | Vérifie que le fichier est bien dans `public/images/` et que le chemin commence par `/images/` (respecte les majuscules/minuscules du nom de fichier). |
| Le formulaire de contact n'envoie pas | Vérifie ta connexion Internet et que la clé Web3Forms n'est pas restreinte à un autre domaine. |

## Structure du projet (pour repérage)

```text
public/                 Images, fichiers statiques, robots.txt, llms.txt
src/
  data/site-data.ts     ★ Tous les textes, projets et réalisations (fichier principal)
  lib/zou.ts            Communes du Zou
  lib/web3forms.ts      Clé du formulaire de contact
  routes/               Les pages (index, a-propos, projets, services, ...)
  routes/api/chat.ts    Le chatbot IA et ses tarifs
  components/           En-tête, pied de page, animations, chat
  styles.css            Couleurs et style général
vite.config.ts          Configuration technique (dont le réglage Vercel)
```
