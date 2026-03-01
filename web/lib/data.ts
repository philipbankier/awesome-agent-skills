import fs from "fs";
import path from "path";
import { Skill, CategoryInfo, CATEGORY_META } from "./types";

const DATA_DIR = path.join(process.cwd(), "..", "data");

function readJsonFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function isActualSkill(entry: Skill): boolean {
  if (!entry.name || !entry.url) return false;
  // Filter out tutorials, videos, reddit links, community resources
  const skipDomains = [
    "youtu.be",
    "youtube.com",
    "reddit.com",
    "dev.to",
    "medium.com",
    "twitter.com",
    "x.com",
    "discord.",
  ];
  const urlLower = entry.url.toLowerCase();
  if (skipDomains.some((d) => urlLower.includes(d))) return false;
  // Filter entries with IDs that look like bare domains (non-GitHub)
  if (entry.id && !entry.id.includes("/") && entry.id.includes(".")) return false;
  return true;
}

function normalizeEntry(entry: Record<string, unknown>): Skill {
  return {
    id: (entry.id as string) || "",
    name: (entry.name as string) || "",
    description: (entry.description as string) || "",
    url: (entry.url as string) || (entry.repoUrl as string) || "",
    category: (entry.category as string) || "mcp-server",
    platforms: (entry.platforms as string[]) || [],
    source: (entry.source as string) || "unknown",
    section: entry.section as string | undefined,
    githubOwner: (entry.githubOwner as string) || null,
    githubRepo: (entry.githubRepo as string) || null,
    stars: typeof entry.stars === "number" ? entry.stars : null,
    lastUpdated: (entry.lastUpdated as string) || "",
    repoUrl: entry.repoUrl as string | undefined,
    version: entry.version as string | null | undefined,
  };
}

let cachedSkills: Skill[] | null = null;

export function getAllSkills(): Skill[] {
  if (cachedSkills) return cachedSkills;

  const awesomeLists = readJsonFile<Record<string, unknown>[]>(
    "awesome-lists.json"
  );
  const mcpRegistry = readJsonFile<Record<string, unknown>[]>(
    "mcp-registry.json"
  );

  const seen = new Set<string>();
  const merged: Skill[] = [];

  // Awesome lists first (higher quality, curated)
  for (const raw of awesomeLists) {
    const entry = normalizeEntry(raw);
    if (!isActualSkill(entry)) continue;
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    merged.push(entry);
  }

  // MCP registry entries
  for (const raw of mcpRegistry) {
    const entry = normalizeEntry(raw);
    if (!isActualSkill(entry)) continue;
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    merged.push(entry);
  }

  cachedSkills = merged;
  return merged;
}

export function getByCategory(category: string): Skill[] {
  return getAllSkills().filter((s) => s.category === category);
}

export function getCategories(): CategoryInfo[] {
  const skills = getAllSkills();
  const counts: Record<string, number> = {};
  for (const s of skills) {
    counts[s.category] = (counts[s.category] || 0) + 1;
  }

  return Object.entries(CATEGORY_META)
    .filter(([slug]) => (counts[slug] || 0) > 0)
    .map(([slug, meta]) => ({
      slug,
      label: meta.label,
      description: meta.description,
      icon: meta.icon,
      count: counts[slug] || 0,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getStats() {
  const skills = getAllSkills();
  const categories = getCategories();
  const platforms = new Set<string>();
  let withStars = 0;
  let totalStars = 0;
  for (const s of skills) {
    for (const p of s.platforms) platforms.add(p);
    if (s.stars && s.stars > 0) {
      withStars++;
      totalStars += s.stars;
    }
  }

  return {
    totalSkills: skills.length,
    totalCategories: categories.length,
    totalPlatforms: platforms.size,
    withStars,
    totalStars,
  };
}

export function getTopStarred(limit = 20): Skill[] {
  return getAllSkills()
    .filter((s) => s.stars && s.stars > 0)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0))
    .slice(0, limit);
}

export function searchSkills(query: string, category?: string): Skill[] {
  const q = query.toLowerCase();
  let results = getAllSkills();
  if (category) results = results.filter((s) => s.category === category);
  if (!q) return results;
  return results.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      (s.section && s.section.toLowerCase().includes(q))
  );
}
