export default function detectPlatform() {
  const platform = navigator.userAgent.toLocaleLowerCase();

  const isMac = platform.includes("mac");
  const isWindows = platform.includes("win");
  const isLinux = platform.includes("linux");
  const isMobile = /iphone|ipad|android/.test(platform);

  if (isMobile) return "mobile";
  else if (isMac) return "mac";
  else if (isWindows) return "windows";
  else if (isLinux) return "linux";
  else return "other";
}
