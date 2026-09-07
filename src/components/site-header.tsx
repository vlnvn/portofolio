import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <a className="wordmark" href="#top" aria-label="Valensius Alven, home">
        VA
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
      </nav>
      <ThemeToggle />
    </header>
  );
}
