import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, Sparkles, TrendingUp } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  BLOG_POSTS,
  CATEGORY_LABELS,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found — CRMBUS" };

  return {
    title: `${post.title} — CRMBUS`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

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
            <CtaButton href="/#top-crms" size="sm" className="hidden sm:inline-flex">
              View Top Picks
            </CtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </a>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-medium text-primary shadow-sm">
                {CATEGORY_LABELS[post.category]}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-hover shadow-sm">
                <TrendingUp className="h-4 w-4 text-accent" aria-hidden="true" />
                Updated for 2026
              </span>
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {post.excerpt}
            </p>
            <div className="text-sm text-slate-500">{formatDate(post.date)}</div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-10">
                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Mid-article CTA */}
              <div className="mt-6 rounded-3xl border border-primary-100 bg-gradient-to-r from-primary-50/60 to-accent-50/60 p-6 dark:border-primary-100/30 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white p-3 text-primary shadow-sm dark:bg-slate-800">
                      <Sparkles className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-slate-900">
                        Ready to compare platforms?
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        See our Big 4 comparison table and start a free trial
                        today.
                      </p>
                    </div>
                  </div>
                  <CtaButton href="/#top-crms" className="justify-center">
                    View Top Picks
                  </CtaButton>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-24">
                <div className="text-sm font-semibold text-slate-900">
                  Explore CRMs
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use our comparison table to find the best AI CRM for your
                  workflow.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <CtaButton href="/#top-crms" size="sm" className="w-full justify-center">
                    Compare Top CRMs
                  </CtaButton>
                  <CtaButton
                    href="/reviews"
                    size="sm"
                    variant="secondary"
                    className="w-full justify-center"
                  >
                    Read Reviews
                  </CtaButton>
                </div>

                {post.tags.length > 0 && (
                  <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Topics
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                More articles
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-primary-100 bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {CATEGORY_LABELS[r.category]}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-primary">
                      {r.title}
                    </h3>
                    <div className="mt-3 text-sm font-medium text-primary group-hover:text-primary-hover">
                      Read article →
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            CRMBUS.com is a professional review site that may receive
            compensation from the companies whose products we review.
          </div>
        </div>
      </main>
    </div>
  );
}
