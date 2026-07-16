import { create } from "zustand";

/**
 * @type {Object}
 * @property {string} LIGHT - Default light theme
 * @property {string} DARK - Default dark theme
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

// Helper function to sync the HTML data-theme attribute and localStorage

/**
 *
 * @param {string} theme - Must be a value from the THEMES object
 */
const updateDOMAndStorage = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("color-scheme", theme);
  document.documentElement.classList.remove(THEMES.DARK, THEMES.LIGHT);
  theme === THEMES.DARK && document.documentElement.classList.add(theme);

  localStorage.setItem("theme", theme);
};

// --- Initial State Hydration ---
// Evaluates instantly on file load—eliminating the need for a React useEffect

/**
 * @returns {string} - Initial theme value
 */
const getInitialTheme = () => {
  // Safe check for Server-Side Rendering (SSR) environments
  if (typeof window === "undefined") return THEMES.LIGHT;

  const savedTheme = localStorage.getItem("theme") || THEMES.LIGHT;
  // Validate that the saved theme is one of our supported themes, default to light
  const initialTheme = Object.values(THEMES).includes(savedTheme)
    ? savedTheme
    : THEMES.LIGHT;

  // Apply to DOM immediately so there is no theme "flash" during load
  updateDOMAndStorage(initialTheme);

  return initialTheme;
};

// --- Store Definition ---
// Internal hook used inside React components
const useThemeStore = create(() => ({
  theme: getInitialTheme(),
}));

/**
 * Directly sets a specific theme. Can be called anywhere.
 * @param {string} newTheme - Must be a value from the THEMES object
 */
export const setTheme = (newTheme) => {
  if (!Object.values(THEMES).includes(newTheme)) return;

  // 1. Update the Zustand store state
  useThemeStore.setState({ theme: newTheme });
  // 2. Synchronize DOM and localStorage
  updateDOMAndStorage(newTheme);
};

/**
 * Toggles the theme based on an event (e.g., checkbox/switch change)
 * @param {Event} e - React change event or vanilla JS event
 */
export const toggleTheme = () => {
  const isDark = useThemeStore.getState().theme === THEMES.DARK;
  const targetTheme = !isDark ? THEMES.DARK : THEMES.LIGHT;
  setTheme(targetTheme);
};

export default useThemeStore;
