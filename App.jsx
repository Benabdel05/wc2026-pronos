import React, { useState, useEffect, useMemo, useRef } from "react";
import OverthinkerCaricature from "./OverthinkerCaricature";

// ---------- Données des matchs (Coupe du Monde 2026, source openfootball.org) ----------
const matchesData = [{"id": 1, "round": "Matchday 1", "date": "2026-06-11", "time": "13:00", "team1": "Mexico", "team2": "South Africa", "group": "Group A", "ground": "Mexico City", "score1": 2, "score2": 0, "team1_fr": "Mexique", "team2_fr": "Afrique du Sud"}, {"id": 2, "round": "Matchday 1", "date": "2026-06-11", "time": "20:00", "team1": "South Korea", "team2": "Czech Republic", "group": "Group A", "ground": "Guadalajara (Zapopan)", "score1": 2, "score2": 1, "team1_fr": "Corée du Sud", "team2_fr": "Tchéquie"}, {"id": 3, "round": "Matchday 2", "date": "2026-06-12", "time": "15:00", "team1": "Canada", "team2": "Bosnia & Herzegovina", "group": "Group B", "ground": "Toronto", "score1": 1, "score2": 1, "team1_fr": "Canada", "team2_fr": "Bosnie-Herzégovine"}, {"id": 4, "round": "Matchday 2", "date": "2026-06-12", "time": "18:00", "team1": "USA", "team2": "Paraguay", "group": "Group D", "ground": "Los Angeles (Inglewood)", "score1": 4, "score2": 1, "team1_fr": "États-Unis", "team2_fr": "Paraguay"}, {"id": 5, "round": "Matchday 3", "date": "2026-06-13", "time": "12:00", "team1": "Qatar", "team2": "Switzerland", "group": "Group B", "ground": "San Francisco Bay Area (Santa Clara)", "score1": 1, "score2": 1, "team1_fr": "Qatar", "team2_fr": "Suisse"}, {"id": 6, "round": "Matchday 3", "date": "2026-06-13", "time": "18:00", "team1": "Brazil", "team2": "Morocco", "group": "Group C", "ground": "New York/New Jersey (East Rutherford)", "score1": 1, "score2": 1, "team1_fr": "Brésil", "team2_fr": "Maroc"}, {"id": 7, "round": "Matchday 3", "date": "2026-06-13", "time": "21:00", "team1": "Haiti", "team2": "Scotland", "group": "Group C", "ground": "Boston (Foxborough)", "score1": 0, "score2": 1, "team1_fr": "Haïti", "team2_fr": "Écosse"}, {"id": 8, "round": "Matchday 3", "date": "2026-06-13", "time": "21:00", "team1": "Australia", "team2": "Turkey", "group": "Group D", "ground": "Vancouver", "score1": 2, "score2": 0, "team1_fr": "Australie", "team2_fr": "Turquie"}, {"id": 9, "round": "Matchday 4", "date": "2026-06-14", "time": "12:00", "team1": "Germany", "team2": "Curaçao", "group": "Group E", "ground": "Houston", "score1": 7, "score2": 1, "team1_fr": "Allemagne", "team2_fr": "Curaçao"}, {"id": 10, "round": "Matchday 4", "date": "2026-06-14", "time": "15:00", "team1": "Netherlands", "team2": "Japan", "group": "Group F", "ground": "Dallas (Arlington)", "score1": 2, "score2": 2, "team1_fr": "Pays-Bas", "team2_fr": "Japon"}, {"id": 11, "round": "Matchday 4", "date": "2026-06-14", "time": "19:00", "team1": "Ivory Coast", "team2": "Ecuador", "group": "Group E", "ground": "Philadelphia", "score1": 1, "score2": 0, "team1_fr": "Côte d'Ivoire", "team2_fr": "Équateur"}, {"id": 12, "round": "Matchday 4", "date": "2026-06-14", "time": "20:00", "team1": "Sweden", "team2": "Tunisia", "group": "Group F", "ground": "Monterrey (Guadalupe)", "score1": 5, "score2": 1, "team1_fr": "Suède", "team2_fr": "Tunisie"}, {"id": 13, "round": "Matchday 5", "date": "2026-06-15", "time": "12:00", "team1": "Belgium", "team2": "Egypt", "group": "Group G", "ground": "Seattle", "score1": 1, "score2": 1, "team1_fr": "Belgique", "team2_fr": "Égypte"}, {"id": 14, "round": "Matchday 5", "date": "2026-06-15", "time": "12:00", "team1": "Spain", "team2": "Cape Verde", "group": "Group H", "ground": "Atlanta", "score1": 0, "score2": 0, "team1_fr": "Espagne", "team2_fr": "Cap-Vert"}, {"id": 15, "round": "Matchday 5", "date": "2026-06-15", "time": "18:00", "team1": "Iran", "team2": "New Zealand", "group": "Group G", "ground": "Los Angeles (Inglewood)", "score1": 2, "score2": 2, "team1_fr": "Iran", "team2_fr": "Nouvelle-Zélande"}, {"id": 16, "round": "Matchday 5", "date": "2026-06-15", "time": "18:00", "team1": "Saudi Arabia", "team2": "Uruguay", "group": "Group H", "ground": "Miami (Miami Gardens)", "score1": 1, "score2": 1, "team1_fr": "Arabie Saoudite", "team2_fr": "Uruguay"}, {"id": 17, "round": "Matchday 6", "date": "2026-06-16", "time": "15:00", "team1": "France", "team2": "Senegal", "group": "Group I", "ground": "New York/New Jersey (East Rutherford)", "score1": 3, "score2": 1, "team1_fr": "France", "team2_fr": "Sénégal"}, {"id": 18, "round": "Matchday 6", "date": "2026-06-16", "time": "18:00", "team1": "Iraq", "team2": "Norway", "group": "Group I", "ground": "Boston (Foxborough)", "score1": 1, "score2": 4, "team1_fr": "Irak", "team2_fr": "Norvège"}, {"id": 19, "round": "Matchday 6", "date": "2026-06-16", "time": "20:00", "team1": "Argentina", "team2": "Algeria", "group": "Group J", "ground": "Kansas City", "score1": 3, "score2": 0, "team1_fr": "Argentine", "team2_fr": "Algérie"}, {"id": 20, "round": "Matchday 6", "date": "2026-06-16", "time": "21:00", "team1": "Austria", "team2": "Jordan", "group": "Group J", "ground": "San Francisco Bay Area (Santa Clara)", "score1": 3, "score2": 1, "team1_fr": "Autriche", "team2_fr": "Jordanie"}, {"id": 21, "round": "Matchday 7", "date": "2026-06-17", "time": "12:00", "team1": "Portugal", "team2": "DR Congo", "group": "Group K", "ground": "Houston", "score1": 1, "score2": 1, "team1_fr": "Portugal", "team2_fr": "RD Congo"}, {"id": 22, "round": "Matchday 7", "date": "2026-06-17", "time": "15:00", "team1": "England", "team2": "Croatia", "group": "Group L", "ground": "Dallas (Arlington)", "score1": 4, "score2": 2, "team1_fr": "Angleterre", "team2_fr": "Croatie"}, {"id": 23, "round": "Matchday 7", "date": "2026-06-17", "time": "19:00", "team1": "Ghana", "team2": "Panama", "group": "Group L", "ground": "Toronto", "score1": 1, "score2": 0, "team1_fr": "Ghana", "team2_fr": "Panama"}, {"id": 24, "round": "Matchday 7", "date": "2026-06-17", "time": "20:00", "team1": "Uzbekistan", "team2": "Colombia", "group": "Group K", "ground": "Mexico City", "score1": 1, "score2": 3, "team1_fr": "Ouzbékistan", "team2_fr": "Colombie"}, {"id": 25, "round": "Matchday 8", "date": "2026-06-18", "time": "12:00", "team1": "Czech Republic", "team2": "South Africa", "group": "Group A", "ground": "Atlanta", "score1": 1, "score2": 1, "team1_fr": "Tchéquie", "team2_fr": "Afrique du Sud"}, {"id": 26, "round": "Matchday 8", "date": "2026-06-18", "time": "12:00", "team1": "Switzerland", "team2": "Bosnia & Herzegovina", "group": "Group B", "ground": "Los Angeles (Inglewood)", "score1": 4, "score2": 1, "team1_fr": "Suisse", "team2_fr": "Bosnie-Herzégovine"}, {"id": 27, "round": "Matchday 8", "date": "2026-06-18", "time": "15:00", "team1": "Canada", "team2": "Qatar", "group": "Group B", "ground": "Vancouver", "score1": 6, "score2": 0, "team1_fr": "Canada", "team2_fr": "Qatar"}, {"id": 28, "round": "Matchday 8", "date": "2026-06-18", "time": "19:00", "team1": "Mexico", "team2": "South Korea", "group": "Group A", "ground": "Guadalajara (Zapopan)", "score1": 1, "score2": 0, "team1_fr": "Mexique", "team2_fr": "Corée du Sud"}, {"id": 29, "round": "Matchday 9", "date": "2026-06-19", "time": "12:00", "team1": "USA", "team2": "Australia", "group": "Group D", "ground": "Seattle", "score1": 2, "score2": 0, "team1_fr": "États-Unis", "team2_fr": "Australie"}, {"id": 30, "round": "Matchday 9", "date": "2026-06-19", "time": "18:00", "team1": "Scotland", "team2": "Morocco", "group": "Group C", "ground": "Boston (Foxborough)", "score1": 0, "score2": 1, "team1_fr": "Écosse", "team2_fr": "Maroc"}, {"id": 31, "round": "Matchday 9", "date": "2026-06-19", "time": "20:00", "team1": "Turkey", "team2": "Paraguay", "group": "Group D", "ground": "San Francisco Bay Area (Santa Clara)", "score1": 0, "score2": 1, "team1_fr": "Turquie", "team2_fr": "Paraguay"}, {"id": 32, "round": "Matchday 9", "date": "2026-06-19", "time": "20:30", "team1": "Brazil", "team2": "Haiti", "group": "Group C", "ground": "Philadelphia", "score1": 3, "score2": 0, "team1_fr": "Brésil", "team2_fr": "Haïti"}, {"id": 33, "round": "Matchday 10", "date": "2026-06-20", "time": "12:00", "team1": "Netherlands", "team2": "Sweden", "group": "Group F", "ground": "Houston", "score1": 5, "score2": 1, "team1_fr": "Pays-Bas", "team2_fr": "Suède"}, {"id": 34, "round": "Matchday 10", "date": "2026-06-20", "time": "16:00", "team1": "Germany", "team2": "Ivory Coast", "group": "Group E", "ground": "Toronto", "score1": 2, "score2": 1, "team1_fr": "Allemagne", "team2_fr": "Côte d'Ivoire"}, {"id": 35, "round": "Matchday 10", "date": "2026-06-20", "time": "19:00", "team1": "Ecuador", "team2": "Curaçao", "group": "Group E", "ground": "Kansas City", "score1": 0, "score2": 0, "team1_fr": "Équateur", "team2_fr": "Curaçao"}, {"id": 36, "round": "Matchday 10", "date": "2026-06-20", "time": "22:00", "team1": "Tunisia", "team2": "Japan", "group": "Group F", "ground": "Monterrey (Guadalupe)", "score1": 0, "score2": 4, "team1_fr": "Tunisie", "team2_fr": "Japon"}, {"id": 37, "round": "Matchday 11", "date": "2026-06-21", "time": "12:00", "team1": "Belgium", "team2": "Iran", "group": "Group G", "ground": "Los Angeles (Inglewood)", "score1": 0, "score2": 0, "team1_fr": "Belgique", "team2_fr": "Iran"}, {"id": 38, "round": "Matchday 11", "date": "2026-06-21", "time": "12:00", "team1": "Spain", "team2": "Saudi Arabia", "group": "Group H", "ground": "Atlanta", "score1": 4, "score2": 0, "team1_fr": "Espagne", "team2_fr": "Arabie Saoudite"}, {"id": 39, "round": "Matchday 11", "date": "2026-06-21", "time": "18:00", "team1": "New Zealand", "team2": "Egypt", "group": "Group G", "ground": "Vancouver", "score1": null, "score2": null, "team1_fr": "Nouvelle-Zélande", "team2_fr": "Égypte"}, {"id": 40, "round": "Matchday 11", "date": "2026-06-21", "time": "18:00", "team1": "Uruguay", "team2": "Cape Verde", "group": "Group H", "ground": "Miami (Miami Gardens)", "score1": null, "score2": null, "team1_fr": "Uruguay", "team2_fr": "Cap-Vert"}, {"id": 41, "round": "Matchday 12", "date": "2026-06-22", "time": "12:00", "team1": "Argentina", "team2": "Austria", "group": "Group J", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "Argentine", "team2_fr": "Autriche"}, {"id": 42, "round": "Matchday 12", "date": "2026-06-22", "time": "17:00", "team1": "France", "team2": "Iraq", "group": "Group I", "ground": "Philadelphia", "score1": null, "score2": null, "team1_fr": "France", "team2_fr": "Irak"}, {"id": 43, "round": "Matchday 12", "date": "2026-06-22", "time": "20:00", "team1": "Norway", "team2": "Senegal", "group": "Group I", "ground": "New York/New Jersey (East Rutherford)", "score1": null, "score2": null, "team1_fr": "Norvège", "team2_fr": "Sénégal"}, {"id": 44, "round": "Matchday 12", "date": "2026-06-22", "time": "20:00", "team1": "Jordan", "team2": "Algeria", "group": "Group J", "ground": "San Francisco Bay Area (Santa Clara)", "score1": null, "score2": null, "team1_fr": "Jordanie", "team2_fr": "Algérie"}, {"id": 45, "round": "Matchday 13", "date": "2026-06-23", "time": "12:00", "team1": "Portugal", "team2": "Uzbekistan", "group": "Group K", "ground": "Houston", "score1": null, "score2": null, "team1_fr": "Portugal", "team2_fr": "Ouzbékistan"}, {"id": 46, "round": "Matchday 13", "date": "2026-06-23", "time": "16:00", "team1": "England", "team2": "Ghana", "group": "Group L", "ground": "Boston (Foxborough)", "score1": null, "score2": null, "team1_fr": "Angleterre", "team2_fr": "Ghana"}, {"id": 47, "round": "Matchday 13", "date": "2026-06-23", "time": "19:00", "team1": "Panama", "team2": "Croatia", "group": "Group L", "ground": "Toronto", "score1": null, "score2": null, "team1_fr": "Panama", "team2_fr": "Croatie"}, {"id": 48, "round": "Matchday 13", "date": "2026-06-23", "time": "20:00", "team1": "Colombia", "team2": "DR Congo", "group": "Group K", "ground": "Guadalajara (Zapopan)", "score1": null, "score2": null, "team1_fr": "Colombie", "team2_fr": "RD Congo"}, {"id": 49, "round": "Matchday 14", "date": "2026-06-24", "time": "12:00", "team1": "Switzerland", "team2": "Canada", "group": "Group B", "ground": "Vancouver", "score1": null, "score2": null, "team1_fr": "Suisse", "team2_fr": "Canada"}, {"id": 50, "round": "Matchday 14", "date": "2026-06-24", "time": "12:00", "team1": "Bosnia & Herzegovina", "team2": "Qatar", "group": "Group B", "ground": "Seattle", "score1": null, "score2": null, "team1_fr": "Bosnie-Herzégovine", "team2_fr": "Qatar"}, {"id": 51, "round": "Matchday 14", "date": "2026-06-24", "time": "18:00", "team1": "Scotland", "team2": "Brazil", "group": "Group C", "ground": "Miami (Miami Gardens)", "score1": null, "score2": null, "team1_fr": "Écosse", "team2_fr": "Brésil"}, {"id": 52, "round": "Matchday 14", "date": "2026-06-24", "time": "18:00", "team1": "Morocco", "team2": "Haiti", "group": "Group C", "ground": "Atlanta", "score1": null, "score2": null, "team1_fr": "Maroc", "team2_fr": "Haïti"}, {"id": 53, "round": "Matchday 14", "date": "2026-06-24", "time": "19:00", "team1": "Czech Republic", "team2": "Mexico", "group": "Group A", "ground": "Mexico City", "score1": null, "score2": null, "team1_fr": "Tchéquie", "team2_fr": "Mexique"}, {"id": 54, "round": "Matchday 14", "date": "2026-06-24", "time": "19:00", "team1": "South Africa", "team2": "South Korea", "group": "Group A", "ground": "Monterrey (Guadalupe)", "score1": null, "score2": null, "team1_fr": "Afrique du Sud", "team2_fr": "Corée du Sud"}, {"id": 55, "round": "Matchday 15", "date": "2026-06-25", "time": "16:00", "team1": "Curaçao", "team2": "Ivory Coast", "group": "Group E", "ground": "Philadelphia", "score1": null, "score2": null, "team1_fr": "Curaçao", "team2_fr": "Côte d'Ivoire"}, {"id": 56, "round": "Matchday 15", "date": "2026-06-25", "time": "16:00", "team1": "Ecuador", "team2": "Germany", "group": "Group E", "ground": "New York/New Jersey (East Rutherford)", "score1": null, "score2": null, "team1_fr": "Équateur", "team2_fr": "Allemagne"}, {"id": 57, "round": "Matchday 15", "date": "2026-06-25", "time": "18:00", "team1": "Japan", "team2": "Sweden", "group": "Group F", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "Japon", "team2_fr": "Suède"}, {"id": 58, "round": "Matchday 15", "date": "2026-06-25", "time": "18:00", "team1": "Tunisia", "team2": "Netherlands", "group": "Group F", "ground": "Kansas City", "score1": null, "score2": null, "team1_fr": "Tunisie", "team2_fr": "Pays-Bas"}, {"id": 59, "round": "Matchday 15", "date": "2026-06-25", "time": "19:00", "team1": "Turkey", "team2": "USA", "group": "Group D", "ground": "Los Angeles (Inglewood)", "score1": null, "score2": null, "team1_fr": "Turquie", "team2_fr": "États-Unis"}, {"id": 60, "round": "Matchday 15", "date": "2026-06-25", "time": "19:00", "team1": "Paraguay", "team2": "Australia", "group": "Group D", "ground": "San Francisco Bay Area (Santa Clara)", "score1": null, "score2": null, "team1_fr": "Paraguay", "team2_fr": "Australie"}, {"id": 61, "round": "Matchday 16", "date": "2026-06-26", "time": "15:00", "team1": "Norway", "team2": "France", "group": "Group I", "ground": "Boston (Foxborough)", "score1": null, "score2": null, "team1_fr": "Norvège", "team2_fr": "France"}, {"id": 62, "round": "Matchday 16", "date": "2026-06-26", "time": "15:00", "team1": "Senegal", "team2": "Iraq", "group": "Group I", "ground": "Toronto", "score1": null, "score2": null, "team1_fr": "Sénégal", "team2_fr": "Irak"}, {"id": 63, "round": "Matchday 16", "date": "2026-06-26", "time": "18:00", "team1": "Uruguay", "team2": "Spain", "group": "Group H", "ground": "Guadalajara (Zapopan)", "score1": null, "score2": null, "team1_fr": "Uruguay", "team2_fr": "Espagne"}, {"id": 64, "round": "Matchday 16", "date": "2026-06-26", "time": "19:00", "team1": "Cape Verde", "team2": "Saudi Arabia", "group": "Group H", "ground": "Houston", "score1": null, "score2": null, "team1_fr": "Cap-Vert", "team2_fr": "Arabie Saoudite"}, {"id": 65, "round": "Matchday 16", "date": "2026-06-26", "time": "20:00", "team1": "Egypt", "team2": "Iran", "group": "Group G", "ground": "Seattle", "score1": null, "score2": null, "team1_fr": "Égypte", "team2_fr": "Iran"}, {"id": 66, "round": "Matchday 16", "date": "2026-06-26", "time": "20:00", "team1": "New Zealand", "team2": "Belgium", "group": "Group G", "ground": "Vancouver", "score1": null, "score2": null, "team1_fr": "Nouvelle-Zélande", "team2_fr": "Belgique"}, {"id": 67, "round": "Matchday 17", "date": "2026-06-27", "time": "17:00", "team1": "Panama", "team2": "England", "group": "Group L", "ground": "New York/New Jersey (East Rutherford)", "score1": null, "score2": null, "team1_fr": "Panama", "team2_fr": "Angleterre"}, {"id": 68, "round": "Matchday 17", "date": "2026-06-27", "time": "17:00", "team1": "Croatia", "team2": "Ghana", "group": "Group L", "ground": "Philadelphia", "score1": null, "score2": null, "team1_fr": "Croatie", "team2_fr": "Ghana"}, {"id": 69, "round": "Matchday 17", "date": "2026-06-27", "time": "19:30", "team1": "Colombia", "team2": "Portugal", "group": "Group K", "ground": "Miami (Miami Gardens)", "score1": null, "score2": null, "team1_fr": "Colombie", "team2_fr": "Portugal"}, {"id": 70, "round": "Matchday 17", "date": "2026-06-27", "time": "19:30", "team1": "DR Congo", "team2": "Uzbekistan", "group": "Group K", "ground": "Atlanta", "score1": null, "score2": null, "team1_fr": "RD Congo", "team2_fr": "Ouzbékistan"}, {"id": 71, "round": "Matchday 17", "date": "2026-06-27", "time": "21:00", "team1": "Algeria", "team2": "Austria", "group": "Group J", "ground": "Kansas City", "score1": null, "score2": null, "team1_fr": "Algérie", "team2_fr": "Autriche"}, {"id": 72, "round": "Matchday 17", "date": "2026-06-27", "time": "21:00", "team1": "Jordan", "team2": "Argentina", "group": "Group J", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "Jordanie", "team2_fr": "Argentine"}, {"id": 73, "round": "Round of 32", "date": "2026-06-28", "time": "12:00", "team1": "2A", "team2": "2B", "group": "Round of 32", "ground": "Los Angeles (Inglewood)", "score1": null, "score2": null, "team1_fr": "2A", "team2_fr": "2B"}, {"id": 74, "round": "Round of 32", "date": "2026-06-29", "time": "12:00", "team1": "1C", "team2": "2F", "group": "Round of 32", "ground": "Houston", "score1": null, "score2": null, "team1_fr": "1C", "team2_fr": "2F"}, {"id": 75, "round": "Round of 32", "date": "2026-06-29", "time": "16:30", "team1": "1E", "team2": "3A/B/C/D/F", "group": "Round of 32", "ground": "Boston (Foxborough)", "score1": null, "score2": null, "team1_fr": "1E", "team2_fr": "3A/B/C/D/F"}, {"id": 76, "round": "Round of 32", "date": "2026-06-29", "time": "19:00", "team1": "1F", "team2": "2C", "group": "Round of 32", "ground": "Monterrey (Guadalupe)", "score1": null, "score2": null, "team1_fr": "1F", "team2_fr": "2C"}, {"id": 77, "round": "Round of 32", "date": "2026-06-30", "time": "12:00", "team1": "2E", "team2": "2I", "group": "Round of 32", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "2E", "team2_fr": "2I"}, {"id": 78, "round": "Round of 32", "date": "2026-06-30", "time": "17:00", "team1": "1I", "team2": "3C/D/F/G/H", "group": "Round of 32", "ground": "New York/New Jersey (East Rutherford)", "score1": null, "score2": null, "team1_fr": "1I", "team2_fr": "3C/D/F/G/H"}, {"id": 79, "round": "Round of 32", "date": "2026-06-30", "time": "19:00", "team1": "1A", "team2": "3C/E/F/H/I", "group": "Round of 32", "ground": "Mexico City", "score1": null, "score2": null, "team1_fr": "1A", "team2_fr": "3C/E/F/H/I"}, {"id": 80, "round": "Round of 32", "date": "2026-07-01", "time": "12:00", "team1": "1L", "team2": "3E/H/I/J/K", "group": "Round of 32", "ground": "Atlanta", "score1": null, "score2": null, "team1_fr": "1L", "team2_fr": "3E/H/I/J/K"}, {"id": 81, "round": "Round of 32", "date": "2026-07-01", "time": "13:00", "team1": "1G", "team2": "3A/E/H/I/J", "group": "Round of 32", "ground": "Seattle", "score1": null, "score2": null, "team1_fr": "1G", "team2_fr": "3A/E/H/I/J"}, {"id": 82, "round": "Round of 32", "date": "2026-07-01", "time": "17:00", "team1": "1D", "team2": "3B/E/F/I/J", "group": "Round of 32", "ground": "San Francisco Bay Area (Santa Clara)", "score1": null, "score2": null, "team1_fr": "1D", "team2_fr": "3B/E/F/I/J"}, {"id": 83, "round": "Round of 32", "date": "2026-07-02", "time": "12:00", "team1": "1H", "team2": "2J", "group": "Round of 32", "ground": "Los Angeles (Inglewood)", "score1": null, "score2": null, "team1_fr": "1H", "team2_fr": "2J"}, {"id": 84, "round": "Round of 32", "date": "2026-07-02", "time": "19:00", "team1": "2K", "team2": "2L", "group": "Round of 32", "ground": "Toronto", "score1": null, "score2": null, "team1_fr": "2K", "team2_fr": "2L"}, {"id": 85, "round": "Round of 32", "date": "2026-07-02", "time": "20:00", "team1": "1B", "team2": "3E/F/G/I/J", "group": "Round of 32", "ground": "Vancouver", "score1": null, "score2": null, "team1_fr": "1B", "team2_fr": "3E/F/G/I/J"}, {"id": 86, "round": "Round of 32", "date": "2026-07-03", "time": "13:00", "team1": "2D", "team2": "2G", "group": "Round of 32", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "2D", "team2_fr": "2G"}, {"id": 87, "round": "Round of 32", "date": "2026-07-03", "time": "18:00", "team1": "1J", "team2": "2H", "group": "Round of 32", "ground": "Miami (Miami Gardens)", "score1": null, "score2": null, "team1_fr": "1J", "team2_fr": "2H"}, {"id": 88, "round": "Round of 32", "date": "2026-07-03", "time": "20:30", "team1": "1K", "team2": "3D/E/I/J/L", "group": "Round of 32", "ground": "Kansas City", "score1": null, "score2": null, "team1_fr": "1K", "team2_fr": "3D/E/I/J/L"}, {"id": 89, "round": "Round of 16", "date": "2026-07-04", "time": "12:00", "team1": "W73", "team2": "W75", "group": "Round of 16", "ground": "Houston", "score1": null, "score2": null, "team1_fr": "W73", "team2_fr": "W75"}, {"id": 90, "round": "Round of 16", "date": "2026-07-04", "time": "17:00", "team1": "W74", "team2": "W77", "group": "Round of 16", "ground": "Philadelphia", "score1": null, "score2": null, "team1_fr": "W74", "team2_fr": "W77"}, {"id": 91, "round": "Round of 16", "date": "2026-07-05", "time": "16:00", "team1": "W76", "team2": "W78", "group": "Round of 16", "ground": "New York/New Jersey (East Rutherford)", "score1": null, "score2": null, "team1_fr": "W76", "team2_fr": "W78"}, {"id": 92, "round": "Round of 16", "date": "2026-07-05", "time": "18:00", "team1": "W79", "team2": "W80", "group": "Round of 16", "ground": "Mexico City", "score1": null, "score2": null, "team1_fr": "W79", "team2_fr": "W80"}, {"id": 93, "round": "Round of 16", "date": "2026-07-06", "time": "14:00", "team1": "W83", "team2": "W84", "group": "Round of 16", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "W83", "team2_fr": "W84"}, {"id": 94, "round": "Round of 16", "date": "2026-07-06", "time": "17:00", "team1": "W81", "team2": "W82", "group": "Round of 16", "ground": "Seattle", "score1": null, "score2": null, "team1_fr": "W81", "team2_fr": "W82"}, {"id": 95, "round": "Round of 16", "date": "2026-07-07", "time": "12:00", "team1": "W86", "team2": "W88", "group": "Round of 16", "ground": "Atlanta", "score1": null, "score2": null, "team1_fr": "W86", "team2_fr": "W88"}, {"id": 96, "round": "Round of 16", "date": "2026-07-07", "time": "13:00", "team1": "W85", "team2": "W87", "group": "Round of 16", "ground": "Vancouver", "score1": null, "score2": null, "team1_fr": "W85", "team2_fr": "W87"}, {"id": 97, "round": "Quarter-final", "date": "2026-07-09", "time": "16:00", "team1": "W89", "team2": "W90", "group": "Quarter-final", "ground": "Boston (Foxborough)", "score1": null, "score2": null, "team1_fr": "W89", "team2_fr": "W90"}, {"id": 98, "round": "Quarter-final", "date": "2026-07-10", "time": "12:00", "team1": "W93", "team2": "W94", "group": "Quarter-final", "ground": "Los Angeles (Inglewood)", "score1": null, "score2": null, "team1_fr": "W93", "team2_fr": "W94"}, {"id": 99, "round": "Quarter-final", "date": "2026-07-11", "time": "17:00", "team1": "W91", "team2": "W92", "group": "Quarter-final", "ground": "Miami (Miami Gardens)", "score1": null, "score2": null, "team1_fr": "W91", "team2_fr": "W92"}, {"id": 100, "round": "Quarter-final", "date": "2026-07-11", "time": "20:00", "team1": "W95", "team2": "W96", "group": "Quarter-final", "ground": "Kansas City", "score1": null, "score2": null, "team1_fr": "W95", "team2_fr": "W96"}, {"id": 101, "round": "Semi-final", "date": "2026-07-14", "time": "14:00", "team1": "W97", "team2": "W98", "group": "Semi-final", "ground": "Dallas (Arlington)", "score1": null, "score2": null, "team1_fr": "W97", "team2_fr": "W98"}, {"id": 102, "round": "Semi-final", "date": "2026-07-15", "time": "15:00", "team1": "W99", "team2": "W100", "group": "Semi-final", "ground": "Atlanta", "score1": null, "score2": null, "team1_fr": "W99", "team2_fr": "W100"}, {"id": 103, "round": "Match for third place", "date": "2026-07-18", "time": "17:00", "team1": "L101", "team2": "L102", "group": "Match for third place", "ground": "Miami (Miami Gardens)", "score1": null, "score2": null, "team1_fr": "L101", "team2_fr": "L102"}, {"id": 104, "round": "Final", "date": "2026-07-19", "time": "15:00", "team1": "W101", "team2": "W102", "group": "Final", "ground": "New York/New Jersey (East Rutherford)", "score1": null, "score2": null, "team1_fr": "W101", "team2_fr": "W102"}];

