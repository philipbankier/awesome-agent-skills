import { getAllSkills } from "@/lib/data";
import SkillBrowser from "@/components/SkillBrowser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Skills — Awesome Agent Skills",
  description:
    "Search and filter thousands of AI agent skills, MCP servers, and tools across all platforms.",
};

export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Browse Skills
      </h1>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400">
        {skills.length.toLocaleString()} skills, MCP servers, and tools across
        all platforms.
      </p>
      <SkillBrowser skills={skills} />
    </div>
  );
}
