import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ExternalLink,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CRMS, LONG_REVIEWS, type CrmSlug, getCrmBySlug } from "@/lib/crms";

export function generateStaticParams(): { slug: CrmSlug }[] {
  return CRMS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const crm = getCrmBySlug(slug);
  if (!crm) return { title: "Review Not Found — CRMBUS" };

  return {
    title: `${crm.name} Review (2026) — CRMBUS`,
    description: `A long-form ${crm.name} review focused on fit, automation impact, pricing/trial, and how to evaluate it quickly in 2026.`,
  };
}

export default async function ReviewPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const crm = getCrmBySlug(slug);
  if (!crm) notFound();

  const review = LONG_REVIEWS[crm.slug];
  if (!review) notFound();
  const toc = [
    { id: "quick-take", label: "Quick take" },
    ...review.sections.map((s) => ({ id: s.id, label: s.title })),
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.12),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.10),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.2),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />

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
            <a
              href="/blog"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Blog
            </a>
            <ThemeToggle />
            <CtaButton
              href={`/go/${crm.slug}`}
              size="sm"
              className="hidden sm:inline-flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Site
            </CtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <a
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              All reviews
            </a>

            <div className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-hover shadow-sm">
              <TrendingUp className="h-4 w-4 text-accent" aria-hidden="true" />
              Updated for 2026
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {review.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {review.subheadline}
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton
                href={`/go/${crm.slug}`}
                className="justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Visit {crm.name}
              </CtaButton>
              <CtaButton href="/#top-crms" variant="secondary" className="justify-center">
                Compare the Big 4
              </CtaButton>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Best for
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {crm.bestFor}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Key AI feature
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {crm.aiFeature}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pricing start
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {crm.pricingStart}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Trial
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {crm.trialPeriod}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-24">
                <div className="text-sm font-semibold text-slate-900">
                  On this page
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-700 hover:text-slate-900"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50/60 p-5 dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-sm font-semibold text-slate-900">
                    Fast evaluation tip
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Don't migrate everything. Build one pipeline and one follow-up
                    sequence during the trial, then measure meeting rate per 100
                    leads.
                  </p>
                  <div className="mt-4">
                    <CtaButton
                      href={`/go/${crm.slug}`}
                      size="sm"
                      className="w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start trial / learn more
                    </CtaButton>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <section
                id="quick-take"
                className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8"
              >
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Quick take
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{review.tlDr}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
                    <div className="text-sm font-semibold text-slate-900">Pros</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Strong fit for {crm.bestFor.toLowerCase()} workflows</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Clear automation angle: {crm.aiFeature}</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Trial available: {crm.trialPeriod}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
                    <div className="text-sm font-semibold text-slate-900">Watch-outs</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <span>Expect some setup time to unlock ROI</span>
                      </li>
                      <li className="flex gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <span>Validate feature depth for your exact workflow</span>
                      </li>
                      <li className="flex gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <span>Pricing may scale with usage and team size</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {review.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mt-6 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8"
                >
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                    {section.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-5 space-y-2 text-sm text-slate-700">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section
                id="faq"
                className="mt-6 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8"
              >
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  FAQ
                </h2>
                <div className="mt-4 divide-y divide-slate-200">
                  {review.faqs.map((f) => (
                    <details key={f.q} className="py-4">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                        {f.q}
                      </summary>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:p-8">
                CRMBUS.com is a professional review site that may receive compensation
                from the companies whose products we review.
              </section>
            </div>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-base font-semibold text-slate-900">
                  Compare alternatives quickly
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Jump to another review, or go back to the Big 4 comparison table.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaButton href="/#top-crms" variant="secondary" className="justify-center">
                  Back to comparison
                </CtaButton>
                <CtaButton href="/reviews" className="justify-center">
                  All reviews
                </CtaButton>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CRMS.filter((c) => c.slug !== crm.slug).map((alt) => (
                <a
                  key={alt.slug}
                  href={`/reviews/${alt.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50 text-sm transition-all duration-200 ease-out hover:bg-white"
                >
                  <div className="font-semibold text-slate-900">{alt.name}</div>
                  <div className="mt-1 text-slate-600">Best for {alt.bestFor}</div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
