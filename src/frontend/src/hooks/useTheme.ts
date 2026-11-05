import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Theme = "light" | "dark";

const THEME_KEY = "theme";

/**
 * Light/dark control for the design system's semantic tokens.
 * Dark-first (hackathon demo default): <html> ships with class="dark" and
 * this hook keeps the class in sync with the persisted preference.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
  };
}
