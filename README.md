# 🏆 Pronos — Coupe du Monde 2026

Application de pronostics entre amis pour la Coupe du Monde 2026, avec verrouillage
définitif des pronostics dès leur validation.

## Fonctionnalités

- Pronostic sur les 104 matchs de la compétition (groupes + phases finales)
- **Verrouillage permanent** : une fois un pronostic validé, il ne peut plus jamais
  être modifié, même avant le coup d'envoi du match
- Classement automatique (score exact = 3 pts, bon résultat = 1 pt)
- Export / import des pronostics en `.json` pour les partager entre joueurs
- Sauvegarde automatique sur l'appareil (les pronostics restent même après
  fermeture du navigateur)

## 🚀 Mettre le site en ligne sur GitHub Pages (gratuit)

### Étape 1 — Créer le dépôt GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Donnez un nom à votre dépôt, par exemple `wc2026-pronos`
3. Cliquez sur **Create repository**

> ⚠️ Si vous choisissez un nom différent de `wc2026-pronos`, ouvrez le fichier
> `vite.config.js` et changez la ligne `base: "/wc2026-pronos/"` pour
> `base: "/VOTRE-NOM-DE-REPO/"`.

### Étape 2 — Envoyer le code sur GitHub

Dans un terminal, à la racine de ce projet :

```bash
git init
git add .
git commit -m "Premier envoi de l'application Pronos CDM 2026"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/wc2026-pronos.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages

1. Sur la page de votre dépôt GitHub, allez dans **Settings** (Paramètres)
2. Dans le menu de gauche, cliquez sur **Pages**
3. Sous "Build and deployment", choisissez la source **GitHub Actions**

C'est tout ! Le fichier `.github/workflows/deploy.yml` inclus dans ce projet
construit et publie automatiquement le site à chaque envoi (`git push`) sur la
branche `main`.

Après quelques minutes, votre site sera visible à l'adresse :
`https://VOTRE-NOM-UTILISATEUR.github.io/wc2026-pronos/`

## 💻 Tester en local avant de publier

```bash
npm install
npm run dev
```

Puis ouvrez l'adresse affichée dans le terminal (en général `http://localhost:5173`).

## 📁 Structure du projet

```
├── index.html              # page HTML racine
├── vite.config.js          # configuration de build (chemin GitHub Pages)
├── src/
│   ├── main.jsx             # point d'entrée React
│   ├── App.jsx               # application complète (matchs, classement, etc.)
│   └── OverthinkerCaricature.jsx  # illustration de l'écran d'accueil
├── public/
│   └── favicon.svg
└── .github/workflows/deploy.yml   # déploiement automatique
```

## ℹ️ À propos des données

Chaque joueur garde ses pronostics enregistrés **uniquement sur son propre
appareil** (stockage local du navigateur). Il n'y a pas de serveur central :
pour comparer les pronostics entre joueurs, chacun exporte son fichier
`.json` (onglet "Échange") et l'envoie aux autres, qui l'importent ensuite.
