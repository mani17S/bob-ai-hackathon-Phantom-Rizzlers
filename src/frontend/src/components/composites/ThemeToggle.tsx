import { Button, MoonIcon, SunIcon } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

/**
 * Light/dark control for the dashboard. Persists the choice to localStorage
 * and toggles the `dark` class on <html>, which the design system's semantic
 * tokens respond to.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      className={className}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </Button>
  );
}
