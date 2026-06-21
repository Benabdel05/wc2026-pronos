import { useState, useEffect, useMemo } from "react";

// ─────────────────────────────────────────────
// DONNÉES : 104 matchs CdM 2026
// ─────────────────────────────────────────────
const MATCHES = [
  // ── Groupes ──
  {id:1,round:"Journée 1",date:"2026-06-11",time:"13:00",t1:"Mexique",t2:"Afrique du Sud",group:"Groupe A",city:"Mexico City",s1:2,s2:0},
  {id:2,round:"Journée 1",date:"2026-06-11",time:"20:00",t1:"Corée du Sud",t2:"Tchéquie",group:"Groupe A",city:"Guadalajara",s1:2,s2:1},
  {id:3,round:"Journée 2",date:"2026-06-12",time:"15:00",t1:"Canada",t2:"Bosnie-Herzégovine",group:"Groupe B",city:"Toronto",s1:1,s2:1},
  {id:4,round:"Journée 2",date:"2026-06-12",time:"18:00",t1:"États-Unis",t2:"Paraguay",group:"Groupe D",city:"Los Angeles",s1:4,s2:1},
  {id:5,round:"Journée 3",date:"2026-06-13",time:"12:00",t1:"Qatar",t2:"Suisse",group:"Groupe B",city:"Santa Clara",s1:1,s2:1},
  {id:6,round:"Journée 3",date:"2026-06-13",time:"18:00",t1:"Brésil",t2:"Maroc",group:"Groupe C",city:"New York/NJ",s1:1,s2:1},
  {id:7,round:"Journée 3",date:"2026-06-13",time:"21:00",t1:"Haïti",t2:"Écosse",group:"Groupe C",city:"Boston",s1:0,s2:1},
  {id:8,round:"Journée 3",date:"2026-06-13",time:"21:00",t1:"Australie",t2:"Turquie",group:"Groupe D",city:"Vancouver",s1:2,s2:0},
  {id:9,round:"Journée 4",date:"2026-06-14",time:"12:00",t1:"Allemagne",t2:"Curaçao",group:"Groupe E",city:"Houston",s1:7,s2:1},
  {id:10,round:"Journée 4",date:"2026-06-14",time:"15:00",t1:"Pays-Bas",t2:"Japon",group:"Groupe F",city:"Dallas",s1:2,s2:2},
  {id:11,round:"Journée 4",date:"2026-06-14",time:"19:00",t1:"Côte d'Ivoire",t2:"Équateur",group:"Groupe E",city:"Philadelphia",s1:1,s2:0},
  {id:12,round:"Journée 4",date:"2026-06-14",time:"20:00",t1:"Suède",t2:"Tunisie",group:"Groupe F",city:"Monterrey",s1:5,s2:1},
  {id:13,round:"Journée 5",date:"2026-06-15",time:"12:00",t1:"Belgique",t2:"Égypte",group:"Groupe G",city:"Seattle",s1:1,s2:1},
  {id:14,round:"Journée 5",date:"2026-06-15",time:"12:00",t1:"Espagne",t2:"Cap-Vert",group:"Groupe H",city:"Atlanta",s1:0,s2:0},
  {id:15,round:"Journée 5",date:"2026-06-15",time:"18:00",t1:"Iran",t2:"Nouvelle-Zélande",group:"Groupe G",city:"Los Angeles",s1:2,s2:2},
  {id:16,round:"Journée 5",date:"2026-06-15",time:"18:00",t1:"Arabie Saoudite",t2:"Uruguay",group:"Groupe H",city:"Miami",s1:1,s2:1},
  {id:17,round:"Journée 6",date:"2026-06-16",time:"15:00",t1:"France",t2:"Sénégal",group:"Groupe I",city:"New York/NJ",s1:3,s2:1},
  {id:18,round:"Journée 6",date:"2026-06-16",time:"18:00",t1:"Irak",t2:"Norvège",group:"Groupe I",city:"Boston",s1:1,s2:4},
  {id:19,round:"Journée 6",date:"2026-06-16",time:"20:00",t1:"Argentine",t2:"Algérie",group:"Groupe J",city:"Kansas City",s1:3,s2:0},
  {id:20,round:"Journée 6",date:"2026-06-16",time:"21:00",t1:"Autriche",t2:"Jordanie",group:"Groupe J",city:"Santa Clara",s1:3,s2:1},
  {id:21,round:"Journée 7",date:"2026-06-17",time:"12:00",t1:"Portugal",t2:"RD Congo",group:"Groupe K",city:"Houston",s1:1,s2:1},
  {id:22,round:"Journée 7",date:"2026-06-17",time:"15:00",t1:"Angleterre",t2:"Croatie",group:"Groupe L",city:"Dallas",s1:4,s2:2},
  {id:23,round:"Journée 7",date:"2026-06-17",time:"19:00",t1:"Ghana",t2:"Panama",group:"Groupe L",city:"Toronto",s1:1,s2:0},
  {id:24,round:"Journée 7",date:"2026-06-17",time:"20:00",t1:"Ouzbékistan",t2:"Colombie",group:"Groupe K",city:"Mexico City",s1:1,s2:3},
  {id:25,round:"Journée 8",date:"2026-06-18",time:"12:00",t1:"Tchéquie",t2:"Afrique du Sud",group:"Groupe A",city:"Atlanta",s1:1,s2:1},
  {id:26,round:"Journée 8",date:"2026-06-18",time:"12:00",t1:"Suisse",t2:"Bosnie-Herzégovine",group:"Groupe B",city:"Los Angeles",s1:4,s2:1},
  {id:27,round:"Journée 8",date:"2026-06-18",time:"15:00",t1:"Canada",t2:"Qatar",group:"Groupe B",city:"Vancouver",s1:6,s2:0},
  {id:28,round:"Journée 8",date:"2026-06-18",time:"19:00",t1:"Mexique",t2:"Corée du Sud",group:"Groupe A",city:"Guadalajara",s1:1,s2:0},
  {id:29,round:"Journée 9",date:"2026-06-19",time:"12:00",t1:"États-Unis",t2:"Australie",group:"Groupe D",city:"Seattle",s1:2,s2:0},
  {id:30,round:"Journée 9",date:"2026-06-19",time:"18:00",t1:"Écosse",t2:"Maroc",group:"Groupe C",city:"Boston",s1:0,s2:1},
  {id:31,round:"Journée 9",date:"2026-06-19",time:"20:00",t1:"Turquie",t2:"Paraguay",group:"Groupe D",city:"Santa Clara",s1:0,s2:1},
  {id:32,round:"Journée 9",date:"2026-06-19",time:"20:30",t1:"Brésil",t2:"Haïti",group:"Groupe C",city:"Philadelphia",s1:3,s2:0},
  {id:33,round:"Journée 10",date:"2026-06-20",time:"12:00",t1:"Pays-Bas",t2:"Suède",group:"Groupe F",city:"Houston",s1:5,s2:1},
  {id:34,round:"Journée 10",date:"2026-06-20",time:"16:00",t1:"Allemagne",t2:"Côte d'Ivoire",group:"Groupe E",city:"Toronto",s1:2,s2:1},
  {id:35,round:"Journée 10",date:"2026-06-20",time:"19:00",t1:"Équateur",t2:"Curaçao",group:"Groupe E",city:"Kansas City",s1:0,s2:0},
  {id:36,round:"Journée 10",date:"2026-06-20",time:"22:00",t1:"Tunisie",t2:"Japon",group:"Groupe F",city:"Monterrey",s1:0,s2:4},
  {id:37,round:"Journée 11",date:"2026-06-21",time:"12:00",t1:"Belgique",t2:"Iran",group:"Groupe G",city:"Los Angeles",s1:0,s2:0},
  {id:38,round:"Journée 11",date:"2026-06-21",time:"12:00",t1:"Espagne",t2:"Arabie Saoudite",group:"Groupe H",city:"Atlanta",s1:4,s2:0},
  {id:39,round:"Journée 11",date:"2026-06-21",time:"18:00",t1:"Nouvelle-Zélande",t2:"Égypte",group:"Groupe G",city:"Vancouver",s1:null,s2:null},
  {id:40,round:"Journée 11",date:"2026-06-21",time:"18:00",t1:"Uruguay",t2:"Cap-Vert",group:"Groupe H",city:"Miami",s1:null,s2:null},
  {id:41,round:"Journée 12",date:"2026-06-22",time:"12:00",t1:"Argentine",t2:"Autriche",group:"Groupe J",city:"Dallas",s1:null,s2:null},
  {id:42,round:"Journée 12",date:"2026-06-22",time:"17:00",t1:"France",t2:"Irak",group:"Groupe I",city:"Philadelphia",s1:null,s2:null},
  {id:43,round:"Journée 12",date:"2026-06-22",time:"20:00",t1:"Norvège",t2:"Sénégal",group:"Groupe I",city:"New York/NJ",s1:null,s2:null},
  {id:44,round:"Journée 12",date:"2026-06-22",time:"20:00",t1:"Jordanie",t2:"Algérie",group:"Groupe J",city:"Santa Clara",s1:null,s2:null},
  {id:45,round:"Journée 13",date:"2026-06-23",time:"12:00",t1:"Portugal",t2:"Ouzbékistan",group:"Groupe K",city:"Houston",s1:null,s2:null},
  {id:46,round:"Journée 13",date:"2026-06-23",time:"16:00",t1:"Angleterre",t2:"Ghana",group:"Groupe L",city:"Boston",s1:null,s2:null},
  {id:47,round:"Journée 13",date:"2026-06-23",time:"19:00",t1:"Panama",t2:"Croatie",group:"Groupe L",city:"Toronto",s1:null,s2:null},
  {id:48,round:"Journée 13",date:"2026-06-23",time:"20:00",t1:"Colombie",t2:"RD Congo",group:"Groupe K",city:"Guadalajara",s1:null,s2:null},
  {id:49,round:"Journée 14",date:"2026-06-24",time:"12:00",t1:"Suisse",t2:"Canada",group:"Groupe B",city:"Vancouver",s1:null,s2:null},
  {id:50,round:"Journée 14",date:"2026-06-24",time:"12:00",t1:"Bosnie-Herzégovine",t2:"Qatar",group:"Groupe B",city:"Seattle",s1:null,s2:null},
  {id:51,round:"Journée 14",date:"2026-06-24",time:"18:00",t1:"Écosse",t2:"Brésil",group:"Groupe C",city:"Miami",s1:null,s2:null},
  {id:52,round:"Journée 14",date:"2026-06-24",time:"18:00",t1:"Maroc",t2:"Haïti",group:"Groupe C",city:"Atlanta",s1:null,s2:null},
  {id:53,round:"Journée 14",date:"2026-06-24",time:"19:00",t1:"Tchéquie",t2:"Mexique",group:"Groupe A",city:"Mexico City",s1:null,s2:null},
  {id:54,round:"Journée 14",date:"2026-06-24",time:"19:00",t1:"Afrique du Sud",t2:"Corée du Sud",group:"Groupe A",city:"Monterrey",s1:null,s2:null},
  {id:55,round:"Journée 15",date:"2026-06-25",time:"16:00",t1:"Curaçao",t2:"Côte d'Ivoire",group:"Groupe E",city:"Philadelphia",s1:null,s2:null},
  {id:56,round:"Journée 15",date:"2026-06-25",time:"16:00",t1:"Équateur",t2:"Allemagne",group:"Groupe E",city:"New York/NJ",s1:null,s2:null},
  {id:57,round:"Journée 15",date:"2026-06-25",time:"18:00",t1:"Japon",t2:"Suède",group:"Groupe F",city:"Dallas",s1:null,s2:null},
  {id:58,round:"Journée 15",date:"2026-06-25",time:"18:00",t1:"Tunisie",t2:"Pays-Bas",group:"Groupe F",city:"Kansas City",s1:null,s2:null},
  {id:59,round:"Journée 15",date:"2026-06-25",time:"19:00",t1:"Turquie",t2:"États-Unis",group:"Groupe D",city:"Los Angeles",s1:null,s2:null},
  {id:60,round:"Journée 15",date:"2026-06-25",time:"19:00",t1:"Paraguay",t2:"Australie",group:"Groupe D",city:"Santa Clara",s1:null,s2:null},
  {id:61,round:"Journée 16",date:"2026-06-26",time:"15:00",t1:"Norvège",t2:"France",group:"Groupe I",city:"Boston",s1:null,s2:null},
  {id:62,round:"Journée 16",date:"2026-06-26",time:"15:00",t1:"Sénégal",t2:"Irak",group:"Groupe I",city:"Toronto",s1:null,s2:null},
  {id:63,round:"Journée 16",date:"2026-06-26",time:"18:00",t1:"Uruguay",t2:"Espagne",group:"Groupe H",city:"Guadalajara",s1:null,s2:null},
  {id:64,round:"Journée 16",date:"2026-06-26",time:"19:00",t1:"Cap-Vert",t2:"Arabie Saoudite",group:"Groupe H",city:"Houston",s1:null,s2:null},
  {id:65,round:"Journée 16",date:"2026-06-26",time:"20:00",t1:"Égypte",t2:"Iran",group:"Groupe G",city:"Seattle",s1:null,s2:null},
  {id:66,round:"Journée 16",date:"2026-06-26",time:"20:00",t1:"Nouvelle-Zélande",t2:"Belgique",group:"Groupe G",city:"Vancouver",s1:null,s2:null},
  {id:67,round:"Journée 17",date:"2026-06-27",time:"17:00",t1:"Panama",t2:"Angleterre",group:"Groupe L",city:"New York/NJ",s1:null,s2:null},
  {id:68,round:"Journée 17",date:"2026-06-27",time:"17:00",t1:"Croatie",t2:"Ghana",group:"Groupe L",city:"Philadelphia",s1:null,s2:null},
  {id:69,round:"Journée 17",date:"2026-06-27",time:"19:30",t1:"Colombie",t2:"Portugal",group:"Groupe K",city:"Miami",s1:null,s2:null},
  {id:70,round:"Journée 17",date:"2026-06-27",time:"19:30",t1:"RD Congo",t2:"Ouzbékistan",group:"Groupe K",city:"Atlanta",s1:null,s2:null},
  {id:71,round:"Journée 17",date:"2026-06-27",time:"21:00",t1:"Algérie",t2:"Autriche",group:"Groupe J",city:"Kansas City",s1:null,s2:null},
  {id:72,round:"Journée 17",date:"2026-06-27",time:"21:00",t1:"Jordanie",t2:"Argentine",group:"Groupe J",city:"Dallas",s1:null,s2:null},
  // ── Phase finale ──
  {id:73,round:"16es de finale",date:"2026-06-28",time:"12:00",t1:"2A",t2:"2B",group:"Phase finale",city:"Los Angeles",s1:null,s2:null},
  {id:74,round:"16es de finale",date:"2026-06-29",time:"12:00",t1:"1C",t2:"2F",group:"Phase finale",city:"Houston",s1:null,s2:null},
  {id:75,round:"16es de finale",date:"2026-06-29",time:"16:30",t1:"1E",t2:"3e",group:"Phase finale",city:"Boston",s1:null,s2:null},
  {id:76,round:"16es de finale",date:"2026-06-29",time:"19:00",t1:"1F",t2:"2C",group:"Phase finale",city:"Monterrey",s1:null,s2:null},
  {id:77,round:"16es de finale",date:"2026-06-30",time:"12:00",t1:"2E",t2:"2I",group:"Phase finale",city:"Dallas",s1:null,s2:null},
  {id:78,round:"16es de finale",date:"2026-06-30",time:"17:00",t1:"1I",t2:"3e",group:"Phase finale",city:"New York/NJ",s1:null,s2:null},
  {id:79,round:"16es de finale",date:"2026-06-30",time:"19:00",t1:"1A",t2:"3e",group:"Phase finale",city:"Mexico City",s1:null,s2:null},
  {id:80,round:"16es de finale",date:"2026-07-01",time:"12:00",t1:"1L",t2:"3e",group:"Phase finale",city:"Atlanta",s1:null,s2:null},
  {id:81,round:"16es de finale",date:"2026-07-01",time:"13:00",t1:"1G",t2:"3e",group:"Phase finale",city:"Seattle",s1:null,s2:null},
  {id:82,round:"16es de finale",date:"2026-07-01",time:"17:00",t1:"1D",t2:"3e",group:"Phase finale",city:"Santa Clara",s1:null,s2:null},
  {id:83,round:"16es de finale",date:"2026-07-02",time:"12:00",t1:"1H",t2:"2J",group:"Phase finale",city:"Los Angeles",s1:null,s2:null},
  {id:84,round:"16es de finale",date:"2026-07-02",time:"19:00",t1:"2K",t2:"2L",group:"Phase finale",city:"Toronto",s1:null,s2:null},
  {id:85,round:"16es de finale",date:"2026-07-02",time:"20:00",t1:"1B",t2:"3e",group:"Phase finale",city:"Vancouver",s1:null,s2:null},
  {id:86,round:"16es de finale",date:"2026-07-03",time:"13:00",t1:"2D",t2:"2G",group:"Phase finale",city:"Dallas",s1:null,s2:null},
  {id:87,round:"16es de finale",date:"2026-07-03",time:"18:00",t1:"1J",t2:"2H",group:"Phase finale",city:"Miami",s1:null,s2:null},
  {id:88,round:"16es de finale",date:"2026-07-03",time:"20:30",t1:"1K",t2:"3e",group:"Phase finale",city:"Kansas City",s1:null,s2:null},
  {id:89,round:"8es de finale",date:"2026-07-04",time:"12:00",t1:"W73",t2:"W75",group:"Phase finale",city:"Houston",s1:null,s2:null},
  {id:90,round:"8es de finale",date:"2026-07-04",time:"17:00",t1:"W74",t2:"W77",group:"Phase finale",city:"Philadelphia",s1:null,s2:null},
  {id:91,round:"8es de finale",date:"2026-07-05",time:"16:00",t1:"W76",t2:"W78",group:"Phase finale",city:"New York/NJ",s1:null,s2:null},
  {id:92,round:"8es de finale",date:"2026-07-05",time:"18:00",t1:"W79",t2:"W80",group:"Phase finale",city:"Mexico City",s1:null,s2:null},
  {id:93,round:"8es de finale",date:"2026-07-06",time:"14:00",t1:"W83",t2:"W84",group:"Phase finale",city:"Dallas",s1:null,s2:null},
  {id:94,round:"8es de finale",date:"2026-07-06",time:"17:00",t1:"W81",t2:"W82",group:"Phase finale",city:"Seattle",s1:null,s2:null},
  {id:95,round:"8es de finale",date:"2026-07-07",time:"12:00",t1:"W86",t2:"W88",group:"Phase finale",city:"Atlanta",s1:null,s2:null},
  {id:96,round:"8es de finale",date:"2026-07-07",time:"13:00",t1:"W85",t2:"W87",group:"Phase finale",city:"Vancouver",s1:null,s2:null},
  {id:97,round:"Quarts de finale",date:"2026-07-09",time:"16:00",t1:"W89",t2:"W90",group:"Phase finale",city:"Boston",s1:null,s2:null},
  {id:98,round:"Quarts de finale",date:"2026-07-10",time:"12:00",t1:"W93",t2:"W94",group:"Phase finale",city:"Los Angeles",s1:null,s2:null},
  {id:99,round:"Quarts de finale",date:"2026-07-11",time:"17:00",t1:"W91",t2:"W92",group:"Phase finale",city:"Miami",s1:null,s2:null},
  {id:100,round:"Quarts de finale",date:"2026-07-11",time:"20:00",t1:"W95",t2:"W96",group:"Phase finale",city:"Kansas City",s1:null,s2:null},
  {id:101,round:"Demi-finales",date:"2026-07-14",time:"14:00",t1:"W97",t2:"W98",group:"Phase finale",city:"Dallas",s1:null,s2:null},
  {id:102,round:"Demi-finales",date:"2026-07-15",time:"15:00",t1:"W99",t2:"W100",group:"Phase finale",city:"Atlanta",s1:null,s2:null},
  {id:103,round:"3e place",date:"2026-07-18",time:"17:00",t1:"L101",t2:"L102",group:"Phase finale",city:"Miami",s1:null,s2:null},
  {id:104,round:"Finale",date:"2026-07-19",time:"15:00",t1:"W101",t2:"W102",group:"Phase finale",city:"New York/NJ",s1:null,s2:null},
];

