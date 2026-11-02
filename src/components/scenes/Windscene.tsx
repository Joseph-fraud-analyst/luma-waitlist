import './scenes.css';

/** A person in a yellow raincoat leaning into the wind, umbrella shaking, leaves flying past. */
export function WindScene() {
  return (
    <svg className="scene" viewBox="0 0 260 340" aria-hidden="true">
      <circle className="scene__bubble" cx="130" cy="170" r="126" />

      {/* Gusts of wind */}
      <g fill="none" strokeLinecap="round" strokeWidth="3">
        <path className="ws__gust ws__gust--1" d="M250 62 q-14 -10 -30 0 t-30 0 t-30 0" />
        <path className="ws__gust ws__gust--2" d="M250 112 q-14 -10 -30 0 t-30 0 t-30 0 t-30 0" />
        <path className="ws__gust ws__gust--3" d="M250 168 q-14 -10 -30 0 t-30 0 t-30 0" />
        <path className="ws__gust ws__gust--4" d="M250 222 q-14 -10 -30 0 t-30 0 t-30 0 t-30 0" />
        <path className="ws__gust ws__gust--5" d="M250 268 q-14 -10 -30 0 t-30 0 t-30 0" />
      </g>

      <ellipse className="scene__shadow" cx="122" cy="312" rx="64" ry="8" />

      <g transform="translate(-26 0)">
        <g className="ws__figure">
          {/* Legs, planted wide to brace against the wind */}
          <path d="M112 222 L98 300" stroke="#0b1546" strokeWidth="15" strokeLinecap="round" />
          <path d="M128 222 L146 298" stroke="#0b1546" strokeWidth="15" strokeLinecap="round" />
          <ellipse cx="94" cy="307" rx="15" ry="6" fill="#2b2f4a" />
          <ellipse cx="152" cy="306" rx="15" ry="6" fill="#2b2f4a" />

          {/* Coat tail whipping behind */}
          <g className="ws__tail">
            <path d="M92 190 Q60 186 40 206 Q62 214 70 232 L90 232 Z" fill="#e8b44e" />
          </g>

          {/* Raincoat */}
          <path d="M98 130 Q121 120 144 130 L152 232 Q121 242 90 232 Z" fill="#f3c565" />
          <path d="M121 134 L121 237" stroke="#d9a03a" strokeWidth="2" />

          {/* Neck and scarf */}
          <rect x="115" y="114" width="12" height="14" rx="5" fill="#e9b58d" />
          <g className="ws__scarf">
            <path d="M104 126 Q76 120 54 138 Q80 140 100 134 Z" fill="#1a63f2" />
          </g>
          <ellipse cx="121" cy="125" rx="20" ry="7" fill="#1a63f2" />

          {/* Head, hair blowing back */}
          <circle cx="121" cy="98" r="21" fill="#f1c6a0" />
          <g className="ws__hair">
            <path d="M104 84 Q80 80 58 92 Q78 94 100 100 Z" fill="#3b2a24" />
            <path d="M102 94 Q76 98 60 112 Q82 108 100 108 Z" fill="#3b2a24" />
          </g>
          <path d="M100 96 Q100 72 122 72 Q144 72 142 96 Q130 84 100 96 Z" fill="#3b2a24" />

          {/* Squinting, grimacing face */}
          <path d="M129 96 L137 94" stroke="#0b1546" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M127 89 L138 85" stroke="#3b2a24" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M142 99 L147 104 L141 105" fill="#e2b48c" />
          <path d="M130 111 Q136 106 141 110" fill="none" stroke="#7a2f2f" strokeWidth="2.2" strokeLinecap="round" />

          {/* Umbrella, shaking in the gusts */}
          <g className="ws__umbrella">
            <path d="M184 190 L184 20" stroke="#0b1546" strokeWidth="4" strokeLinecap="round" />
            <path d="M184 190 q0 10 -9 10" fill="none" stroke="#0b1546" strokeWidth="4" strokeLinecap="round" />
            <path
              d="M132 62 Q132 14 184 14 Q236 14 236 62 Q223 53 210 62 Q197 53 184 62 Q171 53 158 62 Q145 53 132 62 Z"
              fill="#0b1546"
            />
            <path
              d="M184 14 L132 62 M184 14 L158 62 M184 14 L184 62 M184 14 L210 62 M184 14 L236 62"
              stroke="#ffffff"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              fill="none"
            />
          </g>

          {/* Arms gripping the pole */}
          <path d="M110 142 Q140 178 182 168" fill="none" stroke="#e8b44e" strokeWidth="13" strokeLinecap="round" />
          <path d="M140 140 Q160 156 184 142" fill="none" stroke="#f3c565" strokeWidth="13" strokeLinecap="round" />
          <circle cx="184" cy="142" r="7" fill="#f1c6a0" />
          <circle cx="183" cy="168" r="7" fill="#f1c6a0" />
        </g>
      </g>

      {/* Leaves swept along */}
      <path className="ws__leaf ws__leaf--1" transform="translate(220 80)" d="M0 0 q6 -10 14 -4 q-2 10 -14 4 z" fill="#5ab87a" />
      <path className="ws__leaf ws__leaf--2" transform="translate(240 140)" d="M0 0 q6 -10 14 -4 q-2 10 -14 4 z" fill="#e9a93f" />
      <path className="ws__leaf ws__leaf--3" transform="translate(230 200)" d="M0 0 q6 -10 14 -4 q-2 10 -14 4 z" fill="#f08a4b" />
      <path className="ws__leaf ws__leaf--4" transform="translate(250 250)" d="M0 0 q6 -10 14 -4 q-2 10 -14 4 z" fill="#5ab87a" />
      <path className="ws__leaf ws__leaf--5" transform="translate(210 50)" d="M0 0 q6 -10 14 -4 q-2 10 -14 4 z" fill="#e9a93f" />
    </svg>
  );
}