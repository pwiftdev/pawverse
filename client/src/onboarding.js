const ROLE_COPY = {
  dog: {
    role: "hunter",
    title: "Dog objective: catch the runners",
    text: "Player cats and raccoons are runners. Get within bite range and press F. Three valid bites catch them and reset their session stats. Newly spawned runners are protected for five seconds.",
    button: "Enter as hunter",
  },
  runner: {
    role: "runner",
    title: "Your objective: escape the dogs",
    text: "Keep your distance from player dogs. Use WASD to move, hold Shift to sprint, and dodge through the park. A dog needs three valid bites to catch you. If caught, you respawn with reset session stats and five seconds of protection.",
    button: "Start running",
  },
};

function copyFor(species) {
  return species === "dog" ? ROLE_COPY.dog : ROLE_COPY.runner;
}

export function beginTutorial(species, onComplete) {
  const overlay = document.getElementById("tutorial");
  const prompt = document.getElementById("tutorial-role");
  const title = document.getElementById("tutorial-role-title");
  const text = document.getElementById("tutorial-role-text");
  const start = document.getElementById("tutorial-start");

  if (!overlay || !prompt || !title || !text || !start) {
    onComplete();
    return;
  }

  const copy = copyFor(species);
  prompt.dataset.role = copy.role;
  title.textContent = copy.title;
  text.textContent = copy.text;
  start.textContent = copy.button;
  overlay.hidden = false;
  requestAnimationFrame(() => start.focus());
  start.addEventListener(
    "click",
    () => {
      overlay.hidden = true;
      onComplete();
    },
    { once: true },
  );
}
