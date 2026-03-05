import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ExternalLink,
  Headphones,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/industries";
import { CRMS, type Crm } from "@/lib/crms";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found — CRMBUS" };

  return {
    title: `Best AI CRM for ${industry.title} (2026) — CRMBUS`,
    description: industry.description,
  };
}

function getRelevantCrms(industry: (typeof INDUSTRIES)[number]): Crm[] {
  return industry.relevantCrmSlugs
    .map((slug) => CRMS.find((c) => c.slug === slug))
    .filter((c): c is Crm => c !== undefined);
}

export default async function IndustryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relevantCrms = getRelevantCrms(industry);

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
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:inline"
            >
              Reviews
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
            <ThemeToggle />
            <CtaButton href="/#top-crms" size="sm" className="hidden sm:inline-flex">
              View Top Picks
            </CtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex flex-col gap-3">
            <a
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              All industries
            </a>

            <div className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-hover shadow-sm">
              <TrendingUp className="h-4 w-4 text-accent" aria-hidden="true" />
              Updated for 2026
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Best AI CRM for {industry.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {industry.description}
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton href="#top-tools" className="justify-center">
                View Recommended CRMs
              </CtaButton>
              <CtaButton href="#deep-dive" variant="secondary" className="justify-center">
                Read Industry Guide
              </CtaButton>
            </div>
          </div>

          {/* Video + Audio: only rendered when content exists */}
          {(industry.youtubeId || industry.podcastUrl) && (
            <div className={`grid gap-4 ${industry.youtubeId && industry.podcastUrl ? "sm:grid-cols-2" : ""}`}>
              {industry.youtubeId && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${industry.youtubeId}`}
                      title={`${industry.title} CRM deep dive`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Video: CRM for {industry.title}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      Watch our deep dive into what makes a CRM work for {industry.title.toLowerCase()} teams.
                    </p>
                  </div>
                </div>
              )}

              {industry.podcastUrl && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-accent-50 p-3 text-accent">
                      <Headphones className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900">
                        Podcast: {industry.title} CRM Guide
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        Listen to our audio breakdown of CRM strategies for {industry.title.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                  <audio
                    controls
                    className="mt-4 w-full"
                    preload="metadata"
                  >
                    <source src={industry.podcastUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          )}

          {/* SEO Content */}
          <section id="deep-dive" className="scroll-mt-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-10">
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: industry.seoContent }}
              />
            </div>
          </section>

          {/* CRM Silo: Top Tools for this Industry */}
          <section id="top-tools" className="scroll-mt-24">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Top CRM Tools for {industry.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  These platforms are particularly well-suited for {industry.title.toLowerCase()} teams based on features, pricing, and industry fit.
                </p>
              </div>
              <CtaButton href="/reviews" variant="secondary" size="sm" className="self-start sm:self-auto">
                All reviews
              </CtaButton>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relevantCrms.map((crm) => (
                <div
                  key={crm.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="text-base font-semibold text-slate-900">
                    {crm.name}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Best for {crm.bestFor}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        AI Feature
                      </div>
                      <div className="mt-1 text-xs font-medium text-slate-900">
                        {crm.aiFeature}
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        From
                      </div>
                      <div className="mt-1 text-xs font-medium text-slate-900">
                        {crm.pricingStart}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <CtaButton
                      href={`/go/${crm.slug}`}
                      size="sm"
                      className="w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Visit {crm.name}
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
          </section>

          {/* Browse other industries */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-base font-semibold text-slate-900">
                  Explore other industries
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  See CRM recommendations tailored to other sectors.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaButton href="/#top-crms" variant="secondary" className="justify-center">
                  Compare all CRMs
                </CtaButton>
                <CtaButton href="/industries" className="justify-center">
                  All industries
                </CtaButton>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {INDUSTRIES.filter((i) => i.slug !== industry.slug)
                .slice(0, 8)
                .map((i) => (
                  <a
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary-100 hover:bg-primary-50 hover:text-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
                  >
                    {i.title}
                  </a>
                ))}
            </div>
          </section>

          {/* Disclaimer */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            CRMBUS.com is a professional review site that may receive compensation
            from the companies whose products we review.
          </div>
        </div>
      </main>
    </div>
  );
}
