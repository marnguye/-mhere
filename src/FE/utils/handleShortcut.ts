import detectPlatform from "./detectPlatform";

export default function handleShortcut(e: KeyboardEvent, onTrigger: () => void) {
  const platform = detectPlatform();
  const key = e.key.toLocaleLowerCase();

  if (platform === "mac" && e.metaKey && key === "/") {
    e.preventDefault();
    onTrigger();
  }
  if (platform === 'windows' && e.ctrlKey && key === "/") {
    e.preventDefault();
    onTrigger();
  }
  if (platform === "linux" && e.getModifierState("Meta") && key === "/") {
    e.preventDefault();
    onTrigger();
  }
}

export function triggerShortcut(onTrigger: () => void) {
  window.addEventListener("keydown", (e) => handleShortcut(e, onTrigger));
}
