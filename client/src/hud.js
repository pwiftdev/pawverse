// ─── HUD ─────────────────────────────────────────────────────────────────────
// DOM overlay: the big altitude readout, live + all-time leaderboards, the
// event feed, toasts, milestone flashes, projected player labels with chat
// bubbles, and the chat input. main.js owns projection math and calls in.

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function createHud({ onChat }) {
  const $ = (id) => document.getElementById(id);
  const hud = $("hud");
  const altEl = $("alt");
  const bestEl = $("best").querySelector("b");
  const bestFill = $("bestfill");
  const liveEl = $("live");
  const allEl = $("all");
  const rankEl = $("rank");
  const feedEl = $("feed");
  const toastsEl = $("toasts");
  const milestoneEl = $("milestone");
  const labelsEl = $("labels");
  const hintEl = $("hint");
  const chatbar = $("chatbar");
  const chatinput = $("chatinput");
  const connEl = $("conn");

  let chatOpen = false;
  let lastAltShown = -1;

  chatinput.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      const text = chatinput.value.trim();
      if (text) onChat(text);
      closeChat();
    } else if (e.key === "Escape") {
      closeChat();
    }
  });

  function openChat() {
    chatOpen = true;
    chatbar.classList.add("on");
    chatinput.value = "";
    setTimeout(() => chatinput.focus(), 0);
  }
  function closeChat() {
    chatOpen = false;
    chatbar.classList.remove("on");
    chatinput.blur();
  }

  // hint fades out after a while
  setTimeout(() => (hintEl.style.opacity = "0"), 22_000);

  const labelPool = new Map(); // id → div

  return {
    show() {
      hud.classList.add("on");
    },
    hide() {
      hud.classList.remove("on");
    },

    get chatOpen() {
      return chatOpen;
    },
    openChat,
    closeChat,

    setConnecting(on) {
      connEl.classList.toggle("on", on);
    },

    setAltitude(alt, best) {
      const a = Math.max(0, Math.round(alt));
      if (a !== lastAltShown) {
        lastAltShown = a;
        altEl.innerHTML = `${a}<small>m</small>`;
      }
      bestEl.textContent = `${Math.max(0, Math.round(best))}m`;
      const pct = best > 0 ? Math.min(100, (Math.max(0, alt) / best) * 100) : 0;
      bestFill.style.width = pct + "%";
    },

    setBoard(live, all, rank, myId, leaderId) {
      liveEl.innerHTML = live
        .map(
          (r) =>
            `<div class="row${r.id === myId ? " me" : ""}${
              r.id === leaderId ? " lead" : ""
            }"><span class="n">${esc(r.n)}</span><span class="a">${r.alt}m</span></div>`,
        )
        .join("");
      allEl.innerHTML = all.length
        ? all
            .map(
              (r) =>
                `<div class="row"><span class="n">${esc(r.n)}</span><span class="a">${r.alt}m</span></div>`,
            )
            .join("")
        : '<div class="row"><span class="n" style="color:var(--dim)">be the first legend</span></div>';
      rankEl.textContent = rank ? `YOU ARE #${rank} ON THE TOWER` : "";
    },

    feed(html, gold = false) {
      const line = document.createElement("div");
      line.className = "line" + (gold ? " gold" : "");
      line.innerHTML = html;
      feedEl.prepend(line);
      while (feedEl.children.length > 6) feedEl.lastChild.remove();
      setTimeout(() => {
        line.style.opacity = "0";
        setTimeout(() => line.remove(), 700);
      }, 6000);
    },

    toast(text, cls = "") {
      const el = document.createElement("div");
      el.className = "toast " + cls;
      el.textContent = text;
      toastsEl.append(el);
      setTimeout(() => {
        el.style.transition = "opacity .4s";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 450);
      }, 2300);
    },

    milestone(alt) {
      milestoneEl.textContent = `${alt}m`;
      milestoneEl.classList.remove("pop");
      void milestoneEl.offsetWidth; // restart the animation
      milestoneEl.classList.add("pop");
    },

    /**
     * Reposition projected labels. entries: [{id, sx, sy, name, alt, chat,
     * isLeader, visible}] — sx/sy in CSS pixels; visible=false hides.
     */
    updateLabels(entries) {
      const seen = new Set();
      for (const e of entries) {
        seen.add(e.id);
        let el = labelPool.get(e.id);
        if (!el) {
          el = document.createElement("div");
          el.className = "label";
          el.innerHTML =
            '<div class="bubble" style="display:none"></div><div class="ln"></div><div class="la"></div>';
          labelsEl.append(el);
          labelPool.set(e.id, el);
          el._b = el.children[0];
          el._n = el.children[1];
          el._a = el.children[2];
        }
        if (!e.visible) {
          el.style.display = "none";
          continue;
        }
        el.style.display = "";
        el.style.transform = `translate(-50%, -100%) translate(${e.sx}px, ${e.sy}px)`;
        el.classList.toggle("lead", !!e.isLeader);
        const nm = (e.isLeader ? "👑 " : "") + e.name;
        if (el._n.textContent !== nm) el._n.textContent = nm;
        const at = `${e.alt}m`;
        if (el._a.textContent !== at) el._a.textContent = at;
        if (e.chat) {
          el._b.style.display = "";
          if (el._b.textContent !== e.chat) el._b.textContent = e.chat;
        } else {
          el._b.style.display = "none";
        }
      }
      for (const [id, el] of labelPool) {
        if (!seen.has(id)) {
          el.remove();
          labelPool.delete(id);
        }
      }
    },
  };
}
