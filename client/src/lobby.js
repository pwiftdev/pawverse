// ─── Lobby / dog creator ─────────────────────────────────────────────────────
// Studio-style character creation: tabbed customization (breed cards with stat
// bars, palette swatches, patterns, size, collar, accessories, wallet), a
// drag-to-rotate 3D preview stage with selectable poses, a full randomizer,
// and per-wallet loadout persistence.

import * as THREE from 'three';
import {
  BREEDS, BREED_MAP, PATTERNS, ACCESSORIES, defaultCustomization,
} from '../../shared/breeds.js';
import { makeDog } from './dogfactory.js';
import { animateDog } from './animator.js';
import { connectWallet, fetchDogNfts, mintDog, wallet, solanaConfig } from './solana.js';

const $ = (id) => document.getElementById(id);
const LS_KEY = 'pawverse.dog';

const COAT_COLORS = [
  '#f5f0e6', '#e8d5b8', '#d9a45b', '#d98e4a', '#b0713c', '#8a5a32', '#6b4a2e',
  '#4a3a2c', '#2b2b30', '#8a93a3', '#c9c2b8', '#a0855b',
];
const COLLAR_COLORS = ['#d23b3b', '#3f8fe5', '#46c46a', '#e5b53f', '#9945ff', '#ff6b9a', '#26262b'];
const ACC_META = {
  none: { icon: '✖️', label: 'none' },
  bandana: { icon: '🧣', label: 'bandana' },
  hat: { icon: '🎩', label: 'hat' },
  glasses: { icon: '🕶', label: 'sunglasses' },
};
const PATTERN_META = {
  none: 'plain', mask: 'mask', socks: 'socks', spots: 'spots', saddle: 'saddle',
};
const DOG_NAMES = [
  'Biscuit', 'Mochi', 'Zoomie', 'Pretzel', 'Waffles', 'Nova', 'Turbo', 'Pickles',
  'Miso', 'Comet', 'Noodle', 'Pepper', 'Blue', 'Sunny', 'Ziggy', 'Clover',
];

