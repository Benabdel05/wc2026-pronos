import { useState, useEffect, useMemo, useCallback } from "react";

// ===================== DONNÉES MATCHS =====================
const MATCHES = [{"id":1,"round":"Matchday 1","date":"2026-06-11","time":"13:00","team1":"Mexique","team2":"Afrique du Sud","group":"Groupe A","ground":"Mexico City","score1":2,"score2":0},{"id":2,"round":"Matchday 1","date":"2026-06-11","time":"20:00","team1":"Corée du Sud","team2":"Tchéquie","group":"Groupe A","ground":"Guadalajara","score1":2,"score2":1},{"id":3,"round":"Matchday 2","date":"2026-06-12","time":"15:00","team1":"Canada","team2":"Bosnie-Herzégovine","group":"Groupe B","ground":"Toronto","score1":1,"score2":1},{"id":4,"round":"Matchday 2","date":"2026-06-12","time":"18:00","team1":"États-Unis","team2":"Paraguay","group":"Groupe D","ground":"Los Angeles","score1":4,"score2":1},{"id":5,"round":"Matchday 3","date":"2026-06-13","time":"12:00","team1":"Qatar","team2":"Suisse","group":"Groupe B","ground":"Santa Clara","score1":1,"score2":1},{"id":6,"round":"Matchday 3","date":"2026-06-13","time":"18:00","team1":"Brésil","team2":"Maroc","group":"Groupe C","ground":"New York/NJ","score1":1,"score2":1},{"id":7,"round":"Matchday 3","date":"2026-06-13","time":"21:00","team1":"Haïti","team2":"Écosse","group":"Groupe C","ground":"Boston","score1":0,"score2":1},{"id":8,"round":"Matchday 3","date":"2026-06-13","time":"21:00","team1":"Australie","team2":"Turquie","group":"Groupe D","ground":"Vancouver","score1":2,"score2":0},{"id":9,"round":"Matchday 4","date":"2026-06-14","time":"12:00","team1":"Allemagne","team2":"Curaçao","group":"Groupe E","ground":"Houston","score1":7,"score2":1},{"id":10,"round":"Matchday 4","date":"2026-06-14","time":"15:00","team1":"Pays-Bas","team2":"Japon","group":"Groupe F","ground":"Dallas","score1":2,"score2":2},{"id":11,"round":"Matchday 4","date":"2026-06-14","time":"19:00","team1":"Côte d'Ivoire","team2":"Équateur","group":"Groupe E","ground":"Philadelphia","score1":1,"score2":0},{"id":12,"round":"Matchday 4","date":"2026-06-14","time":"20:00","team1":"Suède","team2":"Tunisie","group":"Groupe F","ground":"Monterrey","score1":5,"score2":1},{"id":13,"round":"Matchday 5","date":"2026-06-15","time":"12:00","team1":"Belgique","team2":"Égypte","group":"Groupe G","ground":"Seattle","score1":1,"score2":1},{"id":14,"round":"Matchday 5","date":"2026-06-15","time":"12:00","team1":"Espagne","team2":"Cap-Vert","group":"Groupe H","ground":"Atlanta","score1":0,"score2":0},{"id":15,"round":"Matchday 5","date":"2026-06-15","time":"18:00","team1":"Iran","team2":"Nouvelle-Zélande","group":"Groupe G","ground":"Los Angeles","score1":2,"score2":2},{"id":16,"round":"Matchday 5","date":"2026-06-15","time":"18:00","team1":"Arabie Saoudite","team2":"Uruguay","group":"Groupe H","ground":"Miami","score1":1,"score2":1},{"id":17,"round":"Matchday 6","date":"2026-06-16","time":"15:00","team1":"France","team2":"Sénégal","group":"Groupe I","ground":"New York/NJ","score1":3,"score2":1},{"id":18,"round":"Matchday 6","date":"2026-06-16","time":"18:00","team1":"Irak","team2":"Norvège","group":"Groupe I","ground":"Boston","score1":1,"score2":4},{"id":19,"round":"Matchday 6","date":"2026-06-16","time":"20:00","team1":"Argentine","team2":"Algérie","group":"Groupe J","ground":"Kansas City","score1":3,"score2":0},{"id":20,"round":"Matchday 6","date":"2026-06-16","time":"21:00","team1":"Autriche","team2":"Jordanie","group":"Groupe J","ground":"Santa Clara","score1":3,"score2":1},{"id":21,"round":"Matchday 7","date":"2026-06-17","time":"12:00","team1":"Portugal","team2":"RD Congo","group":"Groupe K","ground":"Houston","score1":1,"score2":1},{"id":22,"round":"Matchday 7","date":"2026-06-17","time":"15:00","team1":"Angleterre","team2":"Croatie","group":"Groupe L","ground":"Dallas","score1":4,"score2":2},{"id":23,"round":"Matchday 7","date":"2026-06-17","time":"19:00","team1":"Ghana","team2":"Panama","group":"Groupe L","ground":"Toronto","score1":1,"score2":0},{"id":24,"round":"Matchday 7","date":"2026-06-17","time":"20:00","team1":"Ouzbékistan","team2":"Colombie","group":"Groupe K","ground":"Mexico City","score1":1,"score2":3},{"id":25,"round":"Matchday 8","date":"2026-06-18","time":"12:00","team1":"Tchéquie","team2":"Afrique du Sud","group":"Groupe A","ground":"Atlanta","score1":1,"score2":1},{"id":26,"round":"Matchday 8","date":"2026-06-18","time":"12:00","team1":"Suisse","team2":"Bosnie-Herzégovine","group":"Groupe B","ground":"Los Angeles","score1":4,"score2":1},{"id":27,"round":"Matchday 8","date":"2026-06-18","time":"15:00","team1":"Canada","team2":"Qatar","group":"Groupe B","ground":"Vancouver","score1":6,"score2":0},{"id":28,"round":"Matchday 8","date":"2026-06-18","time":"19:00","team1":"Mexique","team2":"Corée du Sud","group":"Groupe A","ground":"Guadalajara","score1":1,"score2":0},{"id":29,"round":"Matchday 9","date":"2026-06-19","time":"12:00","team1":"États-Unis","team2":"Australie","group":"Groupe D","ground":"Seattle","score1":2,"score2":0},{"id":30,"round":"Matchday 9","date":"2026-06-19","time":"18:00","team1":"Écosse","team2":"Maroc","group":"Groupe C","ground":"Boston","score1":0,"score2":1},{"id":31,"round":"Matchday 9","date":"2026-06-19","time":"20:00","team1":"Turquie","team2":"Paraguay","group":"Groupe D","ground":"Santa Clara","score1":0,"score2":1},{"id":32,"round":"Matchday 9","date":"2026-06-19","time":"20:30","team1":"Brésil","team2":"Haïti","group":"Groupe C","ground":"Philadelphia","score1":3,"score2":0},{"id":33,"round":"Matchday 10","date":"2026-06-20","time":"12:00","team1":"Pays-Bas","team2":"Suède","group":"Groupe F","ground":"Houston","score1":5,"score2":1},{"id":34,"round":"Matchday 10","date":"2026-06-20","time":"16:00","team1":"Allemagne","team2":"Côte d'Ivoire","group":"Groupe E","ground":"Toronto","score1":2,"score2":1},{"id":35,"round":"Matchday 10","date":"2026-06-20","time":"19:00","team1":"Équateur","team2":"Curaçao","group":"Groupe E","ground":"Kansas City","score1":0,"score2":0},{"id":36,"round":"Matchday 10","date":"2026-06-20","time":"22:00","team1":"Tunisie","team2":"Japon","group":"Groupe F","ground":"Monterrey","score1":0,"score2":4},{"id":37,"round":"Matchday 11","date":"2026-06-21","time":"12:00","team1":"Belgique","team2":"Iran","group":"Groupe G","ground":"Los Angeles","score1":0,"score2":0},{"id":38,"round":"Matchday 11","date":"2026-06-21","time":"12:00","team1":"Espagne","team2":"Arabie Saoudite","group":"Groupe H","ground":"Atlanta","score1":4,"score2":0},{"id":39,"round":"Matchday 11","date":"2026-06-21","time":"18:00","team1":"Nouvelle-Zélande","team2":"Égypte","group":"Groupe G","ground":"Vancouver","score1":null,"score2":null},{"id":40,"round":"Matchday 11","date":"2026-06-21","time":"18:00","team1":"Uruguay","team2":"Cap-Vert","group":"Groupe H","ground":"Miami","score1":null,"score2":null},{"id":41,"round":"Matchday 12","date":"2026-06-22","time":"12:00","team1":"Argentine","team2":"Autriche","group":"Groupe J","ground":"Dallas","score1":null,"score2":null},{"id":42,"round":"Matchday 12","date":"2026-06-22","time":"17:00","team1":"France","team2":"Irak","group":"Groupe I","ground":"Philadelphia","score1":null,"score2":null},{"id":43,"round":"Matchday 12","date":"2026-06-22","time":"20:00","team1":"Norvège","team2":"Sénégal","group":"Groupe I","ground":"New York/NJ","score1":null,"score2":null},{"id":44,"round":"Matchday 12","date":"2026-06-22","time":"20:00","team1":"Jordanie","team2":"Algérie","group":"Groupe J","ground":"Santa Clara","score1":null,"score2":null},{"id":45,"round":"Matchday 13","date":"2026-06-23","time":"12:00","team1":"Portugal","team2":"Ouzbékistan","group":"Groupe K","ground":"Houston","score1":null,"score2":null},{"id":46,"round":"Matchday 13","date":"2026-06-23","time":"16:00","team1":"Angleterre","team2":"Ghana","group":"Groupe L","ground":"Boston","score1":null,"score2":null},{"id":47,"round":"Matchday 13","date":"2026-06-23","time":"19:00","team1":"Panama","team2":"Croatie","group":"Groupe L","ground":"Toronto","score1":null,"score2":null},{"id":48,"round":"Matchday 13","date":"2026-06-23","time":"20:00","team1":"Colombie","team2":"RD Congo","group":"Groupe K","ground":"Guadalajara","score1":null,"score2":null},{"id":49,"round":"Matchday 14","date":"2026-06-24","time":"12:00","team1":"Suisse","team2":"Canada","group":"Groupe B","ground":"Vancouver","score1":null,"score2":null},{"id":50,"round":"Matchday 14","date":"2026-06-24","time":"12:00","team1":"Bosnie-Herzégovine","team2":"Qatar","group":"Groupe B","ground":"Seattle","score1":null,"score2":null},{"id":51,"round":"Matchday 14","date":"2026-06-24","time":"18:00","team1":"Écosse","team2":"Brésil","group":"Groupe C","ground":"Miami","score1":null,"score2":null},{"id":52,"round":"Matchday 14","date":"2026-06-24","time":"18:00","team1":"Maroc","team2":"Haïti","group":"Groupe C","ground":"Atlanta","score1":null,"score2":null},{"id":53,"round":"Matchday 14","date":"2026-06-24","time":"19:00","team1":"Tchéquie","team2":"Mexique","group":"Groupe A","ground":"Mexico City","score1":null,"score2":null},{"id":54,"round":"Matchday 14","date":"2026-06-24","time":"19:00","team1":"Afrique du Sud","team2":"Corée du Sud","group":"Groupe A","ground":"Monterrey","score1":null,"score2":null},{"id":55,"round":"Matchday 15","date":"2026-06-25","time":"16:00","team1":"Curaçao","team2":"Côte d'Ivoire","group":"Groupe E","ground":"Philadelphia","score1":null,"score2":null},{"id":56,"round":"Matchday 15","date":"2026-06-25","time":"16:00","team1":"Équateur","team2":"Allemagne","group":"Groupe E","ground":"New York/NJ","score1":null,"score2":null},{"id":57,"round":"Matchday 15","date":"2026-06-25","time":"18:00","team1":"Japon","team2":"Suède","group":"Groupe F","ground":"Dallas","score1":null,"score2":null},{"id":58,"round":"Matchday 15","date":"2026-06-25","time":"18:00","team1":"Tunisie","team2":"Pays-Bas","group":"Groupe F","ground":"Kansas City","score1":null,"score2":null},{"id":59,"round":"Matchday 15","date":"2026-06-25","time":"19:00","team1":"Turquie","team2":"États-Unis","group":"Groupe D","ground":"Los Angeles","score1":null,"score2":null},{"id":60,"round":"Matchday 15","date":"2026-06-25","time":"19:00","team1":"Paraguay","team2":"Australie","group":"Groupe D","ground":"Santa Clara","score1":null,"score2":null},{"id":61,"round":"Matchday 16","date":"2026-06-26","time":"15:00","team1":"Norvège","team2":"France","group":"Groupe I","ground":"Boston","score1":null,"score2":null},{"id":62,"round":"Matchday 16","date":"2026-06-26","time":"15:00","team1":"Sénégal","team2":"Irak","group":"Groupe I","ground":"Toronto","score1":null,"score2":null},{"id":63,"round":"Matchday 16","date":"2026-06-26","time":"18:00","team1":"Uruguay","team2":"Espagne","group":"Groupe H","ground":"Guadalajara","score1":null,"score2":null},{"id":64,"round":"Matchday 16","date":"2026-06-26","time":"19:00","team1":"Cap-Vert","team2":"Arabie Saoudite","group":"Groupe H","ground":"Houston","score1":null,"score2":null},{"id":65,"round":"Matchday 16","date":"2026-06-26","time":"20:00","team1":"Égypte","team2":"Iran","group":"Groupe G","ground":"Seattle","score1":null,"score2":null},{"id":66,"round":"Matchday 16","date":"2026-06-26","time":"20:00","team1":"Nouvelle-Zélande","team2":"Belgique","group":"Groupe G","ground":"Vancouver","score1":null,"score2":null},{"id":67,"round":"Matchday 17","date":"2026-06-27","time":"17:00","team1":"Panama","team2":"Angleterre","group":"Groupe L","ground":"New York/NJ","score1":null,"score2":null},{"id":68,"round":"Matchday 17","date":"2026-06-27","time":"17:00","team1":"Croatie","team2":"Ghana","group":"Groupe L","ground":"Philadelphia","score1":null,"score2":null},{"id":69,"round":"Matchday 17","date":"2026-06-27","time":"19:30","team1":"Colombie","team2":"Portugal","group":"Groupe K","ground":"Miami","score1":null,"score2":null},{"id":70,"round":"Matchday 17","date":"2026-06-27","time":"19:30","team1":"RD Congo","team2":"Ouzbékistan","group":"Groupe K","ground":"Atlanta","score1":null,"score2":null},{"id":71,"round":"Matchday 17","date":"2026-06-27","time":"21:00","team1":"Algérie","team2":"Autriche","group":"Groupe J","ground":"Kansas City","score1":null,"score2":null},{"id":72,"round":"Matchday 17","date":"2026-06-27","time":"21:00","team1":"Jordanie","team2":"Argentine","group":"Groupe J","ground":"Dallas","score1":null,"score2":null},{"id":73,"round":"16es de finale","date":"2026-06-28","time":"12:00","team1":"2A","team2":"2B","group":"Phase finale","ground":"Los Angeles","score1":null,"score2":null},{"id":74,"round":"16es de finale","date":"2026-06-29","time":"12:00","team1":"1C","team2":"2F","group":"Phase finale","ground":"Houston","score1":null,"score2":null},{"id":75,"round":"16es de finale","date":"2026-06-29","time":"16:30","team1":"1E","team2":"3e","group":"Phase finale","ground":"Boston","score1":null,"score2":null},{"id":76,"round":"16es de finale","date":"2026-06-29","time":"19:00","team1":"1F","team2":"2C","group":"Phase finale","ground":"Monterrey","score1":null,"score2":null},{"id":77,"round":"16es de finale","date":"2026-06-30","time":"12:00","team1":"2E","team2":"2I","group":"Phase finale","ground":"Dallas","score1":null,"score2":null},{"id":78,"round":"16es de finale","date":"2026-06-30","time":"17:00","team1":"1I","team2":"3e","group":"Phase finale","ground":"New York/NJ","score1":null,"score2":null},{"id":79,"round":"16es de finale","date":"2026-06-30","time":"19:00","team1":"1A","team2":"3e","group":"Phase finale","ground":"Mexico City","score1":null,"score2":null},{"id":80,"round":"16es de finale","date":"2026-07-01","time":"12:00","team1":"1L","team2":"3e","group":"Phase finale","ground":"Atlanta","score1":null,"score2":null},{"id":81,"round":"16es de finale","date":"2026-07-01","time":"13:00","team1":"1G","team2":"3e","group":"Phase finale","ground":"Seattle","score1":null,"score2":null},{"id":82,"round":"16es de finale","date":"2026-07-01","time":"17:00","team1":"1D","team2":"3e","group":"Phase finale","ground":"Santa Clara","score1":null,"score2":null},{"id":83,"round":"16es de finale","date":"2026-07-02","time":"12:00","team1":"1H","team2":"2J","group":"Phase finale","ground":"Los Angeles","score1":null,"score2":null},{"id":84,"round":"16es de finale","date":"2026-07-02","time":"19:00","team1":"2K","team2":"2L","group":"Phase finale","ground":"Toronto","score1":null,"score2":null},{"id":85,"round":"16es de finale","date":"2026-07-02","time":"20:00","team1":"1B","team2":"3e","group":"Phase finale","ground":"Vancouver","score1":null,"score2":null},{"id":86,"round":"16es de finale","date":"2026-07-03","time":"13:00","team1":"2D","team2":"2G","group":"Phase finale","ground":"Dallas","score1":null,"score2":null},{"id":87,"round":"16es de finale","date":"2026-07-03","time":"18:00","team1":"1J","team2":"2H","group":"Phase finale","ground":"Miami","score1":null,"score2":null},{"id":88,"round":"16es de finale","date":"2026-07-03","time":"20:30","team1":"1K","team2":"3e","group":"Phase finale","ground":"Kansas City","score1":null,"score2":null},{"id":89,"round":"8es de finale","date":"2026-07-04","time":"12:00","team1":"W73","team2":"W75","group":"Phase finale","ground":"Houston","score1":null,"score2":null},{"id":90,"round":"8es de finale","date":"2026-07-04","time":"17:00","team1":"W74","team2":"W77","group":"Phase finale","ground":"Philadelphia","score1":null,"score2":null},{"id":91,"round":"8es de finale","date":"2026-07-05","time":"16:00","team1":"W76","team2":"W78","group":"Phase finale","ground":"New York/NJ","score1":null,"score2":null},{"id":92,"round":"8es de finale","date":"2026-07-05","time":"18:00","team1":"W79","team2":"W80","group":"Phase finale","ground":"Mexico City","score1":null,"score2":null},{"id":93,"round":"8es de finale","date":"2026-07-06","time":"14:00","team1":"W83","team2":"W84","group":"Phase finale","ground":"Dallas","score1":null,"score2":null},{"id":94,"round":"8es de finale","date":"2026-07-06","time":"17:00","team1":"W81","team2":"W82","group":"Phase finale","ground":"Seattle","score1":null,"score2":null},{"id":95,"round":"8es de finale","date":"2026-07-07","time":"12:00","team1":"W86","team2":"W88","group":"Phase finale","ground":"Atlanta","score1":null,"score2":null},{"id":96,"round":"8es de finale","date":"2026-07-07","time":"13:00","team1":"W85","team2":"W87","group":"Phase finale","ground":"Vancouver","score1":null,"score2":null},{"id":97,"round":"Quarts de finale","date":"2026-07-09","time":"16:00","team1":"W89","team2":"W90","group":"Phase finale","ground":"Boston","score1":null,"score2":null},{"id":98,"round":"Quarts de finale","date":"2026-07-10","time":"12:00","team1":"W93","team2":"W94","group":"Phase finale","ground":"Los Angeles","score1":null,"score2":null},{"id":99,"round":"Quarts de finale","date":"2026-07-11","time":"17:00","team1":"W91","team2":"W92","group":"Phase finale","ground":"Miami","score1":null,"score2":null},{"id":100,"round":"Quarts de finale","date":"2026-07-11","time":"20:00","team1":"W95","team2":"W96","group":"Phase finale","ground":"Kansas City","score1":null,"score2":null},{"id":101,"round":"Demi-finales","date":"2026-07-14","time":"14:00","team1":"W97","team2":"W98","group":"Phase finale","ground":"Dallas","score1":null,"score2":null},{"id":102,"round":"Demi-finales","date":"2026-07-15","time":"15:00","team1":"W99","team2":"W100","group":"Phase finale","ground":"Atlanta","score1":null,"score2":null},{"id":103,"round":"3e place","date":"2026-07-18","time":"17:00","team1":"L101","team2":"L102","group":"Phase finale","ground":"Miami","score1":null,"score2":null},{"id":104,"round":"Finale","date":"2026-07-19","time":"15:00","team1":"W101","team2":"W102","group":"Phase finale","ground":"New York/NJ","score1":null,"score2":null}];

