import { Skill, PLATFORM_META } from "@/lib/types";

function StarCount({ count }: { count: number }) {
  if (count >= 1000) {
    return <span>{(count / 1000).toFixed(1)}k</span>;
  }
  return <span>{count}</span>;
}

export default function SkillCard({ skill }: { skill: Skill }) {
  const displayName =
    skill.githubOwner && skill.githubRepo
      ? `${skill.githubOwner}/${skill.githubRepo}`
      : skill.name;

  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-zinc-200 p-4 transition-all hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
          {displayName}
        </h3>
        {skill.stars != null && skill.stars > 0 && (
          <span className="flex shrink-0 items-center gap-1 text-xs text-zinc-500">
            <svg
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <StarCount count={skill.stars} />
          </span>
        )}
      </div>
      {skill.description && (
        <p className="mb-3 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {skill.description}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {skill.platforms.slice(0, 4).map((p) => {
          const meta = PLATFORM_META[p];
          if (!meta) return null;
          return (
            <span
              key={p}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${meta.color}`}
            >
              {meta.label}
            </span>
          );
        })}
        {skill.platforms.length > 4 && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            +{skill.platforms.length - 4}
          </span>
        )}
      </div>
    </a>
  );
}
