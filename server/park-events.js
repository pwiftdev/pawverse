import {
  PARK_EVENT_CELEBRATION_MS,
  PARK_EVENT_DEFS,
  PARK_EVENT_DURATION_MS,
} from "../shared/living.js";

export class ParkEventSystem {
  constructor(now = Date.now()) {
    this.sequence = 0;
    this.current = null;
    this.startNext(now);
  }

  startNext(now) {
    const def = PARK_EVENT_DEFS[this.sequence % PARK_EVENT_DEFS.length];
    this.sequence += 1;
    this.current = {
      id: this.sequence,
      ...def,
      progress: 0,
      endsAt: now + PARK_EVENT_DURATION_MS,
      complete: false,
      requiredParticipants: 1,
      contributors: new Set(),
    };
  }

  update(now) {
    if (now < this.current.endsAt) return false;
    this.startNext(now);
    return true;
  }

  record(kind, playerId, now, requiredParticipants = 1) {
    const event = this.current;
    if (event.complete || event.kind !== kind || now >= event.endsAt)
      return null;
    event.requiredParticipants = Math.max(1, requiredParticipants);
    event.progress = Math.min(event.target, event.progress + 1);
    event.contributors.add(playerId);
    if (
      event.progress < event.target ||
      event.contributors.size < event.requiredParticipants
    )
      return { completedIds: [] };
    event.complete = true;
    event.endsAt = now + PARK_EVENT_CELEBRATION_MS;
    return { completedIds: [...event.contributors] };
  }

  serialize() {
    const { contributors, ...event } = this.current;
    return { ...event, participants: contributors.size };
  }
}
