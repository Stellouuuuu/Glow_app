// Sprite SVG partagée (illustrations "ill-*" et icônes "i-*"), référencée via <use href="#id">.
const defs = `
    <defs>
      <linearGradient id="gradRose" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" style="stop-color:var(--blush-deep)"></stop>
        <stop offset="100%" style="stop-color:var(--rose)"></stop>
      </linearGradient>
      <linearGradient id="gradRoseDeep" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" style="stop-color:var(--rose)"></stop>
        <stop offset="100%" style="stop-color:var(--rose-dark)"></stop>
      </linearGradient>
      <linearGradient id="gradGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" style="stop-color:#F3DEC0"></stop>
        <stop offset="100%" style="stop-color:var(--gold)"></stop>
      </linearGradient>
      <linearGradient id="gradGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style="stop-color:#FFFFFF"></stop>
        <stop offset="100%" style="stop-color:var(--blush)"></stop>
      </linearGradient>
      <linearGradient id="gradHair" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" style="stop-color:#C98B6B"></stop>
        <stop offset="100%" style="stop-color:#5A3420"></stop>
      </linearGradient>

      <symbol id="ill-bouquet" viewBox="0 0 120 120">
        <path d="M60 78C48 70 40 56 44 40c10 6 18 20 16 38Z" fill="#9CAA7C" opacity="0.55"></path>
        <path d="M62 80c10-10 14-26 8-40-9 8-14 24-8 40Z" fill="#9CAA7C" opacity="0.4"></path>
        <g>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(0 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(45 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(90 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(135 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(180 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(225 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(270 60 55)"></ellipse>
          <ellipse cx="60" cy="42" rx="6" ry="13" fill="url(#gradRose)" transform="rotate(315 60 55)"></ellipse>
          <circle cx="60" cy="55" r="8" fill="url(#gradGold)"></circle>
        </g>
        <g>
          <ellipse cx="30" cy="76" rx="4" ry="9" fill="url(#gradRoseDeep)" transform="rotate(0 30 85)"></ellipse>
          <ellipse cx="30" cy="76" rx="4" ry="9" fill="url(#gradRoseDeep)" transform="rotate(60 30 85)"></ellipse>
          <ellipse cx="30" cy="76" rx="4" ry="9" fill="url(#gradRoseDeep)" transform="rotate(120 30 85)"></ellipse>
          <ellipse cx="30" cy="76" rx="4" ry="9" fill="url(#gradRoseDeep)" transform="rotate(180 30 85)"></ellipse>
          <ellipse cx="30" cy="76" rx="4" ry="9" fill="url(#gradRoseDeep)" transform="rotate(240 30 85)"></ellipse>
          <ellipse cx="30" cy="76" rx="4" ry="9" fill="url(#gradRoseDeep)" transform="rotate(300 30 85)"></ellipse>
          <circle cx="30" cy="85" r="5" fill="url(#gradGold)"></circle>
        </g>
        <g>
          <ellipse cx="95" cy="33" rx="3.5" ry="8" fill="url(#gradRose)" opacity="0.9" transform="rotate(0 95 41)"></ellipse>
          <ellipse cx="95" cy="33" rx="3.5" ry="8" fill="url(#gradRose)" opacity="0.9" transform="rotate(72 95 41)"></ellipse>
          <ellipse cx="95" cy="33" rx="3.5" ry="8" fill="url(#gradRose)" opacity="0.9" transform="rotate(144 95 41)"></ellipse>
          <ellipse cx="95" cy="33" rx="3.5" ry="8" fill="url(#gradRose)" opacity="0.9" transform="rotate(216 95 41)"></ellipse>
          <ellipse cx="95" cy="33" rx="3.5" ry="8" fill="url(#gradRose)" opacity="0.9" transform="rotate(288 95 41)"></ellipse>
          <circle cx="95" cy="41" r="4" fill="url(#gradGold)"></circle>
        </g>
        <circle cx="20" cy="40" r="2" fill="#ffffff" opacity="0.8"></circle>
        <circle cx="100" cy="90" r="2.5" fill="#ffffff" opacity="0.7"></circle>
        <circle cx="75" cy="95" r="1.8" fill="#ffffff" opacity="0.8"></circle>
      </symbol>

      <symbol id="ill-serum" viewBox="0 0 100 100">
        <ellipse cx="50" cy="90" rx="22" ry="5" fill="var(--ink)" opacity="0.08"></ellipse>
        <rect x="34" y="12" width="32" height="16" rx="5" fill="url(#gradRoseDeep)"></rect>
        <rect x="40" y="4" width="20" height="12" rx="4" fill="url(#gradGold)"></rect>
        <rect x="26" y="26" width="48" height="58" rx="14" fill="url(#gradGlass)" stroke="var(--line-strong)" stroke-width="1"></rect>
        <rect x="30" y="50" width="40" height="32" rx="10" fill="url(#gradRose)" opacity="0.9"></rect>
        <rect x="31" y="32" width="6" height="40" rx="3" fill="#ffffff" opacity="0.5"></rect>
      </symbol>
      <symbol id="ill-cream" viewBox="0 0 100 100">
        <ellipse cx="50" cy="90" rx="24" ry="5" fill="var(--ink)" opacity="0.08"></ellipse>
        <rect x="20" y="34" width="60" height="50" rx="18" fill="url(#gradGlass)" stroke="var(--line-strong)" stroke-width="1"></rect>
        <ellipse cx="50" cy="34" rx="30" ry="11" fill="url(#gradRoseDeep)"></ellipse>
        <ellipse cx="50" cy="30" rx="30" ry="10" fill="url(#gradRose)"></ellipse>
        <path d="M34 40 Q50 30 66 40" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"></path>
        <rect x="24" y="40" width="6" height="34" rx="3" fill="#ffffff" opacity="0.4"></rect>
      </symbol>
      <symbol id="ill-palette" viewBox="0 0 100 100">
        <ellipse cx="50" cy="90" rx="26" ry="5" fill="var(--ink)" opacity="0.08"></ellipse>
        <rect x="14" y="18" width="72" height="62" rx="16" fill="url(#gradGold)" stroke="var(--line-strong)" stroke-width="1"></rect>
        <rect x="22" y="26" width="56" height="46" rx="10" fill="url(#gradGlass)"></rect>
        <circle cx="36" cy="40" r="8" fill="url(#gradRose)"></circle>
        <circle cx="56" cy="38" r="8" fill="#E8C9A6"></circle>
        <circle cx="72" cy="44" r="7" fill="url(#gradRoseDeep)"></circle>
        <circle cx="40" cy="58" r="7" fill="#D9A878"></circle>
        <circle cx="60" cy="60" r="8" fill="url(#gradRose)" opacity="0.85"></circle>
      </symbol>
      <symbol id="ill-dress" viewBox="0 0 100 100">
        <ellipse cx="50" cy="92" rx="24" ry="4" fill="var(--ink)" opacity="0.08"></ellipse>
        <path d="M38 10h24l4 14-7 5L64 86a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4l4.8-57-7-5 4.2-14Z" fill="url(#gradRose)" stroke="var(--rose-dark)" stroke-width="0.6"></path>
        <path d="M38 10c0 6 4.5 10.5 12 10.5S62 16 62 10" fill="none" stroke="var(--rose-dark)" stroke-width="1"></path>
        <path d="M42 38c3 16 1 34-2 44M58 38c-3 16-1 34 2 44" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.4"></path>
        <rect x="36" y="44" width="28" height="4" rx="2" fill="url(#gradGold)"></rect>
      </symbol>
      <symbol id="ill-hair" viewBox="0 0 100 100">
        <ellipse cx="50" cy="94" rx="26" ry="4" fill="var(--ink)" opacity="0.08"></ellipse>
        <path d="M24 8c10 10-6 22 2 34s-10 24 0 34-6 22 4 32" fill="none" stroke="url(#gradHair)" stroke-width="7" stroke-linecap="round"></path>
        <path d="M42 6c10 10-6 22 2 34s-10 24 0 34-6 22 4 32" fill="none" stroke="url(#gradHair)" stroke-width="7" stroke-linecap="round" opacity="0.92"></path>
        <path d="M60 8c10 10-6 22 2 34s-10 24 0 34-6 22 4 32" fill="none" stroke="url(#gradHair)" stroke-width="7" stroke-linecap="round"></path>
        <path d="M76 10c8 9-5 20 2 31s-9 21 0 30-5 19 4 28" fill="none" stroke="url(#gradHair)" stroke-width="6" stroke-linecap="round" opacity="0.85"></path>
        <path d="M34 10c6 8-3 16 2 26" fill="none" stroke="#F3DEC0" stroke-width="2" stroke-linecap="round" opacity="0.55"></path>
      </symbol>
      <symbol id="ill-lipstick" viewBox="0 0 100 100">
        <ellipse cx="50" cy="92" rx="20" ry="4" fill="var(--ink)" opacity="0.08"></ellipse>
        <rect x="36" y="46" width="28" height="42" rx="6" fill="url(#gradGold)"></rect>
        <rect x="38" y="48" width="6" height="36" rx="3" fill="#ffffff" opacity="0.4"></rect>
        <path d="M38 46 L36 30 L42 12 L50 6 L58 12 L64 30 L62 46 Z" fill="url(#gradRoseDeep)"></path>
        <path d="M44 18c3-3 9-3 12 0" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5"></path>
      </symbol>
      <symbol id="ill-perfume" viewBox="0 0 100 100">
        <ellipse cx="50" cy="92" rx="22" ry="4" fill="var(--ink)" opacity="0.08"></ellipse>
        <rect x="30" y="34" width="40" height="50" rx="10" fill="url(#gradGlass)" stroke="var(--line-strong)" stroke-width="1"></rect>
        <rect x="34" y="50" width="32" height="30" rx="8" fill="url(#gradRose)" opacity="0.85"></rect>
        <rect x="40" y="20" width="20" height="16" rx="4" fill="url(#gradGold)"></rect>
        <rect x="44" y="10" width="12" height="12" rx="3" fill="url(#gradRoseDeep)"></rect>
        <rect x="33" y="40" width="5" height="36" rx="2.5" fill="#ffffff" opacity="0.4"></rect>
        <path d="M40 24c-6-4-6-10 0-12M60 24c6-4 6-10 0-12" fill="none" stroke="var(--gold)" stroke-width="1.6" stroke-linecap="round" opacity="0.7"></path>
      </symbol>

      <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M4 13c0-6 4.5-9.5 15-9.5C18.5 14 15 19 4 13Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M5 20c2-4.5 5-8 10.5-12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-lips" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"></rect><path d="M9 10h6l-1 3h-4l-1-3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M10 13h4v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></symbol>
      <symbol id="i-dress" viewBox="0 0 24 24"><path d="M9.5 3h5l1 3-1.6 1.2L16 20a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1l1.1-12.8L7.5 6l2-3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M9.5 3c0 1.3 1 2.3 2.5 2.3S14.5 4.3 14.5 3" fill="none" stroke="currentColor" stroke-width="1.5"></path></symbol>
      <symbol id="i-hair" viewBox="0 0 24 24"><path d="M5 4c3 3-2 6 1 9s-2 6 1 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 4c3 3-2 6 1 9s-2 6 1 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M19 4c3 3-2 6 1 9s-2 6 1 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-bag" viewBox="0 0 24 24"><path d="M7 8h10l1 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L7 8Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.5"></path></symbol>
      <symbol id="i-perfume" viewBox="0 0 24 24"><rect x="7" y="10" width="10" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"></rect><rect x="10" y="6" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.5"></rect><rect x="9" y="3" width="6" height="3" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"></rect><path d="M10 14h4M10 17h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-truck" viewBox="0 0 24 24"><path d="M2 7h12v9H2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M14 10h4l4 3v3h-8v-6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><circle cx="6.5" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"></circle><circle cx="17.5" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"></circle></symbol>
      <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M18 3v4h-4M6 21v-4h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></symbol>
      <symbol id="i-cash" viewBox="0 0 24 24"><rect x="2.5" y="6" width="19" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"></rect><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M5.5 9v0M18.5 15v0" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></symbol>
      <symbol id="i-headset" viewBox="0 0 24 24"><path d="M4 13v-1a8 8 0 0 1 16 0v1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><rect x="3" y="13" width="4" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"></rect><rect x="17" y="13" width="4" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"></rect><path d="M19 19v1a2 2 0 0 1-2 2h-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.4l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3.5Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"></path></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.5-9.5-9.3C1.2 7.6 3.2 4.5 6.5 4.5c2 0 3.6 1.1 4.5 2.8.9-1.7 2.5-2.8 4.5-2.8 3.3 0 5.3 3.1 4 6.7-2 4.8-9.5 9.3-9.5 9.3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></symbol>
      <symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2l2.4 12.2A2 2 0 0 0 9.4 18H18a2 2 0 0 0 2-1.6L21.5 8H6.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="10" cy="21" r="1.4" fill="currentColor"></circle><circle cx="18" cy="21" r="1.4" fill="currentColor"></circle></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M20.5 20.5 16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M4.5 20c1.4-4 4-5.8 7.5-5.8s6.1 1.8 7.5 5.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></symbol>
      <symbol id="i-flower" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.4" fill="currentColor"></circle><ellipse cx="12" cy="6" rx="2.6" ry="3.6" fill="currentColor" opacity="0.85"></ellipse><ellipse cx="12" cy="18" rx="2.6" ry="3.6" fill="currentColor" opacity="0.85"></ellipse><ellipse cx="6" cy="12" rx="3.6" ry="2.6" fill="currentColor" opacity="0.85"></ellipse><ellipse cx="18" cy="12" rx="3.6" ry="2.6" fill="currentColor" opacity="0.85"></ellipse></symbol>
      <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 2c0 5.5 1.5 7 7 7-5.5 0-7 1.5-7 7 0-5.5-1.5-7-7-7 5.5 0 7-1.5 7-7Z" fill="currentColor"></path></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"></rect><path d="M10 19h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
      <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 10a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 14.5 6 10Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></symbol>
    </defs>
`;

export default function Sprite() {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: defs }}
    />
  );
}
