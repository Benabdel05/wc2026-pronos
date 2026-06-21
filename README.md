# ⚽ Pronos — Coupe du Monde 2026

Application de pronostics entre amis pour la CdM 2026, avec authentification pseudo/mot de passe, tableau de bord en temps réel et verrouillage définitif des pronostics.

## Fonctionnalités

- **Authentification** : inscription + connexion pseudo / mot de passe
- **Tableau de bord** : classement de tous les joueurs avec points, exacts, bons résultats, barre de progression
- **104 matchs** : groupes + phases finales, filtrables par journée ou "À pronostiquer"
- **Verrouillage permanent** : pronostic définitif dès la validation, impossible de modifier
- **Mode Admin** : saisie des scores réels (login : `admin` / mot de passe : `admin2026`)
- **Calcul automatique** : score exact = 3 pts, bon résultat = 1 pt

---

## 🚀 Déploiement sur GitHub Pages (gratuit)

### Étape 1 — Configurer le nom du dépôt

Ouvre `vite.config.js` et change la ligne :

```js
base: "/wc2026-pronos/",
```

…par le nom exact de TON dépôt GitHub. Par exemple, si ton repo s'appelle `mes-pronos-2026` :

```js
base: "/mes-pronos-2026/",
```

### Étape 2 — Créer le dépôt GitHub

1. Va sur [github.com/new](https://github.com/new)
2. Donne le même nom que dans `vite.config.js`
3. Clique **Create repository**

### Étape 3 — Envoyer le code

Dans un terminal, à la racine du projet :

```bash
git init
git add .
git commit -m "Pronos CdM 2026 v2"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO/NOM_DU_REPO.git
git push -u origin main
```

### Étape 4 — Activer GitHub Pages

1. Dans ton dépôt → **Settings** → **Pages**
2. Source → **GitHub Actions**

Le fichier `.github/workflows/deploy.yml` construit et publie le site automatiquement à chaque `git push`.

🌐 Ton site sera visible sur :
`https://TON_PSEUDO.github.io/NOM_DU_REPO/`

---

## 💻 Tester en local

```bash
npm install
npm run dev
```

---

## 🔐 Connexion admin

| Login  | Mot de passe |
|--------|-------------|
| admin  | admin2026   |

> Pour changer le mot de passe admin, modifie la constante `ADMIN_PWD` dans `src/App.jsx`.

---

## ⚠️ Données

Les pronostics et scores sont sauvegardés dans le `localStorage` du navigateur.
**Tous les participants doivent utiliser le même navigateur/appareil** (ou un serveur Firebase/Supabase pour une vraie synchronisation multi-appareils).

---

## Structure

```
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   └── App.jsx          ← toute la logique
├── public/
│   └── favicon.svg
└── .github/
    └── workflows/
        └── deploy.yml
```
