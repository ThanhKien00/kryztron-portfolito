export const THEME_STORAGE_KEY = "theme";

/**
 * Synchronous, non-deferred script placed in <head>. It runs while the browser
 * parses the HTML — before the first paint — so no wrong-theme flash is ever
 * visible, not even on a slow connection where paint beats hydration.
 *
 * The stored choice wins; with no stored choice we fall back to the OS
 * `prefers-color-scheme`. Because this script resolves the OS preference once,
 * globals.css must NOT also carry a `@media (prefers-color-scheme: dark)` block
 * — a second mechanism would override an explicit user choice.
 */
const themeScript = `(function(){try{var k="${THEME_STORAGE_KEY}",s=localStorage.getItem(k),t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t}catch(e){}})()`;

/**
 * Watchdog for the reveal animations. Motion server-renders `initial` as inline
 * `opacity:0`; if its bundle never executes (chunk failed, script blocked), the
 * page would stay permanently blank. MotionProvider sets `data-motion-ready` on
 * mount — if that has not happened a few seconds in, force everything visible.
 */
const revealWatchdogScript = `(function(){try{setTimeout(function(){if(!document.documentElement.dataset.motionReady){document.documentElement.classList.add("reveal-fallback")}},4000)}catch(e){}})()`;

export function ThemeScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <script dangerouslySetInnerHTML={{ __html: revealWatchdogScript }} />
      <noscript>
        {/* A stylesheet `!important` beats motion's inline `opacity:0`. */}
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
    </>
  );
}
