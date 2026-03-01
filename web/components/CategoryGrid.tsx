import Link from "next/link";
import { CategoryInfo } from "@/lib/types";

export default function CategoryGrid({
  categories,
}: {
  categories: CategoryInfo[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="group rounded-lg border border-zinc-200 p-5 transition-all hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">{cat.icon}</span>
            <h3 className="font-medium text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
              {cat.label}
            </h3>
          </div>
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
            {cat.description}
          </p>
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {cat.count.toLocaleString()} entries
          </div>
        </Link>
      ))}
    </div>
  );
}
