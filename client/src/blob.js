// ─── Blob factory ────────────────────────────────────────────────────────────
// The stars of TOPPLE: squishy googly-eyed blobs with stubby feet. Fully
// procedural (zero assets), one per player, coloured from BLOB_COLORS.
// Faces −z at rotation 0, matching movement's forward = [sin(yaw), −cos(yaw)]
// via group.rotation.y = −yaw.

import * as THREE from "three";
import { BLOB_COLORS } from "../../shared/constants.js";
import { BODY_RADIUS } from "../../shared/constants.js";

const bodyGeo = new THREE.SphereGeometry(BODY_RADIUS, 24, 18);
const eyeGeo = new THREE.SphereGeometry(0.105, 12, 10);
const pupilGeo = new THREE.SphereGeometry(0.05, 8, 8);
const glintGeo = new THREE.SphereGeometry(0.018, 6, 6);
const footGeo = new THREE.SphereGeometry(0.115, 10, 8);
const mouthGeo = new THREE.TorusGeometry(0.075, 0.02, 6, 12, Math.PI);

const eyeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.25,
});
const pupilMat = new THREE.MeshStandardMaterial({
  color: 0x14161f,
  roughness: 0.3,
});
const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mouthMat = new THREE.MeshStandardMaterial({
  color: 0x3a2a2a,
  roughness: 0.7,
});
const crownMat = new THREE.MeshStandardMaterial({
  color: 0xffd166,
  roughness: 0.25,
  metalness: 0.7,
  emissive: 0xaa7711,
  emissiveIntensity: 0.55,
});

function buildCrown() {
  const g = new THREE.Group();
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.185, 0.09, 10, 1, true),
    crownMat,
  );
  g.add(band);
  for (let i = 0; i < 5; i++) {
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.045, 0.11, 6),
      crownMat,
    );
    const a = (i / 5) * Math.PI * 2;
    spike.position.set(Math.cos(a) * 0.155, 0.09, Math.sin(a) * 0.155);
    g.add(spike);
  }
  g.position.y = BODY_RADIUS * 0.96 + 0.05;
  g.rotation.y = 0.3;
  g.visible = false;
  return g;
}

/**
 * @param colorIndex BLOB_COLORS index
 * @returns { group, body, eyes, feet, crown, seed } — animator mutates these.
 */
export function createBlob(colorIndex) {
  const color = new THREE.Color(
    BLOB_COLORS[colorIndex % BLOB_COLORS.length] || BLOB_COLORS[0],
  );
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.set(1, 0.92, 1);
  body.castShadow = true;
  body.position.y = BODY_RADIUS * 0.92;
  group.add(body);

  // Googly eyes on the −z face
  const eyes = new THREE.Group();
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(side * 0.155, 0.1, -BODY_RADIUS * 0.82);
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = -0.075;
    const glint = new THREE.Mesh(glintGeo, glintMat);
    glint.position.set(0.022, 0.028, -0.11);
    eye.add(pupil, glint);
    eyes.add(eye);
  }
  eyes.position.y = BODY_RADIUS * 0.92;
  group.add(eyes);

  // Smile
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, BODY_RADIUS * 0.72, -BODY_RADIUS * 0.94);
  mouth.rotation.x = Math.PI; // arc opens upward → smile
  mouth.scale.set(1, 0.6, 1);
  group.add(mouth);

  // Stubby feet
  const feet = [];
  const darker = color.clone().multiplyScalar(0.72);
  const footMat = new THREE.MeshStandardMaterial({
    color: darker,
    roughness: 0.6,
  });
  for (const side of [-1, 1]) {
    const foot = new THREE.Mesh(footGeo, footMat);
    foot.scale.set(1, 0.62, 1.25);
    foot.position.set(side * 0.185, 0.07, 0);
    foot.castShadow = true;
    group.add(foot);
    feet.push(foot);
  }

  const crown = buildCrown();
  crown.position.y = BODY_RADIUS * 1.85;
  group.add(crown);

  return {
    group,
    body,
    eyes,
    mouth,
    feet,
    crown,
    seed: Math.random() * 100, // desyncs blink/wobble phases between blobs
    squash: 0, // landing squash impulse, decays in animator
  };
}

export function disposeBlob(blob) {
  blob.body.material.dispose();
  blob.feet[0]?.material.dispose();
}
