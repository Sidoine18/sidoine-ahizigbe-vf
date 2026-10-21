<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public content is static and maintained in src/data/site-data.ts; do not introduce database reads for editing removed admin pages.
- GitHub realization entries are defined in GITHUB_REALISATIONS with asset-pointer URLs, so screenshots can be added without changing page rendering.
- Projects share one static typed catalog for filtering and display; use optional external URLs only for confirmed destinations and never fabricate screenshots for concepts.
