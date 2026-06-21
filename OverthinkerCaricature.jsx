// Caricature SVG dessinée à la main : un supporter qui "pense trop" avant de se décider.
function OverthinkerCaricature({ size = 220 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* halo doré */}
      <circle cx="120" cy="118" r="98" fill="url(#haloGrad)" opacity="0.55" />
      <defs>
        <radialGradient id="haloGrad" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#E8B84B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1FA055" />
          <stop offset="100%" stopColor="#137A3F" />
        </linearGradient>
      </defs>

      {/* points d'interrogation flottants */}
      <text x="34" y="58" fontSize="30" fontWeight="800" fill="#E8B84B" fontFamily="Georgia, serif" opacity="0.9">?</text>
      <text x="186" y="44" fontSize="22" fontWeight="800" fill="#E8B84B" fontFamily="Georgia, serif" opacity="0.7">?</text>
      <text x="198" y="84" fontSize="16" fontWeight="800" fill="#F5F2EA" fontFamily="Georgia, serif" opacity="0.6">?</text>

      {/* gouttes de sueur (trop de réflexion) */}
      <path d="M64 70 q5 8 0 13 q-5 -2 -5 -7 q0 -4 5 -6 z" fill="#7FD8FF" opacity="0.85" />
      <path d="M180 100 q4 7 0 11 q-4 -2 -4 -6 q0 -3 4 -5 z" fill="#7FD8FF" opacity="0.7" />

      {/* corps / maillot vert (couleur du drapeau) */}
      <path
        d="M70 232 C70 188 84 168 120 168 C156 168 170 188 170 232 Z"
        fill="url(#bodyGrad)"
      />
      {/* bande jaune du maillot */}
      <rect x="70" y="200" width="100" height="10" fill="#E8B84B" />
      {/* col noir */}
      <path d="M104 170 Q120 184 136 170 L130 168 Q120 176 110 168 Z" fill="#101418" />

      {/* bras gauche replié, main sur la tête */}
      <path
        d="M86 196 C66 188 58 166 66 146 C70 138 80 136 84 144 C78 156 80 172 96 182 Z"
        fill="url(#bodyGrad)"
      />
      {/* bras droit, posé sur la hanche */}
      <path
        d="M168 206 C184 200 190 188 184 176 C180 170 172 170 168 176 C170 186 166 196 158 200 Z"
        fill="url(#bodyGrad)"
      />

      {/* tête */}
      <circle cx="120" cy="120" r="46" fill="#C98A55" />
      {/* ombre joue */}
      <ellipse cx="146" cy="132" rx="10" ry="14" fill="#B97A48" opacity="0.5" />

      {/* oreille */}
      <circle cx="160" cy="122" r="7" fill="#C98A55" />

      {/* cheveux + bonnet du maillot national (noir) */}
      <path
        d="M76 110 C72 78 96 58 122 58 C150 58 168 80 164 110 C156 96 150 86 140 84 C146 92 146 100 142 104 C132 90 118 86 104 90 C108 84 112 80 116 78 C100 78 84 90 76 110 Z"
        fill="#15181C"
      />

      {/* sourcils froncés (réflexion intense) */}
      <path d="M96 106 q10 -8 20 -2" stroke="#15181C" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M132 104 q10 -6 18 2" stroke="#15181C" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* yeux plissés, regard inquiet */}
      <path d="M100 116 q5 -4 10 0" stroke="#15181C" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M136 115 q5 -4 10 0" stroke="#15181C" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* nez */}
      <path d="M120 118 q4 10 -2 16 q6 3 10 -1" stroke="#8A5C36" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* bouche hésitante (zigzag) */}
      <path d="M106 142 q6 4 12 0 q6 4 12 0" stroke="#5C3A22" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* main gauche sur la tempe, doigts repliés */}
      <ellipse cx="84" cy="100" rx="13" ry="15" fill="#C98A55" transform="rotate(-18 84 100)" />
      <path d="M76 90 q-2 -6 4 -8" stroke="#8A5C36" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M82 86 q-1 -6 5 -7" stroke="#8A5C36" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* ballon de foot tenu de l'autre main, sous le bras droit */}
      <circle cx="182" cy="186" r="14" fill="#F5F2EA" stroke="#15181C" strokeWidth="2" />
      <path d="M182 176 l4 6 -4 5 -4 -5z" fill="#15181C" />
      <path d="M174 190 l4 -3 4 3 -1 5 -6 0z" fill="#15181C" opacity="0.85" />

      {/* étoiles / nervosité autour de la tête */}
      <g fill="#E8B84B">
        <path d="M58 130 l2 5 5 1 -4 3 1 5 -4 -3 -4 3 1 -5 -4 -3 5 -1z" opacity="0.8" />
      </g>
    </svg>
  );
}

export default OverthinkerCaricature;
