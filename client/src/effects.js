// ─── Visual effects ──────────────────────────────────────────────────────────
// Short-lived, self-cleaning bits of juice: bark ripples, tussle bursts,
// pet hearts, splashes, dig dust. All simple meshes — cheap and cheerful.

import * as THREE from 'three';

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.live = [];   // { obj, ttl, age, tick(fx, dt) }
  }

  add(obj, ttl, tick) {
    this.scene.add(obj);
    this.live.push({ obj, ttl, age: 0, tick });
  }

  /** Expanding bark/howl ring at pos. */
  ring(pos, color = '#ffd166', maxR = 6, ttl = 0.7) {
    const geo = new THREE.RingGeometry(0.9, 1.0, 32);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(pos[0], pos[1] + 0.25, pos[2]);
    this.add(mesh, ttl, (fx, dt, k) => {
      const s = 1 + k * maxR;
      fx.obj.scale.set(s, s, 1);
      fx.obj.material.opacity = 1 - k;
    });
  }

  /** Particle burst (tussle stars, dig dust, splash droplets). */
  burst(pos, { color = '#ffffff', n = 10, speed = 3, up = 3, size = 0.09, ttl = 0.6, gravity = -9 } = {}) {
    const geo = new THREE.SphereGeometry(size, 4, 3);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true });
    const mesh = new THREE.InstancedMesh(geo, mat, n);
    const parts = [];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = speed * (0.4 + Math.random() * 0.6);
      parts.push({
        x: pos[0], y: pos[1] + 0.3, z: pos[2],
        vx: Math.cos(a) * sp, vy: up * (0.5 + Math.random()), vz: Math.sin(a) * sp,
      });
    }
    const dummy = new THREE.Object3D();
    this.add(mesh, ttl, (fx, dt, k) => {
      for (let i = 0; i < n; i++) {
        const p = parts[i];
        p.vy += gravity * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        dummy.position.set(p.x, Math.max(0.05, p.y), p.z);
        dummy.scale.setScalar(1 - k * 0.7);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mat.opacity = 1 - k * k;
    });
  }

  /** Floating hearts when an NPC pets a dog. */
  hearts(pos, n = 4) {
    for (let i = 0; i < n; i++) {
      const heart = makeHeart();
      heart.position.set(pos[0] + (Math.random() - 0.5), pos[1] + 0.8, pos[2] + (Math.random() - 0.5));
      const drift = (Math.random() - 0.5) * 0.6;
      this.add(heart, 1.4 + Math.random() * 0.4, (fx, dt, k) => {
        fx.obj.position.y += dt * 1.1;
        fx.obj.position.x += drift * dt;
        fx.obj.rotation.y += dt * 3;
        fx.obj.material.opacity = 1 - k * k;
      });
    }
  }

  update(dt, camera) {
    for (let i = this.live.length - 1; i >= 0; i--) {
      const fx = this.live[i];
      fx.age += dt;
      const k = Math.min(1, fx.age / fx.ttl);
      fx.tick(fx, dt, k);
      if (fx.age >= fx.ttl) {
        this.scene.remove(fx.obj);
        fx.obj.geometry?.dispose();
        fx.obj.material?.dispose();
        this.live.splice(i, 1);
      }
    }
  }
}

// ─── Paw print trails ────────────────────────────────────────────────────────
// Ring buffer of instanced decals stamped under running dogs, fading out.

const PRINT_MAX = 96;
const PRINT_TTL = 7;

export class PawPrints {
  constructor(scene) {
    this.mesh = new THREE.InstancedMesh(
      new THREE.PlaneGeometry(0.22, 0.28),
      new THREE.MeshBasicMaterial({
        map: pawTexture(), transparent: true, depthWrite: false,
        color: '#3a3026', opacity: 0.55,
      }),
      PRINT_MAX);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    scene.add(this.mesh);
    this.slots = new Array(PRINT_MAX).fill(null);   // {age} | null
    this.next = 0;
    this.dummy = new THREE.Object3D();
    // park all instances out of sight
    this.dummy.position.set(0, -50, 0);
    this.dummy.updateMatrix();
    for (let i = 0; i < PRINT_MAX; i++) this.mesh.setMatrixAt(i, this.dummy.matrix);
  }

  /** Stamp one print flat on the ground, nudged left/right of the path. */
  stamp(x, y, z, facing, side) {
    const i = this.next;
    this.next = (this.next + 1) % PRINT_MAX;
    this.slots[i] = { age: 0, i };
    const d = this.dummy;
    d.position.set(
      x + Math.cos(facing) * side * 0.14,
      y + 0.02,
      z - Math.sin(facing) * side * 0.14);
    d.rotation.set(-Math.PI / 2, 0, -facing);
    d.scale.setScalar(1);
    d.updateMatrix();
    this.mesh.setMatrixAt(i, d.matrix);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  update(dt) {
    let dirty = false;
    for (let i = 0; i < PRINT_MAX; i++) {
      const s = this.slots[i];
      if (!s) continue;
      s.age += dt;
      if (s.age >= PRINT_TTL) {
        this.slots[i] = null;
        this.dummy.position.set(0, -50, 0);
        this.dummy.scale.setScalar(0.001);
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(i, this.dummy.matrix);
        dirty = true;
      }
    }
    if (dirty) this.mesh.instanceMatrix.needsUpdate = true;
  }
}

function pawTexture() {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 64;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#fff';
  const pad = (x, y, rx, ry) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, 7);
    ctx.fill();
  };
  pad(32, 42, 13, 11);                 // main pad
  pad(14, 24, 6, 8); pad(28, 16, 6, 8); pad(42, 17, 6, 8); pad(52, 27, 5, 7);  // toes
  const tex = new THREE.CanvasTexture(cv);
  return tex;
}

function makeHeart() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.12);
  shape.bezierCurveTo(-0.22, 0.08, -0.1, 0.22, 0, 0.1);
  shape.bezierCurveTo(0.1, 0.22, 0.22, 0.08, 0, -0.12);
  const geo = new THREE.ShapeGeometry(shape);
  const mat = new THREE.MeshBasicMaterial({ color: '#ff6b8a', transparent: true, side: THREE.DoubleSide, depthWrite: false });
  return new THREE.Mesh(geo, mat);
}
