import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <a
      href="https://github.com/qureshiather/Solstice"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on GitHub"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Code2 className="h-5 w-5" />
    </a>
  );
}
