import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">&#x1F4E6;</span>
          <span className="text-zinc-900 dark:text-zinc-100">
            Awesome Agent Skills
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/skills"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Browse
          </Link>
          <a
            href="https://github.com/philipbankier/awesome-agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            GitHub
          </a>
          <a
            href="https://github.com/philipbankier/awesome-agent-skills/issues/new?template=submit-skill.md"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Submit a Skill
          </a>
        </nav>
      </div>
    </header>
  );
}
