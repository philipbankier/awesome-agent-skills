"use client";

import { useState, useMemo } from "react";
import SkillCard from "./SkillCard";
import { Skill, CATEGORY_META, PLATFORM_META } from "@/lib/types";

const PAGE_SIZE = 48;

export default function SkillBrowser({
  skills,
  initialCategory,
}: {
  skills: Skill[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory || "");
  const [platform, setPlatform] = useState("");
  const [sort, setSort] = useState<"stars" | "name">("stars");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = skills;
    if (category) result = result.filter((s) => s.category === category);
    if (platform) result = result.filter((s) => s.platforms.includes(platform));
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          (s.section && s.section.toLowerCase().includes(q))
      );
    }
    if (sort === "stars") {
      result = [...result].sort((a, b) => (b.stars || 0) - (a.stars || 0));
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [skills, query, category, platform, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of skills) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }
    return Object.entries(CATEGORY_META)
      .filter(([slug]) => (counts[slug] || 0) > 0)
      .map(([slug, meta]) => ({ slug, label: meta.label, count: counts[slug] || 0 }));
  }, [skills]);

  const availablePlatforms = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of skills) {
      for (const p of s.platforms) {
        counts[p] = (counts[p] || 0) + 1;
      }
    }
    return Object.entries(PLATFORM_META)
      .filter(([key]) => (counts[key] || 0) > 0)
      .map(([key, meta]) => ({ key, label: meta.label, count: counts[key] || 0 }));
  }, [skills]);

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          placeholder="Search skills, MCP servers, tools..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
        <div className="flex flex-wrap gap-2">
          {!initialCategory && (
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(0);
              }}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <option value="">All categories</option>
              {availableCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label} ({c.count})
                </option>
              ))}
            </select>
          )}
          <select
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
              setPage(0);
            }}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="">All platforms</option>
            {availablePlatforms.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label} ({p.count})
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "stars" | "name")}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="stars">Most stars</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        {filtered.length.toLocaleString()} results
        {query && ` for "${query}"`}
      </div>

      {/* Grid */}
      {paged.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-zinc-500">
          No skills found. Try a different search or filter.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
          >
            Previous
          </button>
          <span className="text-sm text-zinc-500">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
