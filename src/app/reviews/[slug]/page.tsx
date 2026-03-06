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
import { JsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RedCirclePlayer } from "@/components/RedCirclePlayer";
import { CRMS, LONG_REVIEWS, type CrmSlug, getCrmBySlug } from "@/lib/crms";
import { getMedia, extractYouTubeId, parseRedcircleIds } from "@/lib/media";

const MAX_FAQS = 20;

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

  const media = getMedia("review", crm.slug);
  const youtubeId = media?.youtubeUrl
    ? extractYouTubeId(media.youtubeUrl)
    : null;
  const podcastIds = media?.podcastUrl
    ? parseRedcircleIds(media.podcastUrl)
    : null;

  const faqBase = review.faqs ?? [];
  const extraFaqs = [
    {
      q: `Who is ${crm.name} really best for?`,
      a: `Best fit is typically ${crm.bestFor.toLowerCase()} — teams that match that profile will get the fastest ROI from ${crm.name}.`,
    },
    {
      q: `How long does it take to evaluate ${crm.name}?`,
      a: `Most teams can get a realistic feel for ${crm.name} in one focused trial period (${crm.trialPeriod}), as long as they run a real pipeline through it instead of a fake demo.`,
    },
    {
      q: `What should I set up first in ${crm.name}?`,
      a: `Start with one clean pipeline that matches your actual sales stages, then connect a real lead source and work those deals end-to-end.`,
    },
    {
      q: `Does ${crm.name} work for very small teams?`,
      a: `Yes — as long as your team is willing to keep the pipeline updated. Even a team of 1–3 people can benefit from structured deals and tasks.`,
    },
    {
      q: `Does ${crm.name} scale to larger teams?`,
      a: `It scales reasonably well for its target use case. Once you reach dozens of reps and multiple regions, you may want to compare it with more enterprise-focused options.`,
    },
    {
      q: `How opinionated is ${crm.name}'s workflow?`,
      a: `${crm.name} provides a suggested way of working but still lets you customize stages, fields, and automations to fit your process.`,
    },
    {
      q: `What AI or automation feature stands out in ${crm.name}?`,
      a: `The signature capability is ${crm.aiFeature}. That is usually the feature that moves the needle most if you lean into it during the trial.`,
    },
    {
      q: `Can I start without importing my entire database?`,
      a: `Yes — and you probably should. Import a focused slice of active deals and contacts so you can evaluate ${crm.name} without a messy migration.`,
    },
    {
      q: `How does pricing for ${crm.name} compare to similar tools?`,
      a: `${crm.name} starts around ${crm.pricingStart}. When comparing cost, factor in which features it can replace (email tools, calling, automation, reporting).`,
    },
    {
      q: `Is ${crm.name} easy for reps to adopt?`,
      a: `Most reps can get comfortable with the basics in a week or less, especially if you keep the first pipeline configuration simple and focused.`,
    },
    {
      q: `What are common reasons ${crm.name} is a bad fit?`,
      a: `It can be a poor fit if your processes are either extremely simple (spreadsheets might suffice) or extremely complex and heavily customized.`,
    },
    {
      q: `How good is reporting and analytics in ${crm.name}?`,
      a: `Reporting is strong enough for most ${crm.bestFor.toLowerCase()} teams, covering pipeline, win rates, and activity. Very advanced BI still benefits from exporting into external tools.`,
    },
    {
      q: `Does ${crm.name} integrate well with other tools?`,
      a: `${crm.name} integrates with common email, calendar, and marketing systems. For niche tools, you may rely on Zapier or native marketplace apps.`,
    },
    {
      q: `What support can I expect from ${crm.name}?`,
      a: `Support quality is generally solid for onboarding questions and troubleshooting. For complex architecture or heavy customization, you may need partner or consultant help.`,
    },
    {
      q: `Can I customize fields and pipelines in ${crm.name}?`,
      a: `Yes — you can customize deal stages, fields, and in most cases automations so the CRM mirrors your real-world process rather than forcing you into a generic template.`,
    },
    {
      q: `How should I train my team on ${crm.name}?`,
      a: `Run one short kickoff to explain your pipeline stages, required fields, and daily habits (log notes, move stages, complete tasks). Then reinforce with weekly pipeline reviews.`,
    },
    {
      q: `What data should I track in ${crm.name} that I might be missing now?`,
      a: `At minimum: source, stage, owner, next step, and close reason. Those fields alone make your reporting and future optimization much more powerful.`,
    },
    {
      q: `How does ${crm.name} handle multiple pipelines or products?`,
      a: `Most teams can model multiple pipelines or product lines with separate boards or stages. If your structure is very complex, test that carefully during the trial.`,
    },
    {
      q: `What is the biggest mistake teams make when evaluating ${crm.name}?`,
      a: `Trying to rebuild their entire tech stack on day one. A focused trial with one pipeline and one clear success metric tells you much more.`,
    },
    {
      q: `How do I know if ${crm.name} is working for us after 90 days?`,
      a: `Look at lead response times, stage conversion rates, and close rates. If those improve while admin time stays steady or drops, ${crm.name} is doing its job.`,
    },
  ];

  const faqsToRender =
    faqBase.length >= MAX_FAQS
      ? faqBase.slice(0, MAX_FAQS)
      : [...faqBase, ...extraFaqs].slice(0, MAX_FAQS);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: crm.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: crm.pricingStart.replace(/[^0-9.]/g, "").split(".")[0] || "0",
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
    },
    review: {
      "@type": "Review",
      author: { "@type": "Organization", name: "CRMBUS" },
      reviewBody: review.tlDr,
      publisher: { "@type": "Organization", name: "CRMBUS" },
    },
  };

  const faqJsonLd = review.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: review.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.crmbus.com" },
      { "@type": "ListItem", position: 2, name: "Reviews", item: "https://www.crmbus.com/reviews" },
      { "@type": "ListItem", position: 3, name: `${crm.name} Review` },
    ],
  };

  return (
    <div className="min-h-screen bg-transparent">
      <JsonLd data={softwareJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
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

          {media?.image && (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <img
                src={media.image}
                alt={`${crm.name} hero`}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

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

              {youtubeId && (
                <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`${crm.name} review video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </section>
              )}

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

              {podcastIds && (
                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">
                    Listen to the Podcast
                  </h2>
                  <RedCirclePlayer
                    showId={podcastIds.showId}
                    episodeId={podcastIds.episodeId}
                  />
                </section>
              )}

              <section
                id="faq"
                className="mt-6 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8"
              >
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  FAQ
                </h2>
                <div className="mt-4 divide-y divide-slate-200">
                  {faqsToRender.map((f) => (
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
