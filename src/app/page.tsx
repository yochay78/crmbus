import {
  Bot,
  MessageSquareText,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CrmTableSection } from "@/components/CrmTableSection";
import { CrmReviewsList } from "@/components/CrmReviewsList";
import { CRMS, HOME_REVIEWS } from "@/lib/crms";
import { getAllPosts, CATEGORY_LABELS } from "@/lib/blog";

export default function Home() {
  const TOP_CRMS = CRMS.slice(0, 4);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.12),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.10),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.2),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="tracking-tight dark:text-white">CRMBUS</span>
          </a>

          <nav className="flex items-center gap-3">
            <a
              href="#top-crms"
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
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
            <CtaButton href="#top-crms" size="sm" className="hidden sm:inline-flex">
              View Top Picks
            </CtaButton>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-hover shadow-sm">
                <TrendingUp className="h-4 w-4 text-accent" aria-hidden="true" />
                Updated for 2026 AI CRM trends
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Scale Your Business with AI-Powered CRM Automation.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                We compare the leading AI CRM platforms to help you automate lead
                flow and grow revenue in 2026.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaButton href="#top-crms">
                  <span>View Top Picks</span>
                </CtaButton>
                <CtaButton
                  href="#why-ai-crm"
                  variant="secondary"
                  className="justify-center"
                >
                  Why AI CRM matters
                </CtaButton>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-sm font-semibold text-slate-900">
                    Faster follow-ups
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Automations keep leads warm.
                  </div>
                </div>
                <div className="rounded-2xl border border-accent-100 bg-accent-50/60 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-sm font-semibold text-slate-900">
                    Cleaner pipelines
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    AI reduces busywork.
                  </div>
                </div>
                <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-sm font-semibold text-slate-900">
                    Better conversions
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Prioritize the right leads.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-accent-100 bg-white p-6 shadow-sm dark:bg-slate-800">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-accent-50 p-3 text-accent">
                    <MessageSquareText className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      What you'll get
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      A simple, side-by-side comparison of the Big 4 AI CRM picks
                      to help you choose faster.
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Best for + key AI feature
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Starting pricing + trial period
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Direct "Visit Site" links
                  </div>
                </div>
                <div className="mt-6">
                  <CtaButton href="/compare" className="w-full justify-center">
                    View the comparison table
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="top-crms"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                The Big 4 AI CRM Picks
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                A quick comparison across the essentials: who it's best for, the
                standout AI capability, and how to try it.
              </p>
            </div>
            <CtaButton href="/compare" variant="secondary" size="sm" className="self-start sm:self-auto">
              Compare all {CRMS.length} CRMs
            </CtaButton>
          </div>

          <CrmTableSection crms={TOP_CRMS} />
        </section>

        <section
          id="reviews"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-4 sm:px-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Quick reviews (the Big 4)
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use these quick takes to shortlist, then jump into the long-form
              reviews for deeper detail and evaluation guidance.
            </p>
          </div>

          <CrmReviewsList
            entries={TOP_CRMS.flatMap((crm) => {
              const review = HOME_REVIEWS[crm.slug];
              return review ? [{ crm, review }] : [];
            })}
          />
        </section>

        <section
          id="why-ai-crm"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Why AI CRM is essential now
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Modern CRMs don't just store contacts—they help you convert them.
              Here are three high-impact AI capabilities to prioritize.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-primary-100 bg-white p-6 shadow-sm dark:bg-slate-800">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary-50 p-3 text-primary">
                  <TrendingUp className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    Lead Scoring
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Focus your team on the highest-intent leads—automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-accent-100 bg-white p-6 shadow-sm dark:bg-slate-800">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-accent-50 p-3 text-accent">
                  <Bot className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    24/7 Chatbots
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Capture and qualify leads around the clock without extra
                    headcount.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-primary-100 bg-white p-6 shadow-sm dark:bg-slate-800">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary-50 p-3 text-primary">
                  <MessageSquareText className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    Automated Follow-ups
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Personalized sequences that keep deals moving—without manual
                    reminders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-primary-100 bg-gradient-to-r from-primary-50/60 to-accent-50/60 p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white p-3 text-primary shadow-sm dark:bg-slate-800">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    Ready to choose a platform?
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Start with the table, then click "Visit Site" to evaluate
                    the best fit.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <CtaButton href="#top-crms" className="justify-center">
                  View Top Picks
                </CtaButton>
                <CtaButton href="/compare" variant="secondary" className="justify-center">
                  Compare all CRMs
                </CtaButton>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-12 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Latest from the blog
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Comparisons, feature deep-dives, and guides to help you pick the
                right AI CRM.
              </p>
            </div>
            <CtaButton href="/blog" variant="secondary" size="sm" className="self-start sm:self-auto">
              View all articles
            </CtaButton>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getAllPosts()
              .slice(0, 6)
              .map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-primary-100 bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {CATEGORY_LABELS[post.category]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-sm font-medium text-primary group-hover:text-primary-hover">
                    Read article →
                  </div>
                </a>
              ))}
          </div>
        </section>
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
