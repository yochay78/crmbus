"use client";

import { useMemo, useState } from "react";
import { Users, Zap, BadgeDollarSign, Clock3 } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import type { Crm, CrmSlug } from "@/lib/crms";

export function CompareCrmTable({
  crms,
  featuredSlugs,
}: {
  crms: readonly Crm[];
  featuredSlugs: readonly CrmSlug[];
}) {
  const [showAll, setShowAll] = useState(false);

  const featuredSet = useMemo(
    () => new Set(featuredSlugs),
    [featuredSlugs]
  );

  const { pinned, rest } = useMemo(() => {
    const pinnedList: Crm[] = [];
    const restList: Crm[] = [];
    for (const slug of featuredSlugs) {
      const c = crms.find((x) => x.slug === slug);
      if (c) pinnedList.push(c);
    }
    for (const c of crms) {
      if (!featuredSet.has(c.slug)) restList.push(c);
    }
    // Keep partners at the top in the order provided, then list the rest alphabetically by name.
    restList.sort((a, b) => a.name.localeCompare(b.name));
    return { pinned: pinnedList, rest: restList };
  }, [crms, featuredSlugs, featuredSet]);

  const sortedCrms = [...pinned, ...rest];
  const visibleCrms = showAll ? sortedCrms : sortedCrms.slice(0, 4);

  return (
    <>
      <div className="mt-8 hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md ring-1 ring-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:ring-slate-700 lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-table-header">
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  CRM
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  Best For
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Key AI Feature
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  <BadgeDollarSign className="h-3.5 w-3.5 text-primary" />
                  Pricing Start
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  Trial Period
                </div>
              </th>
              <th className="px-6 py-4" aria-label="Actions" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {visibleCrms.map((crm, i) => (
              <tr
                key={crm.slug}
                className={`table-row-hover ${
                  i % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-[#F0EDFF] dark:bg-slate-800/60"
                }`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                      {crm.name}
                    </span>
                    {crm.slug === "highlevel" && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                        Top Choice
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">
                  {crm.bestFor}
                </td>
                <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">
                  {crm.aiFeature}
                </td>
                <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">
                  {crm.pricingStart}
                </td>
                <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">
                  {crm.trialPeriod}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <CtaButton
                      href={`/go/${crm.slug}`}
                      size="sm"
                      className="w-full justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit {crm.name}
                    </CtaButton>
                    <CtaButton
                      href={`/reviews/${crm.slug}`}
                      size="sm"
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      Review
                    </CtaButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards (no sort, same order) */}
      <div className="mt-8 space-y-4 lg:hidden">
        {visibleCrms.map((crm, i) => (
          <div
            key={crm.slug}
            className={`rounded-2xl border border-slate-200 p-5 shadow-sm dark:border-slate-700 ${
              i % 2 === 0
                ? "bg-white dark:bg-slate-800"
                : "bg-[#F0EDFF] dark:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                {crm.name}
              </span>
              {crm.slug === "highlevel" && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                  Top Choice
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <Users className="h-3 w-3 text-primary" />
                  Best For
                </div>
                <div className="mt-1 text-slate-700 dark:text-slate-300">{crm.bestFor}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <Zap className="h-3 w-3 text-primary" />
                  Key AI Feature
                </div>
                <div className="mt-1 text-slate-700 dark:text-slate-300">{crm.aiFeature}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <BadgeDollarSign className="h-3 w-3 text-primary" />
                  Pricing Start
                </div>
                <div className="mt-1 text-slate-700 dark:text-slate-300">{crm.pricingStart}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <Clock3 className="h-3 w-3 text-primary" />
                  Trial Period
                </div>
                <div className="mt-1 text-slate-700 dark:text-slate-300">{crm.trialPeriod}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <CtaButton
                href={`/go/${crm.slug}`}
                size="sm"
                className="flex-1 justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {crm.name}
              </CtaButton>
              <CtaButton
                href={`/reviews/${crm.slug}`}
                size="sm"
                variant="secondary"
                className="flex-1 justify-center"
              >
                Review
              </CtaButton>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          aria-expanded={showAll}
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-700"
        >
          {showAll ? "Show fewer CRMs" : `Show all ${sortedCrms.length} CRMs`}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Data shown for informational purposes only. Always verify current pricing and trials on the provider site.
      </p>
    </>
  );
}