// ─────────────────────────────────────────────
// CLÉS STORAGE
// ─────────────────────────────────────────────
const SK = {
  USERS:   "wc2026_users_v2",       // { pseudo: hashedPwd }      – partagé
  PREDS:   "wc2026_preds_v2",       // { matchId: { pseudo: {s1,s2,locked} } } – partagé
  SCORES:  "wc2026_scores_v2",      // { matchId: {s1,s2} }       – partagé
  SESSION: "wc2026_session_v2",     // { pseudo }                  – local
};

// mot de passe admin (stocké en clair dans le code, car c'est un projet privé/local)
const ADMIN_PWD = "admin2026";

// hash simple (djb2) – pas du vrai crypto, mais suffisant pour un usage entre amis
function hashStr(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return (h >>> 0).toString(16);
}

// ─────────────────────────────────────────────
// HELPERS CALCUL POINTS
// ─────────────────────────────────────────────
function outcome(a, b) { return a === b ? "N" : a > b ? "1" : "2"; }
function pts(ps1, ps2, rs1, rs2) {
  if (ps1==null||ps2==null||rs1==null||rs2==null) return null;
  if (ps1===rs1 && ps2===rs2) return 3;
  if (outcome(ps1,ps2)===outcome(rs1,rs2)) return 1;
  return 0;
}
function fmtDate(d) {
  return new Date(d+"T00:00:00").toLocaleDateString("fr-FR",{weekday:"short",day:"2-digit",month:"short"});
}

