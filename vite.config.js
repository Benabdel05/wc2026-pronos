import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT : remplacez "wc2026-pronos" ci-dessous par le nom EXACT
// de votre dépôt GitHub si vous le renommez, sinon le site ne s'affichera
// pas correctement une fois publié sur GitHub Pages.
// Exemple : si votre repo est https://github.com/votrenom/pronos-cdm
// alors base doit être "/pronos-cdm/"
export default defineConfig({
  plugins: [react()],
  base: "/wc2026-pronos/",
});
