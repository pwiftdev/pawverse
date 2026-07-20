// ─── HUD ─────────────────────────────────────────────────────────────────────
// Scoreboard, reputation, toasts, throw power, chat, connection status —
// plus the live minimap, the Top Paws leaderboard, the Pup Goals objective
// tracker, and the clickable emote bar. Pure DOM/canvas; the 3D layer feeds
// it data and never touches these elements directly.

import { REP, WORLD_SIZE } from "../../shared/constants.js";
import {
  FOUNTAIN,
  BALL_SPAWNERS,
  TREAT_STANDS,
  FENCED_YARD,
  TREES,
  DIG_SPOTS,
} from "../../shared/world.js";

const $ = (id) => document.getElementById(id);

// Objectives: id → { label, check(ev, myId) } — checked against server events.
const OBJECTIVES = [
  {
    id: "bark",
    label: "Call hello",
    ev: (e, me) => e.kind === "bark" && e.id === me,
  },
  {
    id: "fetch",
    label: "Pick up a ball",
    ev: (e, me) => e.kind === "pickup" && e.dog === me,
  },
  {
    id: "catch",
    label: "Catch a ball mid-air",
    ev: (e, me) => e.kind === "pickup" && e.dog === me && e.caught,
  },
  {
    id: "pet",
    label: "Get petted by a human",
    ev: (e, me) => e.kind === "pet" && e.dog === me,
  },
  { id: "swim", label: "Go for a swim", local: "swim" },
  {
    id: "howl",
    label: "Howl with a friend",
    ev: (e, me) => e.kind === "grouphowl" && e.ids?.includes(me),
  },
  {
    id: "chase",
    label: "Chase a raccoon",
    ev: (e, me) => e.kind === "chase" && e.dog === me,
  },
  {
    id: "dig",
    label: "Dig up a treasure",
    ev: (e, me) => e.kind === "treasure" && e.dog === me,
  },
  {
    id: "echo",
    label: "Howl from Howl Rock",
    ev: (e, me) => e.kind === "echo" && e.id === me,
  },
  {
    id: "trick",
    label: "Put on a trick show",
    ev: (e, me) => e.kind === "trick" && e.dog === me,
  },
];
const OBJ_LS_KEY = "pawverse.goals";
const JOURNAL_LS_KEY = "pawverse.journal.v1";