// ─────────────────────────────────────────────
// STORAGE HELPERS (localStorage – GitHub Pages)
// ─────────────────────────────────────────────
function lsGet(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─────────────────────────────────────────────
// PALETTE & STYLE
// ─────────────────────────────────────────────
const P = {
  bg:      "#0b1120",
  surface: "#111827",
  card:    "#1a2236",
  border:  "#2d3748",
  accent:  "#3b82f6",   // bleu vif
  green:   "#22c55e",
  gold:    "#f59e0b",
  red:     "#ef4444",
  text:    "#f1f5f9",
  muted:   "#94a3b8",
  dim:     "#475569",
};

// Inline styles réutilisables
const css = {
  page:   { minHeight:"100vh", background:P.bg, color:P.text, fontFamily:"Inter,-apple-system,sans-serif", fontSize:14 },
  center: { display:"flex", alignItems:"center", justifyContent:"center" },
  card:   { background:P.card, border:`1px solid ${P.border}`, borderRadius:12 },
  input:  { width:"100%", padding:"11px 14px", background:P.surface, border:`1px solid ${P.border}`,
            borderRadius:8, color:P.text, fontSize:15, outline:"none", boxSizing:"border-box" },
  btn:    (bg="#3b82f6",col="#fff") => ({
            width:"100%", padding:"12px", background:bg, color:col,
            border:"none", borderRadius:8, fontWeight:700, fontSize:15, cursor:"pointer" }),
  badge:  (bg,col="#fff") => ({ background:bg, color:col, borderRadius:6,
            padding:"2px 8px", fontSize:11, fontWeight:700, display:"inline-block" }),
  tag:    (bg,col) => ({ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20,
            background:bg, color:col }),
};

// ─────────────────────────────────────────────
// COMPOSANT : ÉCRAN LOGIN / INSCRIPTION
// ─────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode]       = useState("login"); // login | register
  const [pseudo, setPseudo]   = useState("");
  const [pwd, setPwd]         = useState("");
  const [pwd2, setPwd2]       = useState("");
  const [error, setError]     = useState("");

  function submit() {
    setError("");
    const p = pseudo.trim();
    const users = lsGet(SK.USERS) || {};

    if (!p || !pwd) { setError("Remplis tous les champs."); return; }

    if (mode === "login") {
      // Admin
      if (p === "admin" && pwd === ADMIN_PWD) { onLogin("admin", true); return; }
      if (!users[p]) { setError("Pseudo inconnu. Inscris-toi d'abord."); return; }
      if (users[p] !== hashStr(pwd)) { setError("Mot de passe incorrect."); return; }
      onLogin(p, false);
    } else {
      if (p === "admin") { setError("Ce pseudo est réservé."); return; }
      if (p.length < 2)  { setError("Pseudo trop court (2 car. min)."); return; }
      if (pwd.length < 4){ setError("Mot de passe trop court (4 car. min)."); return; }
      if (pwd !== pwd2)  { setError("Les mots de passe ne correspondent pas."); return; }
      if (users[p])      { setError("Ce pseudo est déjà pris."); return; }
      users[p] = hashStr(pwd);
      lsSet(SK.USERS, users);
      onLogin(p, false);
    }
  }

  return (
    <div style={{ ...css.page, ...css.center, minHeight:"100vh", padding:20 }}>
      <div style={{ ...css.card, width:"100%", maxWidth:400, padding:32 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:52, marginBottom:8 }}>⚽</div>
          <div style={{ fontFamily:"Oswald, sans-serif", fontSize:26, fontWeight:700, letterSpacing:1 }}>
            PRONOS <span style={{ color:P.gold }}>2026</span>
          </div>
          <div style={{ color:P.muted, fontSize:13, marginTop:4 }}>
            Coupe du Monde · USA / Canada / Mexique
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", background:P.surface, borderRadius:8, padding:3, marginBottom:22, border:`1px solid ${P.border}` }}>
          {["login","register"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }}
              style={{ flex:1, padding:"8px", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700, fontSize:13,
                background: mode===m ? P.card : "transparent",
                color: mode===m ? P.text : P.muted,
                boxShadow: mode===m ? "0 1px 4px #0005" : "none" }}>
              {m==="login" ? "Connexion" : "Inscription"}
            </button>
          ))}
        </div>

        {/* Règles en mini */}
        <div style={{ background:P.surface, borderRadius:8, padding:"10px 14px", marginBottom:18,
                      fontSize:12, color:P.muted, lineHeight:1.9, border:`1px solid ${P.border}` }}>
          🎯 <strong style={{ color:P.gold }}>Score exact</strong> = 3 pts &nbsp;·&nbsp;
          ✓ <strong style={{ color:P.green }}>Bon résultat</strong> = 1 pt &nbsp;·&nbsp;
          🔒 Pronostic <strong style={{ color:P.text }}>définitif</strong> après validation
        </div>

        {/* Champs */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <input style={css.input} placeholder="Pseudo" value={pseudo}
            onChange={e=>setPseudo(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} autoFocus />
          <input style={css.input} placeholder="Mot de passe" type="password" value={pwd}
            onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          {mode==="register" && (
            <input style={css.input} placeholder="Confirmer le mot de passe" type="password" value={pwd2}
              onChange={e=>setPwd2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          )}
        </div>

        {error && (
          <div style={{ marginTop:12, padding:"9px 12px", background:"#450a0a", border:`1px solid ${P.red}55`,
                        borderRadius:7, fontSize:13, color:"#fca5a5" }}>
            {error}
          </div>
        )}

        <button style={{ ...css.btn(), marginTop:16 }} onClick={submit}>
          {mode==="login" ? "Se connecter →" : "Créer mon compte →"}
        </button>

        <div style={{ marginTop:14, fontSize:12, color:P.dim, textAlign:"center" }}>
          Les données sont sauvegardées dans ce navigateur.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPOSANT : TABLEAU DE BORD
// ─────────────────────────────────────────────
function Dashboard({ currentUser, preds, scores }) {
  const leaderboard = useMemo(() => {
    const players = new Set();
    Object.values(preds).forEach(byP => Object.keys(byP).forEach(p => players.add(p)));
    const stats = {};
    players.forEach(p => { stats[p] = { pts:0, exact:0, good:0, wrong:0, played:0 }; });

    MATCHES.forEach(m => {
      const rs1 = scores[m.id]?.s1 ?? m.s1;
      const rs2 = scores[m.id]?.s2 ?? m.s2;
      if (rs1==null) return;
      Object.entries(preds[m.id]||{}).forEach(([p, pred]) => {
        if (!stats[p]) stats[p] = { pts:0, exact:0, good:0, wrong:0, played:0 };
        const v = pts(pred.s1, pred.s2, rs1, rs2);
        stats[p].pts += v; stats[p].played += 1;
        if (v===3) stats[p].exact++;
        else if (v===1) stats[p].good++;
        else stats[p].wrong++;
      });
    });

    return Object.entries(stats)
      .map(([name, s]) => ({ name, ...s }))
      .sort((a,b) => b.pts - a.pts || b.exact - a.exact || b.good - a.good);
  }, [preds, scores]);

  const totalMatchs   = MATCHES.filter(m => { const rs1=scores[m.id]?.s1??m.s1; return rs1!=null; }).length;
  const totalMatchsTot = MATCHES.length;
  const myStats       = leaderboard.find(l => l.name===currentUser);
  const myRank        = leaderboard.findIndex(l => l.name===currentUser) + 1;

  const medals = ["🥇","🥈","🥉"];

  return (
    <div>
      {/* Stats perso en haut */}
      {myStats && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:20 }}>
          {[
            { label:"Mes points", val:myStats.pts, color:P.gold, icon:"⭐" },
            { label:"Rang", val:`${myRank}/${leaderboard.length}`, color:P.accent, icon:"🏅" },
            { label:"Exacts", val:myStats.exact, color:P.green, icon:"🎯" },
            { label:"Bons résultats", val:myStats.good, color:"#a78bfa", icon:"✓" },
          ].map(item => (
            <div key={item.label} style={{ ...css.card, padding:"12px 10px", textAlign:"center" }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{item.icon}</div>
              <div style={{ fontFamily:"Oswald,sans-serif", fontSize:22, fontWeight:700, color:item.color }}>{item.val}</div>
              <div style={{ fontSize:11, color:P.muted, marginTop:2, lineHeight:1.3 }}>{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Barre de progression compétition */}
      <div style={{ ...css.card, padding:"14px 16px", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:13 }}>
          <span style={{ fontWeight:700 }}>Progression de la compétition</span>
          <span style={{ color:P.muted }}>{totalMatchs} / {totalMatchsTot} matchs joués</span>
        </div>
        <div style={{ background:P.surface, borderRadius:99, height:8, overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:99, width:`${(totalMatchs/totalMatchsTot)*100}%`,
                        background:`linear-gradient(90deg, ${P.accent}, ${P.green})`, transition:"width .5s" }} />
        </div>
      </div>

      {/* Classement */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:P.muted, textTransform:"uppercase",
                      letterSpacing:1.5, marginBottom:12 }}>
          🏆 Classement général
        </div>

        {leaderboard.length === 0 && (
          <div style={{ textAlign:"center", color:P.muted, padding:"32px 0", fontSize:14 }}>
            Aucun pronostic validé pour le moment.
          </div>
        )}

        {leaderboard.map((entry, i) => {
          const isMe = entry.name === currentUser;
          const isTop3 = i < 3;
          return (
            <div key={entry.name} style={{
              ...css.card,
              padding:"14px 16px",
              marginBottom:8,
              display:"grid",
              gridTemplateColumns:"48px 1fr auto",
              alignItems:"center",
              gap:"0 12px",
              borderColor: isMe ? P.accent : P.border,
              borderWidth: isMe ? 2 : 1,
              background: isMe ? "#1a2236cc" : P.card,
            }}>
              {/* Rang */}
              <div style={{ textAlign:"center" }}>
                {isTop3
                  ? <span style={{ fontSize:24 }}>{medals[i]}</span>
                  : <span style={{ fontFamily:"Oswald,monospace", fontSize:20, color:P.dim }}>#{i+1}</span>}
              </div>

              {/* Nom + barre */}
              <div>
                <div style={{ fontWeight:800, fontSize:16, color: isMe ? P.accent : P.text }}>
                  {entry.name} {isMe && <span style={{ fontSize:12, color:P.muted }}>(moi)</span>}
                </div>
                <div style={{ marginTop:6, display:"flex", gap:6, flexWrap:"wrap" }}>
                  <span style={css.tag(P.gold+"30", P.gold)}>🎯 {entry.exact} exacts</span>
                  <span style={css.tag(P.green+"25", P.green)}>✓ {entry.good} bons</span>
                  <span style={css.tag(P.border, P.dim)}>✗ {entry.wrong} ratés</span>
                </div>
                {/* mini barre */}
                {entry.played > 0 && (
                  <div style={{ display:"flex", height:4, borderRadius:99, overflow:"hidden", marginTop:6, gap:1 }}>
                    <div style={{ flex:entry.exact, background:P.gold, minWidth:entry.exact?2:0 }} />
                    <div style={{ flex:entry.good,  background:P.green, minWidth:entry.good?2:0 }} />
                    <div style={{ flex:entry.wrong, background:P.border, minWidth:entry.wrong?2:0 }} />
                  </div>
                )}
              </div>

              {/* Points */}
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"Oswald,monospace", fontSize:32, fontWeight:700, color:P.gold, lineHeight:1 }}>
                  {entry.pts}
                </div>
                <div style={{ fontSize:11, color:P.muted }}>pts</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPOSANT : CARTE MATCH
// ─────────────────────────────────────────────
function MatchCard({ match, currentUser, preds, scores, onValidate, onSetScore, isAdmin }) {
  const [draft1, setDraft1] = useState("");
  const [draft2, setDraft2] = useState("");
  const [adminS1, setAdminS1] = useState(match.s1??match.s1);
  const [adminS2, setAdminS2] = useState(match.s2??match.s2);

  const rs1 = scores[match.id]?.s1 ?? match.s1;
  const rs2 = scores[match.id]?.s2 ?? match.s2;
  const hasResult = rs1 != null && rs2 != null;

  const myPred  = preds[match.id]?.[currentUser];
  const isLocked = myPred?.locked === true;
  const myPts   = isLocked && hasResult ? pts(myPred.s1, myPred.s2, rs1, rs2) : null;

  const others  = Object.entries(preds[match.id]||{}).filter(([p]) => p !== currentUser);

  function validate() {
    const v1 = parseInt(draft1), v2 = parseInt(draft2);
    if (isNaN(v1)||isNaN(v2)||v1<0||v2<0) return;
    onValidate(match.id, v1, v2);
  }

  const ptsBadge = myPts !== null
    ? <span style={css.tag(myPts===3?P.gold:myPts===1?P.green:P.border, myPts===3?"#0d1117":myPts===1?"#fff":P.muted)}>
        {myPts===3?"🎯 +3 pts":myPts===1?"✓ +1 pt":"✗ 0 pt"}
      </span>
    : isLocked
      ? <span style={css.tag("#1e2a40","#60a5fa")}>⏳ En attente</span>
      : null;

  const inpStyle = {
    width:40, height:40, textAlign:"center", fontSize:20, fontWeight:700,
    background:P.surface, border:`1px solid ${P.border}`, borderRadius:7,
    color:P.text, outline:"none",
  };

  return (
    <div style={{ ...css.card, marginBottom:8, overflow:"hidden" }}>
      {/* En-tête */}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 14px",
                    background:P.surface, borderBottom:`1px solid ${P.border}`, fontSize:11 }}>
        <span style={{ color:P.muted }}>{fmtDate(match.date)} · {match.time} · {match.city}</span>
        <span style={{ color:P.accent, fontWeight:600 }}>{match.group}</span>
      </div>

      <div style={{ padding:"14px 14px 12px" }}>
        {/* Équipes + résultat */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <span style={{ flex:1, fontWeight:800, fontSize:16 }}>{match.t1}</span>
          <div style={{ minWidth:70, textAlign:"center" }}>
            {hasResult
              ? <span style={{ fontFamily:"Oswald,monospace", fontSize:24, fontWeight:700, color:P.gold }}>
                  {rs1} – {rs2}
                </span>
              : <span style={{ color:P.dim, fontSize:13 }}>vs</span>}
          </div>
          <span style={{ flex:1, fontWeight:800, fontSize:16, textAlign:"right" }}>{match.t2}</span>
        </div>

        {/* Admin : saisie score */}
        {isAdmin && (
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px",
                        background:"#1a0a00", border:`1px solid ${P.gold}33`, borderRadius:8, marginBottom:10 }}>
            <span style={{ fontSize:11, color:P.gold, fontWeight:800 }}>ADMIN</span>
            <input style={{ ...inpStyle, borderColor:P.gold+"66" }} type="number" min="0" max="99"
              value={adminS1??""} onChange={e=>setAdminS1(e.target.value)} />
            <span style={{ color:P.dim }}>–</span>
            <input style={{ ...inpStyle, borderColor:P.gold+"66" }} type="number" min="0" max="99"
              value={adminS2??""} onChange={e=>setAdminS2(e.target.value)} />
            <button onClick={() => {
              const v1=parseInt(adminS1), v2=parseInt(adminS2);
              if (!isNaN(v1)&&!isNaN(v2)) onSetScore(match.id, v1, v2);
            }} style={{ padding:"6px 14px", background:P.gold, color:"#0d1117",
              border:"none", borderRadius:6, fontWeight:700, fontSize:12, cursor:"pointer" }}>
              ✓ Valider
            </button>
          </div>
        )}

        {/* Mon pronostic */}
        {!isAdmin && (
          <>
            {!isLocked && !hasResult && (
              <div>
                <div style={{ fontSize:12, color:P.muted, marginBottom:6 }}>Mon pronostic :</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <input style={inpStyle} type="number" min="0" max="99" placeholder="0"
                    value={draft1} onChange={e=>setDraft1(e.target.value)} />
                  <span style={{ color:P.dim, fontSize:18 }}>–</span>
                  <input style={inpStyle} type="number" min="0" max="99" placeholder="0"
                    value={draft2} onChange={e=>setDraft2(e.target.value)} />
                  <button onClick={validate} style={{
                    flex:1, padding:"10px", background:P.green, color:"#fff",
                    border:"none", borderRadius:7, fontWeight:700, fontSize:13, cursor:"pointer" }}>
                    🔒 Valider (définitif)
                  </button>
                </div>
              </div>
            )}

            {isLocked && (
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:P.muted }}>
                  🔒 Mon prono : <strong style={{ color:P.text }}>{myPred.s1} – {myPred.s2}</strong>
                </span>
                {ptsBadge}
              </div>
            )}

            {!isLocked && hasResult && (
              <div style={{ fontSize:12, color:P.dim, fontStyle:"italic" }}>
                Match terminé — tu n'as pas pronostiqué ce match.
              </div>
            )}
          </>
        )}

        {/* Pronostics des autres */}
        {others.length > 0 && (
          <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${P.border}` }}>
            {hasResult ? (
              <>
                <div style={{ fontSize:11, color:P.muted, marginBottom:6 }}>Pronostics des autres :</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {others.map(([p, pred]) => {
                    const v = pts(pred.s1, pred.s2, rs1, rs2);
                    return (
                      <span key={p} style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        background:P.surface, border:`1px solid ${v===3?P.gold:v===1?P.green:P.border}`,
                        borderRadius:6, padding:"4px 8px", fontSize:12 }}>
                        <strong>{p}</strong>
                        <span style={{ color:P.muted }}>{pred.s1}–{pred.s2}</span>
                        {v===3&&<span>🎯</span>}{v===1&&<span style={{color:P.green}}>✓</span>}
                      </span>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ fontSize:11, color:P.dim }}>
                {others.length} autre{others.length>1?"s":""} participant{others.length>1?"s":""} ont pronostiqué — révélé après le match
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APP PRINCIPALE
// ─────────────────────────────────────────────
export default function App() {
  const [session, setSession]   = useState(null);   // { pseudo, isAdmin }
  const [preds,   setPreds]     = useState({});
  const [scores,  setScores]    = useState({});
  const [view,    setView]      = useState("dashboard"); // dashboard | matches | admin
  const [filter,  setFilter]    = useState("all");
  const [toast,   setToast]     = useState(null);
  const [booting, setBooting]   = useState(true);

  // ── Chargement initial ──
  useEffect(() => {
    const sess = lsGet(SK.SESSION);
    if (sess) setSession(sess);
    setPreds(lsGet(SK.PREDS)  || {});
    setScores(lsGet(SK.SCORES) || {});
    setBooting(false);
  }, []);

  function toast_(msg, ms=2500) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  function handleLogin(pseudo, isAdmin) {
    const s = { pseudo, isAdmin };
    setSession(s);
    lsSet(SK.SESSION, s);
    // Rafraîchir les données partagées depuis ls
    setPreds(lsGet(SK.PREDS)||{});
    setScores(lsGet(SK.SCORES)||{});
    setView("dashboard");
  }

  function handleLogout() {
    lsSet(SK.SESSION, null);
    setSession(null);
    setPreds({});
    setScores({});
  }

  function handleValidate(matchId, s1, s2) {
    const m = MATCHES.find(x => x.id===matchId);
    const rs1 = scores[m.id]?.s1 ?? m.s1;
    if (rs1 != null) { toast_("Ce match est déjà terminé !"); return; }
    const existing = preds[matchId]?.[session.pseudo];
    if (existing?.locked) { toast_("Pronostic déjà verrouillé !"); return; }

    const updated = {
      ...preds,
      [matchId]: { ...(preds[matchId]||{}), [session.pseudo]: { s1, s2, locked:true, at: new Date().toISOString() } }
    };
    setPreds(updated);
    lsSet(SK.PREDS, updated);
    toast_(`🔒 Pronostic validé : ${s1}–${s2}`);
  }

  function handleSetScore(matchId, s1, s2) {
    const updated = { ...scores, [matchId]: { s1, s2 } };
    setScores(updated);
    lsSet(SK.SCORES, updated);
    toast_(`Score enregistré : ${s1}–${s2} ✓`);
  }

  // Filtrage des matchs
  const filteredMatches = useMemo(() => {
    let list = MATCHES;
    if (filter === "todo") {
      list = list.filter(m => {
        const rs1 = scores[m.id]?.s1 ?? m.s1;
        return rs1==null && !preds[m.id]?.[session?.pseudo]?.locked;
      });
    } else if (filter !== "all") {
      list = list.filter(m => m.round===filter || m.group===filter);
    }
    return list;
  }, [filter, preds, scores, session]);

  // Groupement par journée
  const byRound = useMemo(() => {
    const r = {};
    filteredMatches.forEach(m => { if (!r[m.round]) r[m.round]=[]; r[m.round].push(m); });
    return r;
  }, [filteredMatches]);

  const rounds = [...new Set(MATCHES.map(m => m.round))];

  if (booting) return <div style={{ ...css.page, ...css.center, minHeight:"100vh" }}>
    <span style={{ color:P.muted }}>Chargement…</span>
  </div>;

  if (!session) return <AuthScreen onLogin={handleLogin} />;

  // ── Tabs de navigation ──
  const tabs = session.isAdmin
    ? [{ id:"dashboard", label:"🏆 Tableau de bord" }, { id:"matches", label:"⚽ Matchs" }, { id:"admin", label:"⚙️ Admin" }]
    : [{ id:"dashboard", label:"🏆 Tableau de bord" }, { id:"matches", label:"⚽ Matchs" }];

  return (
    <div style={css.page}>
      {/* ── Header ── */}
      <div style={{ background:"#060d1a", borderBottom:`1px solid ${P.border}`,
                    position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:720, margin:"0 auto", padding:"0 14px",
                      display:"flex", alignItems:"center", justifyContent:"space-between", height:54 }}>
          {/* Logo */}
          <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:17, letterSpacing:1 }}>
            ⚽ <span style={{ color:P.gold }}>CdM 2026</span>
          </div>
          {/* Tabs */}
          <div style={{ display:"flex", gap:2 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{
                background: view===t.id ? P.card : "transparent",
                border: `1px solid ${view===t.id?P.border:"transparent"}`,
                color: view===t.id ? P.text : P.muted,
                borderRadius:7, padding:"5px 11px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
                {t.label}
              </button>
            ))}
          </div>
          {/* User info */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13, color:P.muted }}>
              {session.isAdmin
                ? <span style={css.badge("#7c2d12","#fde68a")}>Admin</span>
                : session.pseudo}
            </span>
            <button onClick={handleLogout} style={{
              background:"transparent", border:`1px solid ${P.border}`, color:P.muted,
              borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12 }}>
              Quitter
            </button>
          </div>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div style={{ maxWidth:720, margin:"0 auto", padding:"16px 14px 80px" }}>

        {/* ── TABLEAU DE BORD ── */}
        {view==="dashboard" && (
          <Dashboard currentUser={session.pseudo} preds={preds} scores={scores} />
        )}

        {/* ── MATCHS ── */}
        {view==="matches" && (
          <>
            {/* Filtres */}
            <div style={{ display:"flex", gap:5, overflowX:"auto", paddingBottom:10,
                          marginBottom:8, scrollbarWidth:"none" }}>
              <button style={{ padding:"5px 13px", borderRadius:20, flexShrink:0, cursor:"pointer", fontSize:12, fontWeight:600,
                border:`1px solid ${filter==="all"?P.accent:P.border}`,
                background:filter==="all"?"#172038":"transparent",
                color:filter==="all"?P.accent:P.muted }}
                onClick={()=>setFilter("all")}>Tous</button>
              <button style={{ padding:"5px 13px", borderRadius:20, flexShrink:0, cursor:"pointer", fontSize:12, fontWeight:600,
                border:`1px solid ${filter==="todo"?P.green:P.border}`,
                background:filter==="todo"?"#0f2a1a":"transparent",
                color:filter==="todo"?P.green:P.muted }}
                onClick={()=>setFilter("todo")}>À pronostiquer</button>
              {rounds.map(r => (
                <button key={r} style={{ padding:"5px 13px", borderRadius:20, flexShrink:0, cursor:"pointer", fontSize:12, fontWeight:600,
                  border:`1px solid ${filter===r?P.muted:P.border}`,
                  background:filter===r?P.surface:"transparent",
                  color:filter===r?P.text:P.muted }}
                  onClick={()=>setFilter(r)}>{r}</button>
              ))}
            </div>

            {Object.keys(byRound).length===0 && (
              <div style={{ textAlign:"center", color:P.muted, padding:"48px 0" }}>
                {filter==="todo" ? "✅ Tous les matchs à venir ont été pronostiqués !" : "Aucun match trouvé."}
              </div>
            )}

            {Object.entries(byRound).map(([round, matches]) => (
              <div key={round} style={{ marginBottom:20 }}>
                <div style={{ fontSize:11, fontWeight:700, color:P.muted, textTransform:"uppercase",
                              letterSpacing:1.5, marginBottom:8 }}>{round}</div>
                {matches.map(m => (
                  <MatchCard key={m.id} match={m} currentUser={session.pseudo}
                    preds={preds} scores={scores}
                    onValidate={handleValidate} onSetScore={handleSetScore}
                    isAdmin={false} />
                ))}
              </div>
            ))}
          </>
        )}

        {/* ── ADMIN ── */}
        {view==="admin" && session.isAdmin && (
          <div>
            <div style={{ ...css.card, padding:"14px 16px", marginBottom:18,
                          background:"#1a0f00", borderColor:`${P.gold}44`, fontSize:13, color:P.muted }}>
              ⚙️ <strong style={{ color:P.gold }}>Mode Administrateur</strong> — Saisis les scores réels des matchs.
              Les points de tous les joueurs se calculent automatiquement.
            </div>
            <div style={{ fontSize:11, fontWeight:700, color:P.muted, textTransform:"uppercase",
                          letterSpacing:1.5, marginBottom:10 }}>
              Matchs sans résultat
            </div>
            {MATCHES.filter(m => { const rs1=scores[m.id]?.s1??m.s1; return rs1==null; }).length===0 && (
              <div style={{ textAlign:"center", color:P.muted, padding:32 }}>
                ✅ Tous les matchs ont un résultat enregistré.
              </div>
            )}
            {MATCHES.filter(m => { const rs1=scores[m.id]?.s1??m.s1; return rs1==null; }).map(m => (
              <MatchCard key={m.id} match={m} currentUser="admin"
                preds={preds} scores={scores}
                onValidate={()=>{}} onSetScore={handleSetScore}
                isAdmin={true} />
            ))}
          </div>
        )}
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)",
                      background:P.green, color:"#fff", padding:"10px 22px", borderRadius:22,
                      fontSize:13, fontWeight:700, zIndex:200, boxShadow:"0 4px 20px #0006",
                      whiteSpace:"nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
