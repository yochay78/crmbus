import { MessageSquareText, Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { JsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "CRM Q&A (2026) — CRMBUS",
  description:
    "Common questions and practical answers about choosing, implementing, and scaling with AI-powered CRMs.",
};

const QUESTIONS = [
  {
    id: "what-is-ai-crm",
    question: "What is an AI-powered CRM, in simple terms?",
    answer:
      "An AI-powered CRM is a customer relationship platform that doesn’t just store contact data—it also uses automation and machine learning to decide who to contact, when to follow up, and what to send. In practice, that means automatic lead scoring, smart routing, and follow-up sequences that run in the background instead of being managed in spreadsheets.",
  },
  {
    id: "when-upgrade",
    question: "How do I know it’s time to upgrade from a basic CRM or spreadsheet?",
    answer:
      "It’s usually time to upgrade when: (1) you’re missing follow-ups because you can’t see the whole pipeline, (2) multiple people are touching the same leads and stepping on each other, or (3) you have more leads than your team can reasonably work manually. At that point, automation and AI-based prioritization typically recover revenue that’s currently slipping through the cracks.",
  },
  {
    id: "agencies-vs-teams",
    question: "Should agencies and in‑house sales teams choose different CRMs?",
    answer:
      "Often, yes. Agencies usually benefit from an all‑in‑one system that handles multiple client accounts and repeatable funnels, while in‑house sales teams focus more on pipeline visibility, lifecycle automation, and reporting. That’s why platforms like HighLevel tend to skew agency‑first, while tools like Keap are often chosen for in‑house sales teams.",
  },
  {
    id: "trial-plan",
    question: "What’s the best way to use a 14‑day trial?",
    answer:
      "Go in with a short playbook instead of exploring at random. For example: define one pipeline, connect one lead source, and build one 7–10 day follow‑up sequence. Measure three things during the trial—speed‑to‑lead, reply rate, and booked meetings per 100 leads. If those move in the right direction, the CRM is doing real work for you.",
  },
  {
    id: "ai-lead-scoring",
    question: "Does AI lead scoring really help conversion rates?",
    answer:
      "It can, but only if you have enough lead volume and a clear definition of what a good lead looks like. Scoring is most valuable when your reps are busy and can’t work every lead equally. The goal is simple: your best reps talk to the best leads, faster. During evaluation, always check whether high‑score leads actually convert better than low‑score leads.",
  },
  {
    id: "migration-fear",
    question: "I’m worried about migrating data. How should I handle that?",
    answer:
      "For evaluation, don’t migrate everything. Start with a subset: your current active deals and a slice of recent leads. Use that to validate the workflow, automations, and reporting. Once the system is working for today’s pipeline, you can backfill historical data or leave older records in the previous system for reference only.",
  },
  {
    id: "solo-vs-team",
    question: "What’s different for solopreneurs compared to larger teams?",
    answer:
      "Solopreneurs usually benefit from simplicity more than extreme automation. A clear pipeline, reliable task list, and lightweight follow‑ups are often enough. As you add team members, coordination becomes more important: permissions, routing, handoffs, and reporting all matter more. That’s when you might move from a simpler tool into something more automation‑heavy.",
  },
  {
    id: "hidden-costs",
    question: "What hidden costs should I watch for with CRM platforms?",
    answer:
      "The main non‑obvious costs are (1) implementation time, (2) required add‑ons or integrations for key features, and (3) the internal change‑management effort of getting people to actually use the tool. A good rule: choose something you can realistically set up in weeks, not months, and commit to one clear owner responsible for keeping pipeline data accurate.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
};

export default function QaPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <JsonLd data={faqJsonLd} />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.14),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.25),rgba(0,0,0,0))]" />

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
            <ThemeToggle />
            <CtaButton href="/#top-crms" size="sm" className="hidden sm:inline-flex">
              View Top Picks
            </CtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <MessageSquareText
                className="h-4 w-4 text-primary"
                aria-hidden="true"
              />
              CRM & automation Q&A
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Common questions about AI CRMs
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Short, practical answers to the questions we see most often when
              teams are considering a new CRM or upgrading to an AI‑powered stack.
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <CtaButton href="/#top-crms" className="justify-center">
              Jump to top picks
            </CtaButton>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-24">
              <div className="font-semibold text-slate-900">Browse questions</div>
              <ul className="mt-4 space-y-2">
                {QUESTIONS.map((q) => (
                  <li key={q.id}>
                    <a
                      href={`#${q.id}`}
                      className="text-slate-700 hover:text-slate-900"
                    >
                      {q.question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="space-y-4 lg:col-span-8">
            {QUESTIONS.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:p-7"
              >
                <h2 className="text-base font-semibold text-slate-900">
                  {item.question}
                </h2>
                <p className="mt-2">{item.answer}</p>
              </article>
            ))}
          </section>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:p-7">
          CRMBUS.com is a professional review site that may receive compensation
          from the companies whose products we review.
        </section>
      </main>
    </div>
  );
}

