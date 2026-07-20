const TUTORIAL_KEY = "pawverse.tutorial.v1";

function hasSeenTutorial() {
  try {
    return localStorage.getItem(TUTORIAL_KEY) === "complete";
  } catch {
    return false;
  }
}

function rememberTutorial() {
  try {
    localStorage.setItem(TUTORIAL_KEY, "complete");
  } catch {
    // The tutorial can still finish when browser storage is unavailable.
  }
}

export function beginTutorial(onComplete) {
  const overlay = document.getElementById("tutorial");
  const start = document.getElementById("tutorial-start");

  if (hasSeenTutorial() || !overlay || !start) {
    onComplete();
    return;
  }

  overlay.hidden = false;
  requestAnimationFrame(() => start.focus());
  start.addEventListener(
    "click",
    () => {
      rememberTutorial();
      overlay.hidden = true;
      onComplete();
    },
    { once: true },
  );
}