// ---------- Constantes & helpers ----------

const GROUPS = ["Group A","Group B","Group C","Group D","Group E","Group F","Group G","Group H","Group I","Group J","Group K","Group L"];

const ROUND_LABELS = {
  "Round of 32": "16es de finale",
  "Round of 16": "8es de finale",
  "Quarter-final": "Quart de finale",
  "Semi-final": "Demi-finale",
  "Final": "Finale",
  "Match for third place": "Match pour la 3e place",
};

function roundLabel(m) {
  if (m.group && m.group.startsWith("Group")) {
    return `Groupe ${m.group.replace("Group ", "")}`;
  }
  return ROUND_LABELS[m.round] || m.round;
}

function isPlaceholder(name) {
  // codes provisoires type "2A", "1C", "W74", "L101", "3A/B/C/D/F"...
  return /^[A-Z0-9][A-Z0-9/]*$/.test(name) && name.length <= 12 && !/^[A-Za-zÀ-ÿ' -]{4,}$/.test(name);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" });
}

function computeOutcome(s1, s2) {
  if (s1 === s2) return "N";
  return s1 > s2 ? "1" : "2";
}

// Points selon la règle validée : bon résultat = 1pt, score exact = 3pts, faux = 0
function computePoints(predS1, predS2, realS1, realS2) {
  if (predS1 == null || predS2 == null || realS1 == null || realS2 == null) return 0;
  if (predS1 === realS1 && predS2 === realS2) return 3;
  if (computeOutcome(predS1, predS2) === computeOutcome(realS1, realS2)) return 1;
  return 0;
}

const STORAGE_KEY = "wc2026_pronos_v1";

function loadState() {
  try {
    const raw = localStorageSafeGet();
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Persistance réelle sur l'appareil (localStorage du navigateur).
// L'historique des pronostics est donc conservé même après fermeture de l'appli.
function localStorageSafeGet() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function localStorageSafeSet(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // stockage indisponible (mode privé, quota...) : on continue sans persister
  }
}

// ---------- Composant principal ----------

export default function App() {
  const [player, setPlayer] = useState(null); // nom du joueur courant
  const [predictions, setPredictions] = useState({}); // { matchId: { player: {s1,s2} } }
  const [view, setView] = useState("matches"); // matches | leaderboard | data
  const [filterGroup, setFilterGroup] = useState("all");
  const [toast, setToast] = useState(null);
  const [showSplash, setShowSplash] = useState(true); // écran d'accueil avec caricature
  const fileInputRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false); // évite d'écraser le localStorage avant la fin du chargement initial

  // Charger l'état sauvegardé au montage
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setPredictions(saved.predictions || {});
      if (saved.player) setPlayer(saved.player);
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder à chaque changement (seulement après le chargement initial, pour ne pas écraser
  // les données existantes avec l'état vide du tout premier rendu)
  useEffect(() => {
    if (!isLoaded) return;
    localStorageSafeSet(JSON.stringify({ predictions, player }));
  }, [predictions, player, isLoaded]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function setPrediction(matchId, s1, s2) {
    if (!player) return;
    const match = matchesData.find((m) => m.id === matchId);
    if (match && match.score1 != null) return; // verrou : match déjà joué, non modifiable

    setPredictions((prev) => {
      const existing = prev[matchId]?.[player];
      if (existing && existing.locked) return prev; // verrou : déjà validé, plus jamais modifiable
      const next = { ...prev };
      next[matchId] = { ...(next[matchId] || {}) };
      next[matchId][player] = { s1, s2, locked: true, validatedAt: new Date().toISOString() };
      return next;
    });
  }

  function exportData() {
    const payload = {
      exportedBy: player,
      exportedAt: new Date().toISOString(),
      predictions,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pronostics_${player || "joueur"}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Export effectué ✓");
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.predictions) throw new Error("Format invalide");
        setPredictions((prev) => {
          const merged = { ...prev };
          for (const [matchId, byPlayer] of Object.entries(data.predictions)) {
            const lockedByPlayer = {};
            for (const [p, pred] of Object.entries(byPlayer)) {
              // toute prédiction importée est considérée comme définitive et verrouillée
              lockedByPlayer[p] = { ...pred, locked: true };
            }
            merged[matchId] = { ...(merged[matchId] || {}), ...lockedByPlayer };
          }
          return merged;
        });
        showToast(`Import réussi (données de ${data.exportedBy || "un joueur"}) ✓`);
      } catch (err) {
        showToast("Erreur : fichier invalide");
      }
    };
    reader.readAsText(file);
  }

  // Liste des joueurs détectés dans les pronostics + joueur courant
  const allPlayers = useMemo(() => {
    const set = new Set();
    if (player) set.add(player);
    Object.values(predictions).forEach((byPlayer) => {
      Object.keys(byPlayer).forEach((p) => set.add(p));
    });
    return Array.from(set);
  }, [predictions, player]);

  // Classement
  const leaderboard = useMemo(() => {
    const totals = {};
    allPlayers.forEach((p) => (totals[p] = { points: 0, exact: 0, bonSens: 0, joues: 0 }));
    matchesData.forEach((m) => {
      if (m.score1 == null) return;
      const byPlayer = predictions[m.id] || {};
      Object.entries(byPlayer).forEach(([p, pred]) => {
        if (!totals[p]) totals[p] = { points: 0, exact: 0, bonSens: 0, joues: 0 };
        const pts = computePoints(pred.s1, pred.s2, m.score1, m.score2);
        totals[p].points += pts;
        totals[p].joues += 1;
        if (pts === 3) totals[p].exact += 1;
        else if (pts === 1) totals[p].bonSens += 1;
      });
    });
    return Object.entries(totals)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.points - a.points);
  }, [predictions, allPlayers]);

  const filteredMatches = useMemo(() => {
    if (filterGroup === "all") return matchesData;
    if (filterGroup === "knockout") return matchesData.filter((m) => !m.group?.startsWith("Group"));
    return matchesData.filter((m) => m.group === filterGroup);
  }, [filterGroup]);

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />;
  }

  if (!player) {
    return <PlayerGate onSelect={setPlayer} />;
  }

  return (
    <div style={styles.app}>
      <Header player={player} onSwitch={() => setPlayer(null)} />
      <NavTabs view={view} setView={setView} />

      {view === "matches" && (
        <MatchList
          matches={filteredMatches}
          predictions={predictions}
          player={player}
          setPrediction={setPrediction}
          filterGroup={filterGroup}
          setFilterGroup={setFilterGroup}
        />
      )}

      {view === "leaderboard" && <Leaderboard leaderboard={leaderboard} />}

      {view === "data" && (
        <DataPanel
          onExport={exportData}
          onImportClick={() => fileInputRef.current?.click()}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) importData(file);
          e.target.value = "";
        }}
      />

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}

