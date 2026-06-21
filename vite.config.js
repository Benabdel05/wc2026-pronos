import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ IMPORTANT : remplacez "wc2026-pronos" par le nom EXACT de votre dépôt GitHub.
// Exemple : si votre repo est https://github.com/monpseudo/mes-pronos
// → base: "/mes-pronos/"
export default defineConfig({
  plugins: [react()],
  base: "/wc2026-pronos/",
});