export function initLobby({ onPlay }) {
  const state = {
    custom: loadLoadout(null),
    name: localStorage.getItem('pawverse.name') || '',
    pose: 'idle',
  };
  let premiumUnlocked = !solanaConfig.PREMIUM_MINT;   // no mint configured → all open

  // ── 3D preview stage ─────────────────────────────────────────────────────
  const canvas = $('preview');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight, false);   // full-screen stage
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight('#cfe8ff', '#3a4a60', 1.1));
  const key = new THREE.DirectionalLight('#fff2d8', 2.2);
  key.position.set(2.5, 4.5, 3);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#7ea6ff', 1.7);   // cool rim from behind
  rim.position.set(-2, 2.5, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight('#ffd9b0', 0.8);  // soft warm front fill
  fill.position.set(-1.5, 1.2, 4);
  scene.add(fill);

  const cam = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 50);
  cam.position.set(0, 1.7, 6.1);
  cam.lookAt(0, 0.62, 0);

  // podium
  const podium = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.7, 0.22, 40),
    new THREE.MeshStandardMaterial({ color: '#222b40', roughness: 0.5, metalness: 0.3 }));
  podium.position.y = -0.11;
  podium.receiveShadow = true;
  scene.add(podium);
  const podiumRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.6, 0.03, 8, 48),
    new THREE.MeshBasicMaterial({ color: '#ffb347' }));
  podiumRing.rotation.x = Math.PI / 2;
  podiumRing.position.y = 0.01;
  scene.add(podiumRing);

  let view = null;
  let viewYaw = 0.6;               // user-controlled rotation
  let spinVel = 0.35;              // idle auto-spin, damps while dragging
  function rebuildPreview() {
    if (view) scene.remove(view.group);
    view = makeDog({ ...state.custom, name: state.name || 'preview' });
    view.group.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    scene.add(view.group);
  }

  // drag to rotate
  let dragging = false, lastX = 0;
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; });
  addEventListener('pointerup', () => { dragging = false; });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    viewYaw += (e.clientX - lastX) * 0.012;
    lastX = e.clientX;
    spinVel = 0;
  });

  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight, false);
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
  });

  const POSE_SPEED = { run: 5.5 };
  let last = performance.now();
  (function loop() {
    requestAnimationFrame(loop);
    const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (view) {
      spinVel += (0.35 - spinVel) * Math.min(1, dt * 0.4);   // ease auto-spin back in
      viewYaw += spinVel * dt;
      view.group.rotation.y = viewYaw;
      animateDog(view, state.pose, dt, POSE_SPEED[state.pose] || 0);
    }
    renderer.render(scene, cam);
  })();

  // pose picker
  for (const btn of document.querySelectorAll('.pose-btn')) {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pose-btn').forEach((b) => b.classList.remove('sel'));
      btn.classList.add('sel');
      state.pose = btn.dataset.pose;
    });
  }

  // ── breed cards ──────────────────────────────────────────────────────────
  const breedGrid = $('breed-grid');
  function renderBreeds() {
    breedGrid.innerHTML = '';
    for (const b of BREEDS) {
      const locked = b.premium && !premiumUnlocked;
      const el = document.createElement('button');
      el.className = `breed${state.custom.breed === b.id ? ' sel' : ''}${locked ? ' locked' : ''}`;
      const speedPct = Math.round(((b.speed - 0.85) / 0.35) * 100);
      const sizePct = Math.round(((b.scale - 0.65) / 0.55) * 100);
      el.innerHTML = `
        <div class="b-top">
          <span class="b-dot" style="background:${b.primary}"></span>
          <span class="b-name">${b.name}</span>
          <span class="b-gem">${b.premium ? (locked ? '🔒' : '💎') : ''}</span>
        </div>
        <div class="b-stat"><span>speed</span><span class="b-bar"><i style="width:${clampPct(speedPct)}%"></i></span></div>
        <div class="b-stat"><span>size</span><span class="b-bar"><i style="width:${clampPct(sizePct)}%"></i></span></div>`;
      el.onclick = () => {
        if (locked) {
          setWalletStatus(`💎 ${b.name} is premium — hold the configured token to unlock it (see the Wallet tab).`);
          return;
        }
        state.custom.breed = b.id;
        state.custom.primary = b.primary;
        state.custom.secondary = b.secondary;
        state.custom.pattern = b.pattern;
        syncAll(); save();
      };
      breedGrid.appendChild(el);
    }
  }

  // ── palette swatches ─────────────────────────────────────────────────────
  function renderPalette(rootId, get, set, colors) {
    const root = $(rootId);
    root.innerHTML = '';
    for (const col of colors) {
      const el = document.createElement('button');
      el.className = `swatch${get() === col ? ' sel' : ''}`;
      el.style.background = col;
      el.title = col;
      el.onclick = () => { set(col); syncAll(); save(); };
      root.appendChild(el);
    }
    // custom picker at the end of the row
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = get() || '#d98e4a';
    picker.title = 'custom color';
    picker.oninput = () => { set(picker.value); rebuildPreview(); save(); };
    root.appendChild(picker);
  }

  function renderStyleControls() {
    renderPalette('pal-primary', () => state.custom.primary,
      (v) => { state.custom.primary = v; }, COAT_COLORS);
    renderPalette('pal-secondary', () => state.custom.secondary,
      (v) => { state.custom.secondary = v; }, COAT_COLORS);

    const patternRow = $('pattern-row');
    patternRow.innerHTML = '';
    for (const p of PATTERNS) {
      const el = document.createElement('button');
      el.className = `chip${state.custom.pattern === p ? ' sel' : ''}`;
      el.textContent = PATTERN_META[p];
      el.onclick = () => { state.custom.pattern = p; syncAll(); save(); };
      patternRow.appendChild(el);
    }
  }

  function renderExtras() {
    const collarRow = $('collar-row');
    collarRow.innerHTML = '';
    const noneBtn = document.createElement('button');
    noneBtn.className = `chip${state.custom.collar === null ? ' sel' : ''}`;
    noneBtn.textContent = 'no collar';
    noneBtn.onclick = () => { state.custom.collar = null; syncAll(); save(); };
    collarRow.appendChild(noneBtn);
    for (const col of COLLAR_COLORS) {
      const el = document.createElement('button');
      el.className = `swatch${state.custom.collar === col ? ' sel' : ''}`;
      el.style.background = col;
      el.onclick = () => { state.custom.collar = col; syncAll(); save(); };
      collarRow.appendChild(el);
    }

    const accRow = $('acc-row');
    accRow.innerHTML = '';
    for (const a of ACCESSORIES) {
      const meta = ACC_META[a];
      const el = document.createElement('button');
      el.className = `chip${state.custom.accessory === a ? ' sel' : ''}`;
      el.textContent = `${meta.icon} ${meta.label}`;
      el.onclick = () => { state.custom.accessory = a; syncAll(); save(); };
      accRow.appendChild(el);
    }
  }

  // ── size + name + randomize ──────────────────────────────────────────────
  const sizeEl = $('size'), sizeVal = $('size-val'), nameEl = $('dogname');
  sizeEl.oninput = () => {
    state.custom.size = Number(sizeEl.value);
    sizeVal.textContent = `${state.custom.size.toFixed(2)}×`;
    rebuildPreview(); save();
  };
  nameEl.oninput = () => {
    state.name = nameEl.value;
    localStorage.setItem('pawverse.name', state.name);
    if (state.custom.breed === 'mutt') rebuildPreview();   // mutt mixes from the name
  };

  $('randomize').onclick = () => {
    const pool = BREEDS.filter((b) => !b.premium || premiumUnlocked);
    const breed = pool[Math.floor(Math.random() * pool.length)];
    state.custom = {
      breed: breed.id,
      primary: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      secondary: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      pattern: PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
      size: Math.round((0.7 + Math.random() * 0.7) * 20) / 20,
      collar: Math.random() < 0.8
        ? COLLAR_COLORS[Math.floor(Math.random() * COLLAR_COLORS.length)] : null,
      accessory: ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)],
      name: state.name,
    };
    if (!state.name) {
      state.name = DOG_NAMES[Math.floor(Math.random() * DOG_NAMES.length)];
      localStorage.setItem('pawverse.name', state.name);
    }
    syncAll(); save();
  };

  // ── wallet tab ───────────────────────────────────────────────────────────
  const walletBtn = $('wallet-btn'), mintBtn = $('mint-btn');
  function setWalletStatus(html) { $('wallet-status').innerHTML = html; }

  walletBtn.onclick = async () => {
    walletBtn.disabled = true;
    setWalletStatus('connecting…');
    try {
      await connectWallet();
      premiumUnlocked = !solanaConfig.PREMIUM_MINT || wallet.premium;
      const short = `${wallet.address.slice(0, 4)}…${wallet.address.slice(-4)}`;
      walletBtn.textContent = `◎ ${short}`;
      setWalletStatus(
        `connected on <b>${solanaConfig.NETWORK}</b> — dog identity tied to ${short}` +
        (solanaConfig.PREMIUM_MINT
          ? (wallet.premium ? ' · <b>premium unlocked 💎</b>' : ' · premium token not held')
          : ' · <b>all breeds unlocked</b> (no premium mint configured)'));
      mintBtn.style.display = 'inline-block';
      const walletLoadout = loadLoadout(wallet.address);
      if (walletLoadout) state.custom = walletLoadout;
      syncAll();
      renderNftSkins(await fetchDogNfts(wallet.address));
    } catch (err) {
      setWalletStatus(`⚠ ${err.message}`);
    }
    walletBtn.disabled = false;
  };

  mintBtn.onclick = async () => {
    mintBtn.disabled = true;
    mintBtn.textContent = '⛏ waiting for wallet…';
    try {
      const sig = await mintDog(state.custom, state.name || 'Dog');
      setWalletStatus(`minted (stub memo tx): <b>${sig.slice(0, 10)}…</b>`);
    } catch (err) {
      setWalletStatus(`⚠ mint: ${err.message}`);
    }
    mintBtn.disabled = false;
    mintBtn.textContent = '⛏ mint this dog (devnet stub)';
  };

  function renderNftSkins(nfts) {
    const root = $('nft-skins');
    root.innerHTML = '';
    if (!nfts.length) {
      root.innerHTML = '<span style="font-size:12px;color:var(--dim)">no dog NFTs in this wallet</span>';
      return;
    }
    for (const nft of nfts) {
      const el = document.createElement('button');
      el.className = 'chip';
      el.textContent = `🖼 ${nft.name}`;
      el.onclick = () => {
        state.custom = { ...state.custom, ...nft.customization };
        syncAll(); save();
      };
      root.appendChild(el);
    }
  }

  // ── sync + persistence ───────────────────────────────────────────────────
  function syncAll() {
    renderBreeds();
    renderStyleControls();
    renderExtras();
    sizeEl.value = state.custom.size;
    sizeVal.textContent = `${Number(state.custom.size).toFixed(2)}×`;
    nameEl.value = state.name;
    rebuildPreview();
  }

  function save() {
    const json = JSON.stringify(state.custom);
    localStorage.setItem(LS_KEY, json);
    if (wallet.address) localStorage.setItem(`${LS_KEY}.${wallet.address}`, json);
  }
  function loadLoadout(address) {
    try {
      const raw = localStorage.getItem(address ? `${LS_KEY}.${address}` : LS_KEY);
      if (raw) return { ...defaultCustomization(), ...JSON.parse(raw) };
    } catch { /* corrupted → fall through to default */ }
    return address ? null : defaultCustomization();
  }

  // ── play ─────────────────────────────────────────────────────────────────
  $('play').onclick = () => {
    // Premium re-check at the gate (in case a locked breed snuck into storage).
    const breed = BREED_MAP[state.custom.breed];
    if (breed?.premium && !premiumUnlocked) state.custom.breed = 'shiba';
    save();
    $('lobby').style.display = 'none';
    onPlay(state.name.trim() || 'Dog', { ...state.custom });
  };

  syncAll();
}

function clampPct(v) { return Math.min(100, Math.max(8, v)); }
