import { Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getAllPosts, CATEGORY_LABELS, type BlogCategory } from "@/lib/blog";

export const metadata = {
  title: "Blog — CRMBUS",
  description:
    "AI CRM comparisons, feature deep-dives, and practical guides to help you pick the right platform in 2026.",
};

const CATEGORIES: { key: BlogCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "comparison", label: "Comparisons" },
  { key: "feature-check", label: "Feature Checks" },
  { key: "best-of", label: "Best Of" },
  { key: "guide", label: "Guides" },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-transparent">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.12),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.10),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.2),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="tracking-tight dark:text-white">CRMBUS</span>
          </a>

          <nav className="flex items-center gap-3">
            <a
              href="/#top-crms"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Top CRMs
            </a>
            <a
              href="/reviews"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Reviews
            </a>
            <ThemeToggle />
            <CtaButton href="/#top-crms" size="sm" className="hidden sm:inline-flex">
              View Top Picks
            </CtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Comparisons, feature deep-dives, and practical guides to help you
            choose the right AI CRM.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.key}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                cat.key === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-primary-100 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {cat.label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-primary-100 bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {CATEGORY_LABELS[post.category]}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDate(post.date)}
                </span>
              </div>
              <h2 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                {post.excerpt}
              </p>
              <div className="mt-4 text-sm font-medium text-primary group-hover:text-primary-hover">
                Read article →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          CRMBUS.com is a professional review site that may receive compensation
          from the companies whose products we review.
        </div>
      </main>
    </div>
  );
}
