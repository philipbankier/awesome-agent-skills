import Link from "next/link";
import { getCategories, getStats, getTopStarred } from "@/lib/data";
import CategoryGrid from "@/components/CategoryGrid";
import SkillCard from "@/components/SkillCard";

export default function Home() {
  const categories = getCategories();
  const stats = getStats();
  const topStarred = getTopStarred(12);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Every AI agent skill,{" "}
            <span className="text-blue-600 dark:text-blue-400">
              one directory
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The unified, auto-updating directory of skills, MCP servers, and
            tools across Claude Code, Cursor, Codex, Gemini CLI, Copilot, and
            more.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {stats.totalSkills.toLocaleString()}
              </span>
              <span className="text-zinc-500">skills &amp; tools</span>
            </div>
            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {stats.totalCategories}
              </span>
              <span className="text-zinc-500">categories</span>
            </div>
            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {stats.totalPlatforms}
              </span>
              <span className="text-zinc-500">platforms</span>
            </div>
            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                daily
              </span>
              <span className="text-zinc-500">auto-updated</span>
            </div>
          </div>
          <Link
            href="/skills"
            className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Browse all skills
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Categories
        </h2>
        <CategoryGrid categories={categories} />
      </section>

      {/* Top starred */}
      {topStarred.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Most Starred
            </h2>
            <Link
              href="/skills"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topStarred.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
