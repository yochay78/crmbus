"use client";

import { useState } from "react";
import {
  Users,
  Zap,
  BadgeDollarSign,
  Clock3,
  ChevronDown,
} from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import type { Crm } from "@/lib/crms";

const INITIAL_COUNT = 5;

export function CrmTableSection({ crms }: { crms: readonly Crm[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? crms : crms.slice(0, INITIAL_COUNT);
  const hasMore = crms.length > INITIAL_COUNT;

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="mt-6 space-y-4 lg:hidden">
        {visible.map((crm, i) => (
          <div
            key={crm.slug}
            className={`rounded-2xl border border-slate-200 p-5 shadow-sm dark:border-slate-700 ${i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-[#F0EDFF] dark:bg-slate-800/60"}`}
          >
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              {crm.name}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <Users className="h-3 w-3 text-primary" />
                  Best For
                </div>
                <div className="mt-1 text-slate-700">{crm.bestFor}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <Zap className="h-3 w-3 text-primary" />
                  Key AI Feature
                </div>
                <div className="mt-1 text-slate-700">{crm.aiFeature}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <BadgeDollarSign className="h-3 w-3 text-primary" />
                  Pricing Start
                </div>
                <div className="mt-1 text-slate-700">{crm.pricingStart}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <Clock3 className="h-3 w-3 text-primary" />
                  Trial Period
                </div>
                <div className="mt-1 text-slate-700">{crm.trialPeriod}</div>
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
                Read full review
              </CtaButton>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="mt-6 hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md ring-1 ring-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:ring-slate-700 lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-table-header">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                CRM
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  Best For
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Key AI Feature
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  <BadgeDollarSign className="h-3.5 w-3.5 text-primary" />
                  Pricing Start
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  Trial Period
                </div>
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((crm, i) => (
              <tr
                key={crm.slug}
                className={`table-row-hover ${i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-[#F0EDFF] dark:bg-slate-800/60"}`}
              >
                <td className="px-6 py-5">
                  <div className="text-base font-semibold tracking-tight text-slate-900">
                    {crm.name}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-700">
                  {crm.bestFor}
                </td>
                <td className="px-6 py-5 text-sm text-slate-700">
                  {crm.aiFeature}
                </td>
                <td className="px-6 py-5 text-sm text-slate-700">
                  {crm.pricingStart}
                </td>
                <td className="px-6 py-5 text-sm text-slate-700">
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
                      Read full review
                    </CtaButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && !expanded && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-primary-100 hover:bg-primary-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            Show all {crms.length} CRMs
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
