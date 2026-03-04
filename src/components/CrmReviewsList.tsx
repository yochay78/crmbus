"use client";

import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import type { Crm, HomeReview } from "@/lib/crms";

const INITIAL_COUNT = 5;

type ReviewEntry = {
  crm: Crm;
  review: HomeReview;
};

export function CrmReviewsList({ entries }: { entries: ReviewEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? entries : entries.slice(0, INITIAL_COUNT);
  const hasMore = entries.length > INITIAL_COUNT;

  return (
    <>
      <div className="mt-8 space-y-6">
        {visible.map(({ crm, review }) => {
          const evaluationPoints = [
            { label: "Best for", value: crm.bestFor },
            { label: "Key AI feature", value: crm.aiFeature },
            { label: "Pricing start", value: crm.pricingStart },
            { label: "Trial period", value: crm.trialPeriod },
          ];
          return (
            <article
              key={crm.name}
              id={`home-review-${crm.slug}`}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                        {crm.name} Review
                      </h3>
                      <span className="rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-hover">
                        Best for {crm.bestFor}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {review.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <CtaButton
                      href={`/go/${crm.slug}`}
                      className="justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Site
                    </CtaButton>
                    <CtaButton
                      href={`/reviews/${crm.slug}`}
                      variant="secondary"
                      className="justify-center"
                    >
                      Read full review
                    </CtaButton>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50">
                      <div className="border-b border-slate-200 px-5 py-4">
                        <div className="text-sm font-semibold text-slate-900">
                          Overview
                        </div>
                      </div>
                      <div className="space-y-3 px-5 py-4 text-sm leading-7 text-slate-700">
                        {review.overview.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
                        <div className="text-sm font-semibold text-slate-900">
                          Pros
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                          {review.pros.map((item) => (
                            <li key={item} className="flex gap-2">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
                        <div className="text-sm font-semibold text-slate-900">
                          Cons
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                          {review.cons.map((item) => (
                            <li key={item} className="flex gap-2">
                              <X
                                className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
                      <div className="text-sm font-semibold text-slate-900">
                        Quick evaluation
                      </div>
                      <div className="mt-4 space-y-3">
                        {evaluationPoints.map((p) => (
                          <div
                            key={p.label}
                            className="flex items-start justify-between gap-6"
                          >
                            <div className="text-sm font-medium text-slate-600">
                              {p.label}
                            </div>
                            <div className="text-sm font-semibold text-slate-900">
                              {p.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-5 dark:bg-slate-800">
                        <div className="text-sm font-semibold text-slate-900">
                          How to test quickly
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Use the trial to set up one pipeline, one capture
                          source, and one follow-up sequence—then measure lead
                          response time and booked meetings.
                        </p>
                        <div className="mt-4">
                          <CtaButton
                            href={`/reviews/${crm.slug}`}
                            size="sm"
                            className="w-full justify-center"
                          >
                            Read {crm.name} review
                          </CtaButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && !expanded && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-primary-100 hover:bg-primary-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            Show all {entries.length} reviews
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
