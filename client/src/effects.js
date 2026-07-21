// ─── Effects ─────────────────────────────────────────────────────────────────
// Pooled sprite particles: landing dust, bump stars, shove rings, confetti,
// cloud poofs. Everything is generated (canvas textures), nothing loaded.

import * as THREE from "three";

const POOL = 240;

function discTexture(soft = true) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(soft ? 0.5 : 0.85, "rgba(255,255,255,0.6)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function starTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.translate(32, 32);
  g.fillStyle = "#fff";
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 26 : 11;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    g[i === 0 ? "moveTo" : "lineTo"](Math.cos(a) * r, Math.sin(a) * r);
  }
  g.closePath();
  g.fill();
  return new THREE.CanvasTexture(c);
}

export function createEffects(scene) {
  const softTex = discTexture(true);
  const starTex = starTexture();
  const pool = [];
  for (let i = 0; i < POOL; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: softTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    s.visible = false;
    scene.add(s);
    pool.push({
      sprite: s,
      vx: 0,
      vy: 0,
      vz: 0,
      life: 0,
      ttl: 1,
      size: 1,
      grow: 0,
      gravity: 0,
      spin: 0,
    });
  }
  let cursor = 0;

  function spawn({
    x,
    y,
    z,
    vx = 0,
    vy = 0,
    vz = 0,
    color = 0xffffff,
    size = 0.4,
    ttl = 0.7,
    grow = 0,
    gravity = 0,
    star = false,
    opacity = 0.9,
  }) {
    const p = pool[cursor];
    cursor = (cursor + 1) % POOL;
    p.sprite.material.map = star ? starTex : softTex;
    p.sprite.material.color.setHex(color);
    p.sprite.material.opacity = opacity;
    p.sprite.position.set(x, y, z);
    p.sprite.scale.setScalar(size);
    p.sprite.visible = true;
    p.vx = vx;
    p.vy = vy;
    p.vz = vz;
    p.life = 0;
    p.ttl = ttl;
    p.size = size;
    p.grow = grow;
    p.gravity = gravity;
    p.baseOpacity = opacity;
  }

  return {
    /** Landing dust puff; strength scales with impact. */
    dust(p, strength = 1) {
      const n = Math.min(14, 5 + Math.round(strength * 5));
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 1.6 * strength;
        spawn({
          x: p[0],
          y: p[1] + 0.08,
          z: p[2],
          vx: Math.cos(a) * sp,
          vy: 0.4 + Math.random() * 0.7,
          vz: Math.sin(a) * sp,
          color: 0xe8e2d8,
          size: 0.28 + Math.random() * 0.3 * strength,
          ttl: 0.5 + Math.random() * 0.3,
          grow: 1.6,
          opacity: 0.55,
        });
      }
    },

    /** Cartoon bump stars. */
    stars(p) {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
        spawn({
          x: p[0],
          y: p[1] + 0.5,
          z: p[2],
          vx: Math.cos(a) * 2.2,
          vy: 1.6 + Math.random(),
          vz: Math.sin(a) * 2.2,
          color: 0xffe066,
          size: 0.22,
          ttl: 0.55,
          gravity: -4,
          star: true,
        });
      }
    },

    /** Shove impact ring burst. */
    ring(p, color = 0x48dbfb) {
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        spawn({
          x: p[0],
          y: p[1] + 0.4,
          z: p[2],
          vx: Math.cos(a) * 4.5,
          vy: 0.3,
          vz: Math.sin(a) * 4.5,
          color,
          size: 0.3,
          ttl: 0.4,
          opacity: 0.8,
        });
      }
    },

    /** Celebration confetti (records, crowns, personal bests). */
    confetti(p) {
      const colors = [
        0xff6b6b, 0xfeca57, 0x48dbfb, 0x7bed9f, 0xa29bfe, 0xfd79a8,
      ];
      for (let i = 0; i < 34; i++) {
        const a = Math.random() * Math.PI * 2;
        spawn({
          x: p[0],
          y: p[1] + 0.6,
          z: p[2],
          vx: Math.cos(a) * (1 + Math.random() * 3),
          vy: 3.5 + Math.random() * 4,
          vz: Math.sin(a) * (1 + Math.random() * 3),
          color: colors[i % colors.length],
          size: 0.14 + Math.random() * 0.1,
          ttl: 1.3 + Math.random() * 0.5,
          gravity: -7,
          opacity: 1,
        });
      }
    },

    /** Big soft poof (falling into the cloud sea). */
    poof(p) {
      for (let i = 0; i < 16; i++) {
        const a = Math.random() * Math.PI * 2;
        spawn({
          x: p[0] + Math.cos(a) * 0.5,
          y: p[1],
          z: p[2] + Math.sin(a) * 0.5,
          vx: Math.cos(a) * 1.4,
          vy: 1 + Math.random() * 1.4,
          vz: Math.sin(a) * 1.4,
          color: 0xffffff,
          size: 0.7 + Math.random() * 0.6,
          ttl: 0.9,
          grow: 1.8,
          opacity: 0.8,
        });
      }
    },

    /** Bounce-pad sparkle. */
    sparkle(p) {
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2;
        spawn({
          x: p[0],
          y: p[1] + 0.1,
          z: p[2],
          vx: Math.cos(a) * 1.6,
          vy: 3 + Math.random() * 2,
          vz: Math.sin(a) * 1.6,
          color: 0xff9ae5,
          size: 0.2,
          ttl: 0.6,
          gravity: -5,
          star: true,
        });
      }
    },

    update(dt) {
      for (const p of pool) {
        if (!p.sprite.visible) continue;
        p.life += dt;
        if (p.life >= p.ttl) {
          p.sprite.visible = false;
          continue;
        }
        p.vy += p.gravity * dt;
        p.sprite.position.x += p.vx * dt;
        p.sprite.position.y += p.vy * dt;
        p.sprite.position.z += p.vz * dt;
        const k = p.life / p.ttl;
        p.sprite.material.opacity = p.baseOpacity * (1 - k);
        p.sprite.scale.setScalar(p.size * (1 + p.grow * k));
      }
    },
  };
}