// ---------- Écran d'accueil (splash) ----------

function SplashScreen({ onStart }) {
  return (
    <div style={styles.splashScreen}>
      <div style={styles.splashGlowGreen} />
      <div style={styles.splashGlowGold} />

      <div style={styles.splashStickerTL}>⚽</div>
      <div style={styles.splashStickerTR}>🏆</div>
      <div style={styles.splashStickerBL}>🇲🇦</div>

      <div style={styles.splashBoard}>
        <div style={styles.splashKicker}>COUPE DU MONDE 2026</div>

        <div style={styles.splashCaricature}>
          <OverthinkerCaricature size={210} />
        </div>

        <p style={styles.splashSlogan} dir="rtl" lang="ar">
          قلعها إيلا كنتي راجل، جيبها يا القمار ✅️
        </p>

        <div style={styles.splashStripe}>
          <span style={{ ...styles.stripeBar, background: COLORS.green }} />
          <span style={{ ...styles.stripeBar, background: COLORS.gold }} />
          <span style={{ ...styles.stripeBar, background: "#101418" }} />
        </div>

        <button style={styles.btnStart} onClick={onStart}>
          Commencer
        </button>
      </div>
    </div>
  );
}

// ---------- Écran de sélection du joueur ----------

function PlayerGate({ onSelect }) {
  const [name, setName] = useState("");
  return (
    <div style={styles.gateScreen}>
      <div style={styles.gateGlow} />
      <div style={styles.splashStickerTR}>⚽</div>
      <div style={styles.gateBoard}>
        <div style={styles.gateKicker}>COUPE DU MONDE 2026</div>
        <h1 style={styles.gateTitle}>PRONOS</h1>
        <p style={styles.gateSub}>Entrez votre pseudo pour commencer</p>
        <input
          style={styles.gateInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) onSelect(name.trim()); }}
          autoFocus
        />
        <button
          style={{ ...styles.btnPrimary, opacity: name.trim() ? 1 : 0.4, marginTop: 16, width: "100%" }}
          disabled={!name.trim()}
          onClick={() => onSelect(name.trim())}
        >
          Entrer
        </button>
      </div>
    </div>
  );
}