// ===================== HELPERS =====================
function outcome(s1, s2) {
  if (s1 === s2) return "N";
  return s1 > s2 ? "1" : "2";
}
function calcPoints(ps1, ps2, rs1, rs2) {
  if (ps1 == null || ps2 == null || rs1 == null || rs2 == null) return null;
  if (ps1 === rs1 && ps2 === rs2) return 3;
  if (outcome(ps1, ps2) === outcome(rs1, rs2)) return 1;
  return 0;
}
function fmtDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" });
}
function groupMatches() {
  const rounds = {};
  MATCHES.forEach(m => {
    const k = m.round;
    if (!rounds[k]) rounds[k] = [];
    rounds[k].push(m);
  });
  return rounds;
}

const STORAGE_KEY = "wc2026_shared_v1";
const SCORES_KEY = "wc2026_scores_v1";

// ===================== COULEURS =====================
const C = {
  bg: "#0d1117",
  card: "#161b22",
  border: "#30363d",
  accent: "#238636",
  accentHover: "#2ea043",
  gold: "#d4af37",
  text: "#e6edf3",
  muted: "#8b949e",
  red: "#f85149",
  blue: "#58a6ff",
  locked: "#1f2937",
};

// ===================== STYLES =====================
const S = {
  app: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif", fontSize: 14 },
  header: { background: "#010409", borderBottom: `1px solid ${C.border}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 },
  headerInner: { maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 },
  logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 16, letterSpacing: -0.5 },
  badge: { background: C.gold, color: "#0d1117", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 700 },
  nav: { display: "flex", gap: 4 },
  navBtn: (active) => ({ background: active ? C.card : "transparent", border: `1px solid ${active ? C.border : "transparent"}`, color: active ? C.text : C.muted, borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 500 }),
  main: { maxWidth: 700, margin: "0 auto", padding: "16px 12px 80px" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10, paddingLeft: 4 },
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: "hidden" },
  matchHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: `1px solid ${C.border}`, background: "#0d1117" },
  matchDate: { fontSize: 11, color: C.muted },
  matchGroup: { fontSize: 11, color: C.blue, fontWeight: 600 },
  matchBody: { padding: "14px 14px 12px" },
  teamsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 12 },
  teamName: { flex: 1, fontWeight: 700, fontSize: 15 },
  teamRight: { flex: 1, fontWeight: 700, fontSize: 15, textAlign: "right" },
  vsBox: { display: "flex", alignItems: "center", gap: 8, minWidth: 80, justifyContent: "center" },
  resultScore: { fontFamily: "monospace", fontSize: 22, fontWeight: 800, color: C.gold, letterSpacing: 1 },
  inputWrap: { display: "flex", alignItems: "center", gap: 6 },
  scoreInput: { width: 38, height: 38, textAlign: "center", fontSize: 18, fontWeight: 700, background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, outline: "none" },
  dash: { color: C.muted, fontSize: 18, fontWeight: 300 },
  validateBtn: { width: "100%", marginTop: 10, padding: "9px 0", background: C.accent, color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: 0.5 },
  lockedInfo: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  lockedTag: { fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 },
  pointsBadge: (pts) => ({
    fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
    background: pts === 3 ? C.gold : pts === 1 ? C.accent : pts === 0 ? "#30363d" : "#1c2536",
    color: pts === 3 ? "#0d1117" : pts === 1 ? "#fff" : pts === 0 ? C.muted : C.blue,
  }),
  myPredRow: { display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 13 },
  otherPreds: { marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}` },
  chip: { display: "inline-flex", alignItems: "center", gap: 5, background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 8px", fontSize: 12, margin: "3px 3px 0 0" },
  // Leaderboard
  lbCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, padding: "14px 16px", display: "grid", gridTemplateColumns: "40px 1fr auto", alignItems: "center", gap: "0 12px" },
  lbRank: { fontSize: 20, textAlign: "center" },
  lbName: { fontWeight: 700, fontSize: 16 },
  lbPts: { fontFamily: "monospace", fontSize: 26, fontWeight: 800, color: C.gold, textAlign: "right" },
  lbSub: { gridColumn: "2/4", fontSize: 12, color: C.muted, marginTop: 2 },
  // Login
  loginWrap: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  loginCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 32, maxWidth: 380, width: "100%", textAlign: "center" },
  loginTitle: { fontSize: 28, fontWeight: 800, marginBottom: 6 },
  loginSub: { color: C.muted, fontSize: 14, marginBottom: 28, lineHeight: 1.6 },
  loginInput: { width: "100%", padding: "12px 14px", background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 16, fontWeight: 600, outline: "none", marginBottom: 14, boxSizing: "border-box" },
  loginBtn: { width: "100%", padding: "13px 0", background: C.accent, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer" },
  // Admin
  adminInput: { width: 50, textAlign: "center", padding: "6px", background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 5, color: C.gold, fontSize: 16, fontWeight: 700, outline: "none" },
  adminBtn: { padding: "6px 14px", background: "#1f2937", border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, cursor: "pointer", fontSize: 12, fontWeight: 600 },
  toast: { position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: C.accent, color: "#fff", padding: "10px 20px", borderRadius: 20, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: "nowrap" },
  emptyState: { textAlign: "center", color: C.muted, padding: "40px 20px", fontSize: 14 },
  rulesBox: { background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: C.muted, lineHeight: 1.8 },
  filterBar: { display: "flex", gap: 6, overflowX: "auto", padding: "0 0 10px", marginBottom: 4, scrollbarWidth: "none" },
  filterBtn: (active) => ({ padding: "5px 12px", borderRadius: 20, border: `1px solid ${active ? C.blue : C.border}`, background: active ? "#1c2536" : "transparent", color: active ? C.blue : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }),
};

