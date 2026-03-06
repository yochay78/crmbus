import { Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CompareCrmTable } from "@/components/CompareCrmTable";
import { CRMS, FEATURED_TOP_SLUGS } from "@/lib/crms";

export const metadata = {
  title: "Compare CRMs (2026) — CRMBUS",
  description:
    "Side-by-side comparison of all AI CRM platforms with key details like best for, AI features, pricing, and trials.",
};

export default function ComparePage() {
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
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline"
            >
              Reviews
            </a>
            <a
              href="/compare"
              className="text-sm font-medium text-primary dark:text-primary-300"
            >
              Compare
            </a>
            <a
              href="/industries"
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline"
            >
              Industries
            </a>
            <a
              href="/blog"
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline"
            >
              Blog
            </a>
            <a
              href="/qa"
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline"
            >
              Q&A
            </a>
            <ThemeToggle />
            <CtaButton href="/#top-crms" size="sm" className="hidden sm:inline-flex">
              View Top Picks
            </CtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Compare CRMs
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              All {CRMS.length} platforms in one table with best-for, AI feature, pricing, and trial details side by side.
            </p>
          </div>
        </div>

        <CompareCrmTable
          crms={CRMS}
          featuredSlugs={FEATURED_TOP_SLUGS}
        />
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-slate-600 dark:text-slate-400 sm:px-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/reviews" className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Reviews</a>
            <a href="/compare" className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Compare</a>
            <a href="/industries" className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Industries</a>
            <a href="/blog" className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Blog</a>
            <a href="/qa" className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Q&A</a>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl">
              CRMBUS.com is a professional review site that may receive
              compensation from the companies whose products we review.
            </p>
            <p className="text-slate-500">© {new Date().getFullYear()} CRMBUS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