// ---------- Header ----------

function Header({ player, onSwitch }) {
  return (
    <div style={styles.header}>
      <div>
        <div style={styles.headerKicker}>⚽ COUPE DU MONDE 2026</div>
        <div style={styles.headerTitle}>PRONOS</div>
      </div>
      <button style={styles.playerChip} onClick={onSwitch} title="Changer de joueur">
        {player.slice(0, 1).toUpperCase()}
      </button>
    </div>
  );
}

function NavTabs({ view, setView }) {
  const tabs = [
    { id: "matches", label: "Matchs" },
    { id: "leaderboard", label: "Classement" },
    { id: "data", label: "Échange" },
  ];
  return (
    <div style={styles.tabs}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setView(t.id)}
          style={{
            ...styles.tab,
            ...(view === t.id ? styles.tabActive : {}),
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ---------- Liste des matchs ----------

function MatchList({ matches, predictions, player, setPrediction, filterGroup, setFilterGroup }) {
  return (
    <div style={styles.content}>
      <div style={styles.filterRow}>
        <select
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}
          style={styles.select}
        >
          <option value="all">Tous les matchs (104)</option>
          <option value="knockout">Phases finales</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>Groupe {g.replace("Group ", "")}</option>
          ))}
        </select>
      </div>

      {matches.map((m) => (
        <MatchCard
          key={m.id}
          match={m}
          myPred={predictions[m.id]?.[player]}
          othersPreds={predictions[m.id] || {}}
          player={player}
          onSave={(s1, s2) => setPrediction(m.id, s1, s2)}
        />
      ))}
    </div>
  );
}

