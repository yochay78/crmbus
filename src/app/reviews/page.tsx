import { Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { JsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CRMS } from "@/lib/crms";

export const metadata = {
  title: "CRM Reviews (2026) — CRMBUS",
  description:
    "Long-form reviews of leading AI CRM platforms to help you choose the best fit for your workflow in 2026.",
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best AI CRM Software Reviews (2026)",
  description: "Long-form reviews of leading AI CRM platforms.",
  numberOfItems: CRMS.length,
  itemListElement: CRMS.map((crm, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crm.name,
    url: `https://www.crmbus.com/reviews/${crm.slug}`,
  })),
};

export default function ReviewsIndexPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <JsonLd data={itemListJsonLd} />
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
              href="/compare"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Compare
            </a>
            <a
              href="/industries"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Industries
            </a>
            <a
              href="/blog"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Blog
            </a>
            <a
              href="/qa"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
            CRM Reviews (2026)
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Long-form reviews focused on fit, automation impact, and how to
            evaluate each platform quickly.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CRMS.map((crm) => (
            <div
              key={crm.slug}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="text-base font-semibold text-slate-900">
                {crm.name}
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Best for {crm.bestFor}
              </div>
              <a
                href={`/reviews/${crm.slug}`}
                className="mt-4 inline-flex text-sm font-medium text-primary group-hover:text-primary-hover"
              >
                Read full review →
              </a>
              <div className="mt-6 flex flex-col gap-2">
                <CtaButton
                  href={`/go/${crm.slug}`}
                  size="sm"
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site
                </CtaButton>
                <CtaButton
                  href={`/reviews/${crm.slug}`}
                  size="sm"
                  variant="secondary"
                  className="w-full"
                >
                  Read review
                </CtaButton>
              </div>
            </div>
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
