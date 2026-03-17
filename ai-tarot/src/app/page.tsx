import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.6)] shadow-[var(--shadow)]" />
            <div className="text-sm tracking-wide text-[color:rgb(var(--fg1))]">
              AI Tarot
            </div>
          </div>
          <div className="text-xs text-[color:rgb(var(--muted))]">
            For reflection, guidance, and insight.
          </div>
        </header>

        <main className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.55)] px-4 py-2 text-xs text-[color:rgb(var(--fg1))] shadow-[var(--shadow)]">
              <span className="h-2 w-2 rounded-full bg-[color:rgb(var(--gold))] shadow-[0_0_18px_rgba(226,197,124,0.35)]" />
              A quiet reading. A clear mirror.
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-6xl">
              A cinematic three‑card spread, shaped around your question.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-[color:rgb(var(--fg1))]">
              Share a little about your moment—your mood, your question, your
              birth details. I’ll draw three cards and offer a grounded,
              emotionally intelligent reading that feels human, not performative.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/reading/intake"
                className="group inline-flex h-12 items-center justify-center rounded-full border border-[color:rgb(var(--border))] bg-[color:rgba(226,197,124,0.16)] px-6 text-sm font-medium tracking-wide text-[color:rgb(var(--fg0))] shadow-[0_0_50px_rgba(226,197,124,0.12)] transition hover:bg-[color:rgba(226,197,124,0.22)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(226,197,124,0.35)]"
              >
                Begin Reading
                <span className="ml-2 translate-x-0 transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <div className="text-xs leading-5 text-[color:rgb(var(--muted))]">
                Readings are for reflection and entertainment/spiritual insight.
                No guarantees, no fear-based claims.
              </div>
            </div>
          </section>

          <section className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.55)] p-6 shadow-[var(--shadow)]">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[color:rgba(154,114,255,0.18)] blur-3xl" />
              <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[color:rgba(66,103,255,0.14)] blur-3xl" />

              <div className="relative">
                <div className="text-xs tracking-wide text-[color:rgb(var(--muted))]">
                  The experience
                </div>
                <div className="mt-2 text-xl font-medium">
                  Situation · Challenge · Guidance
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:rgb(var(--fg1))]">
                  Three cards, revealed one by one—each with meaning, an
                  intuitive reflection, and a final synthesis that stays gentle
                  and practical.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Shuffling the deck…",
                    "Drawing your cards…",
                    "Reading your energy…",
                    "Interpreting the message…",
                  ].map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-[color:rgba(226,197,124,0.10)] bg-[color:rgba(10,11,18,0.45)] px-4 py-3"
                    >
                      <div className="text-sm text-[color:rgb(var(--fg1))]">
                        {label}
                      </div>
                      <div className="h-2 w-2 rounded-full bg-[color:rgba(226,197,124,0.35)] shadow-[0_0_16px_rgba(226,197,124,0.24)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