export class Hud {
  constructor({ onChatSend, onEmote, onBark, onSniff }) {
    this.el = {
      hud: $("hud"),
      zoomies: $("s-zoomies"),
      treats: $("s-treats"),
      happy: $("happy-fill"),
      lifeWrap: $("life-wrap"),
      lifePips: $("life-pips"),
      roleLabel: $("role-label"),
      repDot: $("rep-dot"),
      repLabel: $("rep-label"),
      power: $("power-wrap"),
      powerFill: $("power-fill"),
      toasts: $("toasts"),
      chatWrap: $("chat-wrap"),
      chatInput: $("chat-input"),
      clickToPlay: $("click-to-play"),
      conn: $("conn-status"),
      minimap: $("minimap"),
      lbRows: $("lb-rows"),
      lbRank: $("lb-rank"),
      objList: $("obj-list"),
      objHead: $("obj-head"),
      objCount: $("obj-count"),
      ufName: $("uf-name"),
      ufPortrait: $("uf-portrait"),
      chatLog: $("chat-log"),
      needPlay: $("need-play"),
      needSocial: $("need-social"),
      needExplore: $("need-explore"),
      mood: $("mood-label"),
      park: $("park-event"),
      parkName: $("park-name"),
      parkProgress: $("park-progress"),
      parkTime: $("park-time"),
      journal: $("journal"),
      journalLevel: $("journal-level"),
      journalXp: $("journal-xp"),
      journalDiscoveries: $("journal-discoveries"),
      journalEvents: $("journal-events"),
    };
    this.lastZoomies = 0;
    this.chatOpen = false;
    this.mapCtx = this.el.minimap.getContext("2d");
    this.mapBase = null; // pre-rendered park layout
    this.lastMapDraw = 0;
    this.lastLivingSecond = -1;
    this.connectionHideTimer = null;
    this.parkEvent = null;
    this.journal = this.loadJournal();

    this.el.chatInput.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.code === "Enter") {
        const text = this.el.chatInput.value.trim();
        if (text) onChatSend(text);
        this.closeChat();
      } else if (e.code === "Escape") {
        this.closeChat();
      }
    });

    // emote bar (buttons never steal keyboard focus from the game)
    for (const btn of document.querySelectorAll(".emote-btn")) {
      btn.addEventListener("click", () => {
        if (btn.dataset.emote) onEmote(btn.dataset.emote);
        else if (btn.dataset.action === "bark") onBark();
        else if (btn.dataset.action === "sniff") onSniff();
        btn.blur();
      });
    }

    // objectives
    try {
      const savedGoals = JSON.parse(localStorage.getItem(OBJ_LS_KEY) || "[]");
      const knownGoals = new Set(OBJECTIVES.map((objective) => objective.id));
      this.goals = new Set(
        Array.isArray(savedGoals)
          ? savedGoals
              .filter((id) => knownGoals.has(id))
              .slice(0, OBJECTIVES.length)
          : [],
      );
    } catch {
      this.goals = new Set();
    }
    this.el.objHead.addEventListener("click", () =>
      this.el.objList.classList.toggle("hidden"),
    );
    this.renderObjectives();
    this.renderJournal();

    // controls help popover
    $("help-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      $("hint-panel").classList.toggle("open");
    });
  }

  loadJournal() {
    try {
      const saved = JSON.parse(localStorage.getItem(JOURNAL_LS_KEY) || "{}");
      const xp = Number(saved.xp);
      return {
        xp: Number.isFinite(xp) ? Math.min(1_000_000, Math.max(0, xp)) : 0,
        discoveries: Array.isArray(saved.discoveries)
          ? saved.discoveries
              .filter(
                (entry) =>
                  entry &&
                  typeof entry.id === "string" &&
                  typeof entry.label === "string",
              )
              .slice(0, 100)
          : [],
        events: Array.isArray(saved.events)
          ? saved.events.filter(Number.isFinite).slice(0, 100)
          : [],
      };
    } catch {
      return { xp: 0, discoveries: [], events: [] };
    }
  }

  saveJournal() {
    try {
      localStorage.setItem(JOURNAL_LS_KEY, JSON.stringify(this.journal));
    } catch {
      // Progress remains available for this session when storage is unavailable.
    }
  }

  getDiscoveryIds() {
    return this.journal.discoveries.map((entry) => entry.id);
  }

  setIdentity(name, coatColor, species = "dog") {
    this.el.ufName.textContent = name;
    this.el.ufPortrait.style.borderColor = coatColor;
    this.el.ufPortrait.style.boxShadow = `0 0 16px ${coatColor}66, inset 0 0 12px rgba(0,0,0,0.6)`;
    this.el.lifeWrap.hidden = species === "dog";
    this.el.roleLabel.textContent = species === "dog" ? "Hunter" : "Runner";
  }

  /** Append a line to the bottom-left chat log (auto-fading, capped). */
  addChatLine(name, text, isMe = false) {
    const div = document.createElement("div");
    div.className = `chat-line${isMe ? " me" : ""}`;
    const b = document.createElement("b");
    b.textContent = `${name}: `;
    div.appendChild(b);
    div.appendChild(document.createTextNode(text));
    this.el.chatLog.appendChild(div);
    while (this.el.chatLog.children.length > 8)
      this.el.chatLog.firstChild.remove();
    setTimeout(() => {
      div.style.opacity = "0";
    }, 12000);
    setTimeout(() => div.remove(), 14000);
  }

  show() {
    this.el.hud.style.display = "block";
  }

  setConnection(state) {
    clearTimeout(this.connectionHideTimer);
    this.el.conn.textContent = state;
    this.el.conn.classList.toggle("bad", state !== "online");
    if (state === "online") {
      this.connectionHideTimer = setTimeout(() => {
        this.el.conn.style.display = "none";
      }, 1500);
    } else {
      this.el.conn.style.display = "block";
    }
  }

  /** SCORE message from the server. Toasts the zoomies delta. */
  setScore({ zoomies, happiness, treats, rep, needs, life, maxLife }) {
    if (zoomies > this.lastZoomies)
      this.toast(`+${zoomies - this.lastZoomies} Zoomies ⚡`, "good");
    this.lastZoomies = zoomies;
    this.el.zoomies.textContent = zoomies;
    this.el.treats.textContent = treats;
    this.el.happy.style.width = `${happiness}%`;
    const k = (rep - REP.MIN) / (REP.MAX - REP.MIN); // 0..1
    this.el.repDot.style.left = `${(k * 100).toFixed(1)}%`;
    this.el.repLabel.textContent =
      rep >= REP.GOOD_BOY
        ? "😇 Good Boy"
        : rep <= REP.MENACE
          ? "😈 Menace"
          : "Neutral";
    if (needs) this.setNeeds(needs);
    if (Number.isFinite(life) && Number.isFinite(maxLife))
      this.setLife(life, maxLife);
  }

  setLife(life, maxLife) {
    this.el.lifePips.replaceChildren(
      ...Array.from({ length: maxLife }, (_, index) => {
        const pip = document.createElement("i");
        pip.className = index < life ? "full" : "";
        return pip;
      }),
    );
  }

  setNeeds(needs) {
    this.el.needPlay.style.width = `${needs.play}%`;
    this.el.needSocial.style.width = `${needs.social}%`;
    this.el.needExplore.style.width = `${needs.explore}%`;
    const strongest = Object.entries(needs).sort((a, b) => b[1] - a[1])[0];
    const labels = {
      play: "Playful",
      social: "Pack-minded",
      explore: "Curious",
    };
    this.el.mood.textContent =
      strongest[1] >= 70 ? labels[strongest[0]] : "Content";
  }

  toast(text, kind = "") {
    const div = document.createElement("div");
    div.className = `toast ${kind}`;
    div.textContent = text;
    this.el.toasts.appendChild(div);
    setTimeout(() => div.remove(), 2400);
  }

  setPower(k) {
    // null hides the bar
    if (k === null) {
      this.el.power.style.display = "none";
      return;
    }
    this.el.power.style.display = "block";
    this.el.powerFill.style.width = `${(k * 100).toFixed(0)}%`;
  }

  openChat() {
    this.chatOpen = true;
    this.el.chatWrap.style.display = "block";
    document.exitPointerLock?.();
    this.el.chatInput.value = "";
    this.el.chatInput.focus();
  }

  closeChat() {
    this.chatOpen = false;
    this.el.chatWrap.style.display = "none";
    this.el.chatInput.blur();
  }

  /** "click to grab the mouse" overlay when pointer lock is lost mid-game. */
  setPointerHint(show) {
    this.el.clickToPlay.style.display = show ? "flex" : "none";
  }

  // ── leaderboard ────────────────────────────────────────────────────────────

  setLeaderboard(top, rank) {
    this.el.lbRows.innerHTML = "";
    const myName = localStorage.getItem("pawverse.name") || "";
    top.forEach((row, i) => {
      const div = document.createElement("div");
      div.className = `lb-row${row.n === myName && rank === i + 1 ? " me" : ""}`;
      div.innerHTML = `<span class="n">${i + 1}. ${escapeHtml(row.n)}</span><span class="z">${row.z}</span>`;
      this.el.lbRows.appendChild(div);
    });
    this.el.lbRank.textContent = rank > 5 ? `you: #${rank}` : "";
  }

  // ── objectives ─────────────────────────────────────────────────────────────

  renderObjectives() {
    this.el.objList.innerHTML = "";
    for (const o of OBJECTIVES) {
      const done = this.goals.has(o.id);
      const div = document.createElement("div");
      div.className = `obj${done ? " done" : ""}`;
      div.innerHTML = `<span class="tick">${done ? "✓" : ""}</span>${o.label}`;
      this.el.objList.appendChild(div);
    }
    this.el.objCount.textContent = `${this.goals.size}/${OBJECTIVES.length}`;
  }

  completeGoal(o) {
    if (this.goals.has(o.id)) return;
    this.goals.add(o.id);
    try {
      localStorage.setItem(OBJ_LS_KEY, JSON.stringify([...this.goals]));
    } catch {
      // The completed goal remains in memory for this session.
    }
    this.journal.xp += 10;
    this.saveJournal();
    this.toast(`📋 Goal complete: ${o.label}!`, "good");
    this.renderObjectives();
    this.renderJournal();
  }

  recordDiscovery(ev) {
    if (this.journal.discoveries.some((entry) => entry.id === ev.spot)) return;
    this.journal.discoveries.push({
      id: ev.spot,
      label: ev.label,
      kind: ev.discoveryKind,
    });
    this.journal.xp += 25;
    this.saveJournal();
    this.renderJournal();
    this.toast(`Discovered: ${ev.label}`, "good");
  }

  recordParkCompletion(event, participated) {
    if (!participated || this.journal.events.includes(event.id)) return;
    this.journal.events.push(event.id);
    this.journal.xp += 40;
    this.saveJournal();
    this.renderJournal();
  }

  renderJournal() {
    const level = Math.floor(this.journal.xp / 100) + 1;
    this.el.journalLevel.textContent = `Trailblazer ${level}`;
    this.el.journalXp.textContent = `${this.journal.xp % 100}/100 XP`;
    this.el.journalDiscoveries.textContent = `${this.journal.discoveries.length} scents found`;
    this.el.journalEvents.textContent = `${this.journal.events.length} park events completed`;
  }

  toggleJournal() {
    this.el.journal.classList.toggle("open");
  }

  setParkEvent(event) {
    this.parkEvent = event;
    this.lastLivingSecond = -1;
    this.el.park.style.display = event ? "block" : "none";
    if (!event) return;
    this.el.parkName.textContent = event.complete
      ? `${event.label} complete`
      : event.label;
    this.el.parkProgress.style.width = `${Math.min(100, (event.progress / event.target) * 100)}%`;
  }

  updateLiving(now = Date.now()) {
    if (!this.parkEvent) return;
    const seconds = Math.max(
      0,
      Math.ceil((this.parkEvent.endsAt - now) / 1000),
    );
    if (seconds === this.lastLivingSecond) return;
    this.lastLivingSecond = seconds;
    this.el.parkTime.textContent = this.parkEvent.complete
      ? "New event soon"
      : `${this.parkEvent.progress}/${this.parkEvent.target} · ${this.parkEvent.participants}/${this.parkEvent.requiredParticipants} pack · ${seconds}s`;
  }

  /** Feed every server event through the objective checkers. */
  trackEvent(ev, myId) {
    for (const o of OBJECTIVES) {
      if (o.ev && o.ev(ev, myId)) this.completeGoal(o);
    }
  }

  /** Local (non-event) triggers, e.g. swimming. */
  trackLocal(kind) {
    for (const o of OBJECTIVES) {
      if (o.local === kind) this.completeGoal(o);
    }
  }

  // ── minimap ────────────────────────────────────────────────────────────────

  /** Pre-render the static park layout once. */
  buildMapBase() {
    const size = this.el.minimap.width;
    const cv = document.createElement("canvas");
    cv.width = cv.height = size;
    const ctx = cv.getContext("2d");
    const k = size / WORLD_SIZE; // world → map scale
    const M = (wx, wz) => [size / 2 + wx * k, size / 2 + wz * k];

    // lawn
    ctx.fillStyle = "#27431f";
    ctx.fillRect(0, 0, size, size);
    // sea (east strip) + beach
    ctx.fillStyle = "#b9a06455";
    ctx.fillRect(...M(52, -WORLD_SIZE / 2), (WORLD_SIZE / 2 - 52) * k, size);
    ctx.fillStyle = "#2e6a94";
    ctx.fillRect(...M(66, -WORLD_SIZE / 2), (WORLD_SIZE / 2 - 66) * k, size);
    // fenced yard
    ctx.strokeStyle = "#8a6a4877";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      ...M(
        FENCED_YARD.x - FENCED_YARD.w / 2,
        FENCED_YARD.z - FENCED_YARD.d / 2,
      ),
      FENCED_YARD.w * k,
      FENCED_YARD.d * k,
    );
    // trees
    ctx.fillStyle = "#39632f";
    for (const t of TREES) {
      const [x, y] = M(t.x, t.z);
      ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
    }
    // fountain
    const [fx, fy] = M(FOUNTAIN.x, FOUNTAIN.z);
    ctx.fillStyle = "#4d9fd4";
    ctx.beginPath();
    ctx.arc(fx, fy, FOUNTAIN.r * k + 1, 0, 7);
    ctx.fill();
    // ball pads
    const padColors = ["#e5533f", "#3f8fe5", "#46c46a", "#e5b53f"];
    for (const s of BALL_SPAWNERS) {
      const [x, y] = M(s.x, s.z);
      ctx.fillStyle = padColors[s.id % 4];
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, 7);
      ctx.fill();
    }
    // treat stands
    ctx.fillStyle = "#c8874f";
    for (const s of TREAT_STANDS) {
      const [x, y] = M(s.x, s.z);
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
    // dig spots
    ctx.fillStyle = "#8a6a3f";
    for (const s of DIG_SPOTS) {
      const [x, y] = M(s.x, s.z);
      ctx.beginPath();
      ctx.arc(x, y, 1.4, 0, 7);
      ctx.fill();
    }
    this.mapBase = cv;
  }

  /** Live layer: me (arrow), other players, raccoons. Throttled to ~15 fps. */
  drawMinimap(net, pos) {
    const now = performance.now();
    if (now - this.lastMapDraw < 66) return;
    this.lastMapDraw = now;
    if (!this.mapBase) this.buildMapBase();

    const ctx = this.mapCtx;
    const size = this.el.minimap.width;
    const k = size / WORLD_SIZE;
    ctx.clearRect(0, 0, size, size);
    // circular clip — the minimap is a WoW-style round map
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 7);
    ctx.clip();
    ctx.drawImage(this.mapBase, 0, 0);

    // other players
    ctx.fillStyle = "#ffd166";
    for (const rec of net.dogs.values()) {
      const s = rec.buf[rec.buf.length - 1];
      if (!s) continue;
      ctx.beginPath();
      ctx.arc(size / 2 + s.p[0] * k, size / 2 + s.p[2] * k, 2.2, 0, 7);
      ctx.fill();
    }
    // raccoons
    ctx.fillStyle = "#c9925f";
    for (const rec of net.raccoons.values()) {
      const s = rec.buf[rec.buf.length - 1];
      if (!s) continue;
      ctx.fillRect(size / 2 + s.p[0] * k - 1, size / 2 + s.p[2] * k - 1, 2, 2);
    }
    // me: arrow pointing camera-forward
    const mx = size / 2 + pos.x * k,
      my = size / 2 + pos.z * k;
    ctx.save();
    ctx.translate(mx, my);
    // arrow art points up (−y); rotating (0,−1) by yaw gives (sin yaw, −cos yaw),
    // which is exactly the camera-forward vector in map space
    ctx.rotate(net.move.yaw);
    ctx.fillStyle = "#6ee7a0";
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(3.4, 4);
    ctx.lineTo(0, 2.2);
    ctx.lineTo(-3.4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.restore(); // pops the circular clip
  }
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
}