// ===================== COMPOSANT MATCH CARD =====================
function MatchCard({ match, currentPlayer, allPredictions, allScores, onValidate, onSetScore, isAdmin }) {
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [adminS1, setAdminS1] = useState(match.score1 ?? "");
  const [adminS2, setAdminS2] = useState(match.score2 ?? "");

  const realScore1 = allScores[match.id]?.s1 ?? match.score1;
  const realScore2 = allScores[match.id]?.s2 ?? match.score2;
  const hasResult = realScore1 != null && realScore2 != null;

  const myPred = allPredictions[match.id]?.[currentPlayer];
  const isLocked = myPred?.locked === true;
  const myPts = isLocked && hasResult ? calcPoints(myPred.s1, myPred.s2, realScore1, realScore2) : null;

  const otherPreds = Object.entries(allPredictions[match.id] || {})
    .filter(([p]) => p !== currentPlayer);

  function handleValidate() {
    const v1 = parseInt(s1);
    const v2 = parseInt(s2);
    if (isNaN(v1) || isNaN(v2) || v1 < 0 || v2 < 0) return;
    onValidate(match.id, v1, v2);
    setS1(""); setS2("");
  }

  function handleAdminScore() {
    const v1 = parseInt(adminS1);
    const v2 = parseInt(adminS2);
    if (isNaN(v1) || isNaN(v2)) return;
    onSetScore(match.id, v1, v2);
  }

  const ptsBadge = myPts !== null
    ? <span style={S.pointsBadge(myPts)}>{myPts === 3 ? "🎯 Score exact +3" : myPts === 1 ? "✓ Bon résultat +1" : "✗ Raté 0 pt"}</span>
    : isLocked && !hasResult
      ? <span style={S.pointsBadge(null)}>En attente du résultat</span>
      : null;

  return (
    <div style={S.card}>
      <div style={S.matchHead}>
        <span style={S.matchDate}>{fmtDate(match.date)} · {match.time}</span>
        <span style={S.matchGroup}>{match.group}</span>
      </div>
      <div style={S.matchBody}>
        {/* Équipes + score réel */}
        <div style={S.teamsRow}>
          <span style={S.teamName}>{match.team1}</span>
          <div style={S.vsBox}>
            {hasResult
              ? <span style={S.resultScore}>{realScore1} – {realScore2}</span>
              : <span style={{ color: C.muted, fontSize: 13 }}>vs</span>}
          </div>
          <span style={S.teamRight}>{match.team2}</span>
        </div>

        {/* Admin : saisie du score réel */}
        {isAdmin && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, padding: "8px 10px", background: "#0d1117", borderRadius: 7 }}>
            <span style={{ fontSize: 11, color: C.gold, fontWeight: 700, marginRight: 4 }}>ADMIN</span>
            <input style={S.adminInput} type="number" min="0" max="99" value={adminS1} onChange={e => setAdminS1(e.target.value)} />
            <span style={S.dash}>–</span>
            <input style={S.adminInput} type="number" min="0" max="99" value={adminS2} onChange={e => setAdminS2(e.target.value)} />
            <button style={S.adminBtn} onClick={handleAdminScore}>Valider résultat</button>
          </div>
        )}

        {/* Mon pronostic */}
        {!isLocked && !hasResult && (
          <div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Mon pronostic :</div>
            <div style={S.inputWrap}>
              <input style={S.scoreInput} type="number" min="0" max="99" placeholder="0" value={s1} onChange={e => setS1(e.target.value)} />
              <span style={S.dash}>–</span>
              <input style={S.scoreInput} type="number" min="0" max="99" placeholder="0" value={s2} onChange={e => setS2(e.target.value)} />
            </div>
            <button style={S.validateBtn} onClick={handleValidate}>🔒 Valider (irrévocable)</button>
          </div>
        )}

        {isLocked && (
          <div style={S.lockedInfo}>
            <div style={S.lockedTag}>
              <span>🔒</span>
              <span>Mon prono : <strong style={{ color: C.text }}>{myPred.s1} – {myPred.s2}</strong></span>
            </div>
            {ptsBadge}
          </div>
        )}

        {hasResult && !isLocked && (
          <div style={{ fontSize: 12, color: C.muted, marginTop: 6, fontStyle: "italic" }}>
            Match terminé — pronostic non soumis
          </div>
        )}

        {/* Pronostics des autres (visibles seulement si résultat connu) */}
        {otherPreds.length > 0 && hasResult && (
          <div style={S.otherPreds}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 5 }}>Pronostics des autres :</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {otherPreds.map(([p, pred]) => {
                const pts = calcPoints(pred.s1, pred.s2, realScore1, realScore2);
                return (
                  <span key={p} style={{ ...S.chip, borderColor: pts === 3 ? C.gold : pts === 1 ? C.accent : C.border }}>
                    <span style={{ fontWeight: 700 }}>{p}</span>
                    <span style={{ color: C.muted }}>{pred.s1}–{pred.s2}</span>
                    {pts === 3 && <span>🎯</span>}
                    {pts === 1 && <span style={{ color: C.accent }}>✓</span>}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Pronostics des autres (non révélés si match pas encore joué) */}
        {otherPreds.length > 0 && !hasResult && (
          <div style={S.otherPreds}>
            <div style={{ fontSize: 11, color: C.muted }}>
              {otherPreds.length} autre{otherPreds.length > 1 ? "s" : ""} participant{otherPreds.length > 1 ? "s" : ""} ont pronostiqué — révélé après le match
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== APP PRINCIPALE =====================
export default function App() {
  const [player, setPlayer] = useState(null);
  const [pseudoInput, setPseudoInput] = useState("");
  const [allPredictions, setAllPredictions] = useState({});
  const [allScores, setAllScores] = useState({});
  const [view, setView] = useState("matches");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const ADMIN_CODE = "wc2026admin";

  // Chargement initial depuis le stockage partagé
  useEffect(() => {
    async function load() {
      try {
        const predsRes = await window.storage.get(STORAGE_KEY, true);
        if (predsRes) setAllPredictions(JSON.parse(predsRes.value));
      } catch {}
      try {
        const scoresRes = await window.storage.get(SCORES_KEY, true);
        if (scoresRes) setAllScores(JSON.parse(scoresRes.value));
      } catch {}
      // Pseudo local
      try {
        const p = await window.storage.get("wc2026_player_local", false);
        if (p) setPlayer(p.value);
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  async function savePredictions(newPreds) {
    setSaving(true);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(newPreds), true);
    } catch (e) { showToast("Erreur de sauvegarde"); }
    setSaving(false);
  }

  async function handleValidate(matchId, s1, s2) {
    if (!player) return;
    const match = MATCHES.find(m => m.id === matchId);
    const realS1 = allScores[matchId]?.s1 ?? match.score1;
    if (realS1 != null) { showToast("Match déjà joué !"); return; }
    const existing = allPredictions[matchId]?.[player];
    if (existing?.locked) { showToast("Pronostic déjà verrouillé !"); return; }

    const updated = {
      ...allPredictions,
      [matchId]: {
        ...(allPredictions[matchId] || {}),
        [player]: { s1, s2, locked: true, at: new Date().toISOString() }
      }
    };
    setAllPredictions(updated);
    await savePredictions(updated);
    showToast(`🔒 Pronostic validé : ${s1}–${s2}`);
  }

  async function handleSetScore(matchId, s1, s2) {
    const updated = { ...allScores, [matchId]: { s1, s2, at: new Date().toISOString() } };
    setAllScores(updated);
    try {
      await window.storage.set(SCORES_KEY, JSON.stringify(updated), true);
      showToast(`Score enregistré : ${s1}–${s2}`);
    } catch { showToast("Erreur enregistrement"); }
  }

  async function handleLogin() {
    const p = pseudoInput.trim();
    if (!p) return;
    if (p === ADMIN_CODE) { setIsAdmin(true); showToast("Mode admin activé"); setAdminInput(""); return; }
    setPlayer(p);
    try { await window.storage.set("wc2026_player_local", p, false); } catch {}
    // Rafraîchir les données partagées
    try {
      const predsRes = await window.storage.get(STORAGE_KEY, true);
      if (predsRes) setAllPredictions(JSON.parse(predsRes.value));
      const scoresRes = await window.storage.get(SCORES_KEY, true);
      if (scoresRes) setAllScores(JSON.parse(scoresRes.value));
    } catch {}
  }

  // Classement
  const leaderboard = useMemo(() => {
    const players = new Set();
    Object.values(allPredictions).forEach(byP => Object.keys(byP).forEach(p => players.add(p)));
    const totals = {};
    players.forEach(p => totals[p] = { points: 0, exact: 0, good: 0, played: 0 });
    MATCHES.forEach(m => {
      const rs1 = allScores[m.id]?.s1 ?? m.score1;
      const rs2 = allScores[m.id]?.s2 ?? m.score2;
      if (rs1 == null) return;
      Object.entries(allPredictions[m.id] || {}).forEach(([p, pred]) => {
        if (!totals[p]) totals[p] = { points: 0, exact: 0, good: 0, played: 0 };
        const pts = calcPoints(pred.s1, pred.s2, rs1, rs2);
        totals[p].points += pts;
        totals[p].played += 1;
        if (pts === 3) totals[p].exact += 1;
        else if (pts === 1) totals[p].good += 1;
      });
    });
    return Object.entries(totals)
      .map(([name, s]) => ({ name, ...s }))
      .sort((a, b) => b.points - a.points || b.exact - a.exact);
  }, [allPredictions, allScores]);

  const roundedMatches = groupMatches();
  const rounds = Object.keys(roundedMatches);

  // Groupes uniques pour filtre
  const groups = [...new Set(MATCHES.map(m => m.group))];

  const filteredMatches = useMemo(() => {
    if (filter === "all") return MATCHES;
    if (filter === "todo") return MATCHES.filter(m => {
      const rs1 = allScores[m.id]?.s1 ?? m.score1;
      return rs1 == null && !allPredictions[m.id]?.[player]?.locked;
    });
    return MATCHES.filter(m => m.group === filter || m.round === filter);
  }, [filter, allPredictions, allScores, player]);

  const filteredByRound = useMemo(() => {
    const r = {};
    filteredMatches.forEach(m => {
      if (!r[m.round]) r[m.round] = [];
      r[m.round].push(m);
    });
    return r;
  }, [filteredMatches]);

  const ranks = ["🥇", "🥈", "🥉"];

  if (loading) return (
    <div style={{ ...S.loginWrap }}>
      <div style={{ color: C.muted, fontSize: 16 }}>Chargement…</div>
    </div>
  );

  // Écran de connexion
  if (!player && !isAdmin) return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚽</div>
        <div style={S.loginTitle}>Pronostics <span style={{ color: C.gold }}>2026</span></div>
        <div style={S.loginSub}>
          Coupe du Monde · USA / Canada / Mexique<br />
          Entre ton pseudo pour commencer à pronostiquer.
        </div>
        <div style={S.rulesBox}>
          🎯 <strong style={{ color: C.gold }}>Score exact</strong> = 3 points<br />
          ✓ <strong style={{ color: C.accent }}>Bon résultat</strong> (victoire/nul/défaite) = 1 point<br />
          🔒 Une fois validé, le pronostic est <strong>définitif</strong>
        </div>
        <input
          style={S.loginInput}
          placeholder="Ton pseudo…"
          value={pseudoInput}
          onChange={e => setPseudoInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          autoFocus
        />
        <button style={S.loginBtn} onClick={handleLogin}>Commencer →</button>
        <div style={{ marginTop: 16, fontSize: 12, color: C.muted }}>
          Tes données sont partagées en temps réel avec tous les participants.
        </div>
      </div>
    </div>
  );

  // Vue admin
  if (isAdmin && !player) return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logo}>⚽ <span>Admin CdM 2026</span> <span style={{ ...S.badge, background: C.red }}>ADMIN</span></div>
          <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12 }} onClick={() => { setIsAdmin(false); setPseudoInput(""); }}>Quitter</button>
        </div>
      </div>
      <div style={S.main}>
        <div style={{ marginBottom: 16, padding: 14, background: "#1a0a0a", border: `1px solid ${C.red}33`, borderRadius: 8, fontSize: 13, color: C.muted }}>
          Mode administrateur — Tu peux saisir les scores réels des matchs. Les pronostics des joueurs seront calculés automatiquement.
        </div>
        {MATCHES.filter(m => {
          const rs1 = allScores[m.id]?.s1 ?? m.score1;
          return rs1 == null;
        }).map(m => (
          <MatchCard key={m.id} match={m} currentPlayer="" allPredictions={allPredictions} allScores={allScores} onValidate={() => {}} onSetScore={handleSetScore} isAdmin={true} />
        ))}
      </div>
      {toast && <div style={S.toast}>{toast}</div>}
    </div>
  );

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logo}>
            ⚽ <span>CdM 2026</span>
            <span style={S.badge}>⭐ {leaderboard.find(l => l.name === player)?.points ?? 0} pts</span>
          </div>
          <div style={S.nav}>
            <button style={S.navBtn(view === "matches")} onClick={() => setView("matches")}>Matchs</button>
            <button style={S.navBtn(view === "leaderboard")} onClick={() => setView("leaderboard")}>Classement</button>
          </div>
        </div>
      </div>

      <div style={S.main}>
        {view === "matches" && (
          <>
            {/* Bienvenue */}
            <div style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Bonjour {player} 👋</div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>
                  {leaderboard.find(l => l.name === player)?.played ?? 0} match(s) pronostiqués
                </div>
              </div>
              <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}
                onClick={async () => {
                  try {
                    const pr = await window.storage.get(STORAGE_KEY, true);
                    if (pr) setAllPredictions(JSON.parse(pr.value));
                    const sr = await window.storage.get(SCORES_KEY, true);
                    if (sr) setAllScores(JSON.parse(sr.value));
                    showToast("Données actualisées ✓");
                  } catch { showToast("Erreur de synchro"); }
                }}>↻ Synchro</button>
            </div>

            {/* Filtres */}
            <div style={S.filterBar}>
              <button style={S.filterBtn(filter === "all")} onClick={() => setFilter("all")}>Tous</button>
              <button style={S.filterBtn(filter === "todo")} onClick={() => setFilter("todo")}>À pronostiquer</button>
              {[...new Set(MATCHES.map(m => m.round))].slice(0, 20).map(r => (
                <button key={r} style={S.filterBtn(filter === r)} onClick={() => setFilter(r)}>{r}</button>
              ))}
            </div>

            {/* Matchs par journée */}
            {Object.entries(filteredByRound).map(([round, matches]) => (
              <div key={round} style={S.section}>
                <div style={S.sectionTitle}>{round}</div>
                {matches.map(m => (
                  <MatchCard key={m.id} match={m} currentPlayer={player} allPredictions={allPredictions} allScores={allScores} onValidate={handleValidate} onSetScore={handleSetScore} isAdmin={false} />
                ))}
              </div>
            ))}

            {Object.keys(filteredByRound).length === 0 && (
              <div style={S.emptyState}>Aucun match pour ce filtre 🎉</div>
            )}

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button style={{ background: "transparent", border: "none", color: C.muted, fontSize: 12, cursor: "pointer" }}
                onClick={() => { setPlayer(null); setPseudoInput(""); }}>
                Changer de pseudo
              </button>
            </div>
          </>
        )}

        {view === "leaderboard" && (
          <>
            <div style={{ marginBottom: 16, fontWeight: 800, fontSize: 20 }}>🏆 Classement</div>
            <div style={S.rulesBox}>
              🎯 Score exact = <strong style={{ color: C.gold }}>3 pts</strong> &nbsp;·&nbsp; ✓ Bon résultat = <strong style={{ color: C.accent }}>1 pt</strong>
            </div>
            {leaderboard.length === 0 && <div style={S.emptyState}>Aucun pronostic pour l'instant</div>}
            {leaderboard.map((entry, i) => (
              <div key={entry.name} style={{ ...S.lbCard, borderColor: entry.name === player ? C.blue : C.border }}>
                <div style={S.lbRank}>{ranks[i] || `${i + 1}`}</div>
                <div>
                  <div style={{ ...S.lbName, color: entry.name === player ? C.blue : C.text }}>
                    {entry.name} {entry.name === player && <span style={{ fontSize: 12, color: C.muted }}>(moi)</span>}
                  </div>
                  <div style={S.lbSub}>
                    {entry.played} matchs · 🎯 {entry.exact} exacts · ✓ {entry.good} bons résultats
                  </div>
                </div>
                <div style={S.lbPts}>{entry.points}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {saving && <div style={{ ...S.toast, background: "#1f2937" }}>Sauvegarde…</div>}
      {toast && !saving && <div style={S.toast}>{toast}</div>}
    </div>
  );
}
