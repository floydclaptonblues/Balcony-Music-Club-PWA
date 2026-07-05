(() => {
  const LAYER_ID = 'bmc-ufo-orbit-layer';
  const STYLE_ID = 'bmc-ufo-orbit-style';
  const UFO_SRC = 'assets/venue/bmc_jazzycat_ufo_360_rotation.gif?v=20260705-ufo-orbit-3x-fast';

  if (document.getElementById(LAYER_ID)) return;

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${LAYER_ID}{
        position:fixed;
        inset:0;
        z-index:1;
        pointer-events:none;
        overflow:hidden;
        contain:layout paint;
        --bmc-ufo-size:clamp(294px,31.8vw,504px);
        --bmc-ufo-edge:max(6px,env(safe-area-inset-left));
      }
      #${LAYER_ID} .bmc-ufo-ship{
        position:absolute;
        width:var(--bmc-ufo-size);
        top:7svh;
        filter:drop-shadow(0 0 10px rgba(94,230,255,.35)) drop-shadow(0 0 18px rgba(255,216,87,.18));
        will-change:transform;
      }
      #${LAYER_ID} .bmc-ufo-ship img{
        display:block;
        width:100%;
        height:auto;
        image-rendering:auto;
        user-select:none;
        -webkit-user-drag:none;
      }
      #${LAYER_ID} .bmc-ufo-ship--left{
        left:max(6px,env(safe-area-inset-left));
        animation:bmcUfoOrbitLeft 11.33s ease-in-out infinite alternate;
      }
      #${LAYER_ID} .bmc-ufo-ship--right{
        right:max(6px,env(safe-area-inset-right));
        animation:bmcUfoOrbitRight 12.67s ease-in-out infinite alternate;
      }
      #${LAYER_ID} .bmc-ufo-ship--right img{transform:scaleX(-1)}
      #${LAYER_ID} .bmc-ufo-note{
        position:fixed;
        z-index:1;
        left:0;
        top:0;
        pointer-events:none;
        font-family:Georgia,'Times New Roman',serif;
        font-weight:900;
        font-size:clamp(12px,1.55vw,22px);
        line-height:1;
        color:rgba(255,229,122,.92);
        text-shadow:0 0 7px rgba(255,216,87,.82),0 0 16px rgba(94,230,255,.52),1px 1px 0 rgba(0,0,0,.62);
        opacity:0;
        animation:bmcUfoNoteTwinkle 2400ms ease-out forwards;
        will-change:transform,opacity;
      }
      @keyframes bmcUfoOrbitLeft{
        from{transform:translate3d(0,0,0)}
        to{transform:translate3d(0,calc(86svh - var(--bmc-ufo-size)),0)}
      }
      @keyframes bmcUfoOrbitRight{
        from{transform:translate3d(0,calc(86svh - var(--bmc-ufo-size)),0)}
        to{transform:translate3d(0,0,0)}
      }
      @keyframes bmcUfoNoteTwinkle{
        0%{opacity:0;transform:translate3d(0,0,0) scale(.72) rotate(0deg)}
        18%{opacity:.92}
        100%{opacity:0;transform:translate3d(var(--bmc-note-dx),var(--bmc-note-dy),0) scale(.16) rotate(var(--bmc-note-rot))}
      }
      @media(max-width:760px){
        #${LAYER_ID}{--bmc-ufo-size:clamp(174px,54vw,276px)}
        #${LAYER_ID} .bmc-ufo-ship{top:8svh;opacity:.86;filter:drop-shadow(0 0 6px rgba(94,230,255,.32))}
        #${LAYER_ID} .bmc-ufo-note{font-size:12px}
      }
      @media(max-width:420px){
        #${LAYER_ID}{--bmc-ufo-size:clamp(150px,48vw,216px)}
        #${LAYER_ID} .bmc-ufo-ship{opacity:.78}
      }
      @media(prefers-reduced-motion:reduce){
        #${LAYER_ID} .bmc-ufo-ship{animation:none!important;top:18svh}
        #${LAYER_ID} .bmc-ufo-ship--right{top:64svh}
        #${LAYER_ID} .bmc-ufo-note{display:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function buildLayer() {
    const layer = document.createElement('div');
    layer.id = LAYER_ID;
    layer.setAttribute('aria-hidden', 'true');

    const left = document.createElement('div');
    left.className = 'bmc-ufo-ship bmc-ufo-ship--left';
    const leftImg = document.createElement('img');
    leftImg.src = UFO_SRC;
    leftImg.alt = '';
    leftImg.loading = 'lazy';
    leftImg.decoding = 'async';
    left.appendChild(leftImg);

    const right = document.createElement('div');
    right.className = 'bmc-ufo-ship bmc-ufo-ship--right';
    const rightImg = document.createElement('img');
    rightImg.src = UFO_SRC;
    rightImg.alt = '';
    rightImg.loading = 'lazy';
    rightImg.decoding = 'async';
    right.appendChild(rightImg);

    layer.append(left, right);
    document.body.insertBefore(layer, document.body.firstChild);
    return { layer, ships: [left, right] };
  }

  function spawnNote(layer, ship, side) {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const existing = layer.querySelectorAll('.bmc-ufo-note');
    if (existing.length > 26) existing[0].remove();

    const rect = ship.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const note = document.createElement('span');
    note.className = 'bmc-ufo-note';
    const glyphs = ['♪', '♫', '♬', '✦', '✧'];
    note.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];

    const x = side === 'left' ? rect.left + rect.width * 0.78 : rect.left + rect.width * 0.22;
    const y = rect.top + rect.height * (0.42 + Math.random() * 0.22);
    const dx = (side === 'left' ? -1 : 1) * (18 + Math.random() * 34);
    const dy = -16 - Math.random() * 42;
    const rot = (side === 'left' ? -1 : 1) * (120 + Math.random() * 220);
    const colors = ['rgba(255,229,122,.95)', 'rgba(94,230,255,.86)', 'rgba(255,137,207,.84)', 'rgba(255,255,255,.78)'];

    note.style.left = `${Math.round(x)}px`;
    note.style.top = `${Math.round(y)}px`;
    note.style.color = colors[Math.floor(Math.random() * colors.length)];
    note.style.setProperty('--bmc-note-dx', `${Math.round(dx)}px`);
    note.style.setProperty('--bmc-note-dy', `${Math.round(dy)}px`);
    note.style.setProperty('--bmc-note-rot', `${Math.round(rot)}deg`);

    layer.appendChild(note);
    window.setTimeout(() => note.remove(), 2600);
  }

  function startNotes(layer, ships) {
    let tick = 0;
    window.setInterval(() => {
      tick += 1;
      spawnNote(layer, ships[0], 'left');
      if (tick % 2 === 0) spawnNote(layer, ships[1], 'right');
    }, 520);
  }

  function init() {
    installStyle();
    const { layer, ships } = buildLayer();
    startNotes(layer, ships);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