function MatchCard({ match, myPred, othersPreds, player, onSave }) {
  const played = match.score1 != null;
  const predictionLocked = !!myPred?.locked; // verrou permanent dès validation par le joueur
  const locked = played || predictionLocked;
  const p1 = isPlaceholder(match.team1) ? match.team1 : match.team1_fr;
  const p2 = isPlaceholder(match.team2) ? match.team2 : match.team2_fr;

  const [s1, setS1] = useState(myPred?.s1 ?? "");
  const [s2, setS2] = useState(myPred?.s2 ?? "");

  useEffect(() => {
    setS1(myPred?.s1 ?? "");
    setS2(myPred?.s2 ?? "");
  }, [myPred?.s1, myPred?.s2]);

  const canPredict = !locked && !isPlaceholder(match.team1) && !isPlaceholder(match.team2);
  const hasSavedPred = myPred && myPred.s1 !== "" && myPred.s1 != null;

  let earnedPoints = null;
  if (played && hasSavedPred) {
    earnedPoints = computePoints(myPred.s1, myPred.s2, match.score1, match.score2);
  }

  function handleSave() {
    if (s1 === "" || s2 === "") return;
    onSave(Number(s1), Number(s2));
  }

  // Autres joueurs ayant pronostiqué ce match (hors moi)
  const others = Object.entries(othersPreds).filter(([name]) => name !== player);

  return (
    <div style={{ ...styles.card, ...(locked ? styles.cardLocked : {}) }}>
      <div style={styles.cardMeta}>
        <span>{roundLabel(match)}</span>
        <span>{formatDate(match.date)} · {match.time}</span>
      </div>

      <div style={styles.cardTeams}>
        <span style={styles.teamName}>{p1}</span>
        <ScoreDisplay
          played={played}
          locked={locked}
          score1={match.score1}
          score2={match.score2}
          s1={s1}
          s2={s2}
          setS1={setS1}
          setS2={setS2}
          canPredict={canPredict}
        />
        <span style={styles.teamName}>{p2}</span>
      </div>

      <div style={styles.cardGround}>{match.ground}</div>

      {canPredict && (
        <button
          style={{ ...styles.btnSave, opacity: s1 !== "" && s2 !== "" ? 1 : 0.4 }}
          disabled={s1 === "" || s2 === ""}
          onClick={handleSave}
        >
          Valider mon pronostic
        </button>
      )}

      {!canPredict && !played && !predictionLocked && (
        <div style={styles.pendingNote}>Équipes pas encore connues</div>
      )}

      {predictionLocked && !played && (
        <div style={styles.lockedRow}>
          <span style={styles.lockedTagPending}>✅️ Pronostic validé — verrouillé</span>
        </div>
      )}

      {played && (
        <div style={styles.lockedRow}>
          <span style={styles.lockedTag}>🔒 Terminé</span>
          {hasSavedPred && (
            <span style={{ ...styles.pointsTag, ...(earnedPoints === 3 ? styles.pointsExact : earnedPoints === 1 ? styles.pointsBon : styles.pointsZero) }}>
              {earnedPoints === 3 ? "Score exact · +3 pts" : earnedPoints === 1 ? "Bon résultat · +1 pt" : "0 pt"}
            </span>
          )}
        </div>
      )}

      {others.length > 0 && (
        <div style={styles.othersRow}>
          {others.map(([name, pred]) => (
            <span key={name} style={styles.otherChip}>
              {name}: {pred.s1}-{pred.s2}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ScoreDisplay({ played, locked, score1, score2, s1, s2, setS1, setS2, canPredict }) {
  if (locked) {
    const showS1 = played ? score1 : s1;
    const showS2 = played ? score2 : s2;
    return (
      <div style={styles.scoreBoard}>
        <span style={styles.digit}>{showS1}</span>
        <span style={styles.scoreDash}>–</span>
        <span style={styles.digit}>{showS2}</span>
      </div>
    );
  }
  if (!canPredict) {
    return (
      <div style={styles.scoreBoard}>
        <span style={styles.digitMuted}>?</span>
        <span style={styles.scoreDash}>–</span>
        <span style={styles.digitMuted}>?</span>
      </div>
    );
  }
  return (
    <div style={styles.scoreBoard}>
      <input
        type="number"
        min="0"
        max="20"
        inputMode="numeric"
        style={styles.scoreInput}
        value={s1}
        onChange={(e) => setS1(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
      />
      <span style={styles.scoreDash}>–</span>
      <input
        type="number"
        min="0"
        max="20"
        inputMode="numeric"
        style={styles.scoreInput}
        value={s2}
        onChange={(e) => setS2(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
      />
    </div>
  );
}

// ---------- Classement ----------

function Leaderboard({ leaderboard }) {
  if (leaderboard.length === 0) {
    return <div style={styles.content}><EmptyState text="Aucun pronostic enregistré encore." /></div>;
  }
  return (
    <div style={styles.content}>
      <div style={styles.lbHeader}>
        <span>🏆 Joueur</span>
        <span>Pts</span>
      </div>
      {leaderboard.map((row, i) => (
        <div key={row.name} style={styles.lbRow}>
          <div style={styles.lbRank}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</div>
          <div style={styles.lbName}>{row.name}</div>
          <div style={styles.lbPoints}>{row.points}</div>
          <div style={styles.lbDetail}>
            {row.exact} score{row.exact !== 1 ? "s" : ""} exact{row.exact !== 1 ? "s" : ""} · {row.bonSens} bon{row.bonSens !== 1 ? "s" : ""} résultat{row.bonSens !== 1 ? "s" : ""} · {row.joues} match{row.joues !== 1 ? "s" : ""} jugé{row.joues !== 1 ? "s" : ""}
          </div>
        </div>
      ))}
      <div style={styles.lbRules}>
        Barème : résultat correct (victoire/nul/défaite) = 1 pt · score exact = 3 pts · pronostic faux = 0 pt.
      </div>
    </div>
  );
}

// ---------- Panneau d'échange de données ----------

function DataPanel({ onExport, onImportClick }) {
  return (
    <div style={styles.content}>
      <div style={styles.dataCard}>
        <h3 style={styles.dataTitle}>Partager mes pronostics</h3>
        <p style={styles.dataText}>
          Téléchargez un fichier contenant vos pronostics, puis envoyez-le à l'autre joueur
          (par message, e-mail, etc.) pour qu'il l'importe de son côté.
        </p>
        <button style={styles.btnPrimary} onClick={onExport}>Exporter mes pronostics (.json)</button>
      </div>

      <div style={styles.dataCard}>
        <h3 style={styles.dataTitle}>Importer les pronostics reçus</h3>
        <p style={styles.dataText}>
          Sélectionnez le fichier .json reçu de l'autre joueur. Ses pronostics seront ajoutés
          au classement sans modifier les vôtres.
        </p>
        <button style={styles.btnSecondary} onClick={onImportClick}>Importer un fichier .json</button>
      </div>

      <div style={styles.dataNote}>
        Vos pronostics sont sauvegardés automatiquement sur cet appareil (même après
        fermeture de l'appli). Pour les partager avec d'autres joueurs, utilisez l'export
        et l'import ci-dessus.
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return <div style={styles.empty}>{text}</div>;
}

// ---------- Styles ----------

const COLORS = {
  bg: "#0B0E0C",
  bgCard: "#141914",
  bgCardLocked: "#101310",
  border: "#262E26",
  accent: "#E8B84B",
  green: "#1FA055",
  greenDark: "#0F7A3E",
  gold: "#E8B84B",
  text: "#F5F2EA",
  textMuted: "#9AA39A",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Inter', -apple-system, sans-serif",
    paddingBottom: 32,
  },
  gateScreen: {
    minHeight: "100vh",
    background: `radial-gradient(circle at 50% 20%, #142016 0%, ${COLORS.bg} 70%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  gateGlow: {
    position: "absolute",
    top: "-20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 500,
    height: 500,
    background: `radial-gradient(circle, ${COLORS.green}33 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  gateBoard: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 360,
    padding: "0 24px",
    textAlign: "center",
  },
  gateKicker: {
    fontSize: 12,
    letterSpacing: 3,
    color: COLORS.gold,
    fontWeight: 700,
    marginBottom: 8,
  },
  gateTitle: {
    fontFamily: "'Oswald', 'Inter', sans-serif",
    fontSize: 56,
    fontWeight: 700,
    letterSpacing: 4,
    margin: 0,
    color: COLORS.text,
    textShadow: `0 0 30px ${COLORS.accent}55`,
  },
  gateSub: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 28,
  },
  gateInput: {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    borderRadius: 10,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.bgCard,
    color: COLORS.text,
    boxSizing: "border-box",
    outline: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px 16px",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  headerKicker: {
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.gold,
    fontWeight: 700,
  },
  headerTitle: {
    fontFamily: "'Oswald', 'Inter', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 2,
  },
  playerChip: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: COLORS.accent,
    color: "#1a1305",
    border: "none",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },
  tabs: {
    display: "flex",
    gap: 4,
    padding: "12px 16px",
    position: "sticky",
    top: 0,
    background: COLORS.bg,
    zIndex: 5,
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  tabActive: {
    background: COLORS.accent,
    color: "#1a1305",
    borderColor: COLORS.accent,
  },
  content: {
    padding: "8px 16px 24px",
    maxWidth: 480,
    margin: "0 auto",
  },
  filterRow: { marginBottom: 14 },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.bgCard,
    color: COLORS.text,
    fontSize: 14,
  },
  card: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 12,
  },
  cardLocked: {
    background: COLORS.bgCardLocked,
  },
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTeams: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  cardGround: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 10,
    textAlign: "center",
  },
  scoreBoard: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#070A07",
    borderRadius: 8,
    padding: "6px 8px",
  },
  digit: {
    fontFamily: "'Oswald', monospace",
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.gold,
    width: 28,
    textAlign: "center",
  },
  digitMuted: {
    fontFamily: "'Oswald', monospace",
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.textMuted,
    width: 28,
    textAlign: "center",
  },
  scoreDash: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  scoreInput: {
    width: 36,
    height: 36,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "'Oswald', monospace",
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.accent}`,
    borderRadius: 6,
    color: COLORS.text,
    outline: "none",
  },
  btnSave: {
    width: "100%",
    marginTop: 12,
    padding: "10px 0",
    background: COLORS.accent,
    color: "#1a1305",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "12px 0",
    background: COLORS.accent,
    color: "#1a1305",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
  },
  btnSecondary: {
    padding: "12px 0",
    background: "transparent",
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
  },
  pendingNote: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "center",
    fontStyle: "italic",
  },
  lockedRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  lockedTag: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  lockedTagPending: {
    fontSize: 11,
    color: COLORS.green,
    fontWeight: 700,
  },
  pointsTag: {
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 6,
  },
  pointsExact: { background: COLORS.gold, color: "#1a1305" },
  pointsBon: { background: COLORS.green, color: "#fff" },
  pointsZero: { background: COLORS.border, color: COLORS.textMuted },
  othersRow: {
    display: "flex",
    gap: 6,
    marginTop: 10,
    flexWrap: "wrap",
  },
  otherChip: {
    fontSize: 11,
    background: "#16201A",
    color: COLORS.textMuted,
    padding: "4px 8px",
    borderRadius: 6,
  },
  lbHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: COLORS.textMuted,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    padding: "0 4px 8px",
  },
  lbRow: {
    display: "grid",
    gridTemplateColumns: "32px 1fr auto",
    gridTemplateRows: "auto auto",
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 10,
    alignItems: "center",
  },
  lbRank: { fontSize: 18 },
  lbName: { fontSize: 16, fontWeight: 700 },
  lbPoints: {
    fontFamily: "'Oswald', monospace",
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.gold,
    gridColumn: "3",
  },
  lbDetail: {
    gridColumn: "2 / 4",
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  lbRules: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 1.5,
  },
  dataCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  },
  dataTitle: {
    fontSize: 15,
    fontWeight: 700,
    margin: "0 0 8px",
  },
  dataText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 1.5,
    margin: "0 0 14px",
  },
  dataNote: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 1.5,
  },
  toast: {
    position: "fixed",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    background: COLORS.green,
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  empty: {
    textAlign: "center",
    color: COLORS.textMuted,
    padding: "60px 20px",
    fontSize: 14,
  },

  // ---- Splash screen ----
  splashScreen: {
    minHeight: "100vh",
    background: `radial-gradient(circle at 50% 15%, #142016 0%, ${COLORS.bg} 65%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  splashGlowGreen: {
    position: "absolute",
    top: "-15%",
    left: "-10%",
    width: 420,
    height: 420,
    background: `radial-gradient(circle, ${COLORS.green}3a 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  splashGlowGold: {
    position: "absolute",
    bottom: "-15%",
    right: "-10%",
    width: 420,
    height: 420,
    background: `radial-gradient(circle, ${COLORS.gold}2a 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  splashStickerTL: {
    position: "absolute",
    top: "8%",
    left: "8%",
    fontSize: 30,
    opacity: 0.35,
    transform: "rotate(-12deg)",
  },
  splashStickerTR: {
    position: "absolute",
    top: "10%",
    right: "9%",
    fontSize: 34,
    opacity: 0.4,
    transform: "rotate(10deg)",
  },
  splashStickerBL: {
    position: "absolute",
    bottom: "10%",
    left: "10%",
    fontSize: 30,
    opacity: 0.35,
    transform: "rotate(6deg)",
  },
  splashBoard: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 380,
    padding: "0 24px",
    textAlign: "center",
  },
  splashKicker: {
    fontSize: 12,
    letterSpacing: 3,
    color: COLORS.gold,
    fontWeight: 700,
    marginBottom: 18,
  },
  splashCaricature: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 18,
  },
  splashSlogan: {
    fontFamily: "'Tahoma', 'Segoe UI', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.7,
    color: COLORS.text,
    margin: "0 0 26px",
    textShadow: `0 0 24px ${COLORS.green}55`,
  },
  splashStripe: {
    display: "flex",
    width: 120,
    height: 6,
    borderRadius: 4,
    overflow: "hidden",
    margin: "0 auto 26px",
  },
  stripeBar: {
    flex: 1,
  },
  btnStart: {
    width: "100%",
    padding: "16px 0",
    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 1,
    cursor: "pointer",
    boxShadow: `0 8px 24px ${COLORS.green}44`,
  },
};
