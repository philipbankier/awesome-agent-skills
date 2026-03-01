import { getByCategory, getCategories } from "@/lib/data";
import { CATEGORY_META } from "@/lib/types";
import SkillBrowser from "@/components/SkillBrowser";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const meta = CATEGORY_META[params.slug];
  if (!meta) return {};
  return {
    title: `${meta.label} — Awesome Agent Skills`,
    description: meta.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const meta = CATEGORY_META[params.slug];
  if (!meta) notFound();

  const skills = getByCategory(params.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-3xl">{meta.icon}</span>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {meta.label}
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
          {meta.description} &mdash; {skills.length.toLocaleString()} entries
        </p>
      </div>
      <SkillBrowser skills={skills} initialCategory={params.slug} />
    </div>
  );
}
