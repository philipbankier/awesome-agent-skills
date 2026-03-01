export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row">
        <div>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Awesome Agent Skills
          </span>{" "}
          &mdash; The unified directory for AI agent skills, MCP servers, and
          tools.
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/philipbankier/awesome-agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            GitHub
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">&middot;</span>
          <span>
            Data synced daily from{" "}
            <a
              href="https://github.com/philipbankier/awesome-agent-skills/blob/main/SYNC.md"
              className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              10+ sources
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
