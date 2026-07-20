import * as THREE from "three";
import { SCENT_REVEAL_RADIUS, SCENT_SPOTS } from "../../shared/living.js";
import { groundHeightAt } from "../../shared/world.js";

const KIND_COLORS = {
  landmark: "#ffd166",
  nature: "#7be8a8",
  place: "#9ad1ff",
  vista: "#c9a6ff",
};

export class ScentSystem {
  constructor(scene, effects) {
    this.effects = effects;
    this.activeUntil = 0;
    this.discovered = new Set();
    this.markers = SCENT_SPOTS.map((spot) => this.createMarker(scene, spot));
    this.trail = this.createTrail(scene);
  }

  createMarker(scene, spot) {
    const group = new THREE.Group();
    const color = KIND_COLORS[spot.kind] || "#ffffff";
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.045, 6, 24),
      material,
    );
    ring.rotation.x = Math.PI / 2;
    const mote = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.12, 0),
      material,
    );
    mote.position.y = 0.8;
    group.add(ring, mote);
    group.position.set(spot.x, groundHeightAt(spot.x, spot.z) + 0.12, spot.z);
    group.visible = false;
    scene.add(group);
    return { spot, group, material, mote };
  }

  createTrail(scene) {
    const material = new THREE.MeshBasicMaterial({
      color: "#b9f6d0",
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    const points = Array.from({ length: 7 }, () => {
      const point = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 5, 4),
        material,
      );
      point.visible = false;
      scene.add(point);
      return point;
    });
    return { material, points };
  }

  sniff(pos) {
    this.activeUntil = performance.now() + 5000;
    this.effects.ring([pos.x, pos.y, pos.z], "#b9f6d0", 12, 1.2);
  }

  setDiscovered(spotIds) {
    this.discovered = new Set(spotIds);
  }

  discover(spotId, pos) {
    this.discovered.add(spotId);
    this.effects.burst(pos, {
      color: "#ffe28a",
      n: 24,
      speed: 3,
      up: 5,
      size: 0.075,
      ttl: 1,
    });
  }

  update(pos, now = performance.now()) {
    const active = now < this.activeUntil;
    let nearest = null;
    let nearestDistance = SCENT_REVEAL_RADIUS;
    for (let i = 0; i < this.markers.length; i++) {
      const marker = this.markers[i];
      const distance = Math.hypot(pos.x - marker.spot.x, pos.z - marker.spot.z);
      const visible =
        active &&
        !this.discovered.has(marker.spot.id) &&
        distance < SCENT_REVEAL_RADIUS;
      marker.group.visible = visible;
      if (!visible) continue;
      const strength = 1 - distance / SCENT_REVEAL_RADIUS;
      marker.material.opacity = 0.25 + strength * 0.7;
      marker.group.rotation.y = now * 0.001 + i;
      marker.mote.position.y = 0.75 + Math.sin(now * 0.003 + i) * 0.16;
      if (distance < nearestDistance) {
        nearest = marker;
        nearestDistance = distance;
      }
    }
    this.updateTrail(active ? nearest : null, pos, now);
  }

  updateTrail(marker, pos, now) {
    this.trail.material.opacity = marker ? 0.65 : 0;
    for (let i = 0; i < this.trail.points.length; i++) {
      const point = this.trail.points[i];
      point.visible = Boolean(marker);
      if (!marker) continue;
      const k = (i + 1) / (this.trail.points.length + 1);
      const x = THREE.MathUtils.lerp(pos.x, marker.spot.x, k);
      const z = THREE.MathUtils.lerp(pos.z, marker.spot.z, k);
      point.position.set(
        x,
        groundHeightAt(x, z) + 0.16 + Math.sin(now * 0.004 + i) * 0.05,
        z,
      );
      point.scale.setScalar(0.75 + Math.sin(now * 0.006 + i) * 0.2);
    }
  }
}
