import { Building2, Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { INDUSTRIES } from "@/lib/industries";

export const metadata = {
  title: "CRM by Industry (2026) — CRMBUS",
  description:
    "Find the best AI CRM for your industry. We break down CRM recommendations for 20 sectors including real estate, SaaS, legal, healthcare, and more.",
};

export default function IndustriesIndexPage() {
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
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline"
            >
              Compare
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
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            CRM by Industry
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Every industry has unique CRM needs. Find the platforms, features,
            and strategies that fit your sector in 2026.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <a
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="inline-flex rounded-xl bg-primary-50 p-2.5 text-primary">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mt-3 text-base font-semibold text-slate-900">
                {industry.title}
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {industry.description}
              </p>
              <div className="mt-4 text-sm font-medium text-primary group-hover:text-primary-hover">
                View CRM guide →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-primary-100 bg-gradient-to-r from-primary-50/60 to-accent-50/60 p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-800 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white p-3 text-primary shadow-sm dark:bg-slate-800">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base font-semibold text-slate-900">
                  Not sure which CRM is right?
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Compare the top AI CRM platforms side by side in our comparison table.
                </p>
              </div>
            </div>
            <CtaButton href="/#top-crms" className="justify-center">
              View Top Picks
            </CtaButton>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          CRMBUS.com is a professional review site that may receive compensation
          from the companies whose products we review.
        </div>
      </main>
    </div>
  );
}
