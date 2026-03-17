/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/TextInput";
import { TextArea } from "@/components/ui/TextArea";
import { LifeAreaPicker } from "@/components/intake/LifeAreaPicker";
import { intakeSchema, lifeAreas, type IntakeInput } from "@/lib/validation/intake";

type FieldErrors = Partial<Record<keyof IntakeInput, string>>;

function parseForm(v: unknown): { ok: true; data: IntakeInput } | { ok: false; errors: FieldErrors } {
  const res = intakeSchema.safeParse(v);
  if (res.success) return { ok: true, data: res.data };
  const errors: FieldErrors = {};
  for (const issue of res.error.issues) {
    const key = issue.path[0] as keyof IntakeInput | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

export default function IntakePage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState<IntakeInput>(() => ({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    pronouns: "",
    mood: "",
    lifeArea: lifeAreas[0],
    question: "",
  }));

  const canSubmit = useMemo(() => {
    const res = intakeSchema.safeParse(form);
    return res.success && !busy;
  }, [form, busy]);

  async function onSubmit() {
    const parsed = parseForm(form);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const resp = await fetch("/api/reading/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || "Failed to create reading.");
      }
      const json = (await resp.json()) as { readingId: string };
      router.push(`/reading/session/${encodeURIComponent(json.readingId)}`);
    } catch (e) {
      setErrors((prev) => ({
        ...prev,
        question:
          e instanceof Error
            ? e.message
            : "Something went wrong. Please try again.",
      }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        <div className="flex items-center justify-between">
          <div className="text-sm tracking-wide text-[color:rgb(var(--fg1))]">
            AI Tarot
          </div>
          <div className="text-xs text-[color:rgb(var(--muted))]">
            Situation · Challenge · Guidance
          </div>
        </div>

        <div className="mt-8 rounded-[var(--radius-lg)] border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.55)] p-6 shadow-[var(--shadow)] sm:p-8">
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            Tell me a little about you—
            <span className="text-[color:rgb(var(--fg1))]">
              {" "}
              just enough to meet you where you are.
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:rgb(var(--fg1))]">
            This reading is for reflection and guidance. I won’t promise outcomes
            or speak in absolutes—only help you listen to what’s true in your
            moment.
          </p>

          <div className="mt-8 grid gap-6">
            <FormField
              label="Full name"
              hint="The name you want the reading to speak to"
              error={errors.fullName}
            >
              <TextInput
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="e.g., Amina Rivera"
                autoComplete="name"
              />
            </FormField>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Date of birth" hint="MM/DD/YYYY" error={errors.dateOfBirth}>
                <TextInput
                  value={form.dateOfBirth}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dateOfBirth: e.target.value }))
                  }
                  placeholder="e.g., 09/18/1996"
                />
              </FormField>
              <FormField label="Time of birth" hint="Local time" error={errors.timeOfBirth}>
                <TextInput
                  value={form.timeOfBirth}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, timeOfBirth: e.target.value }))
                  }
                  placeholder="e.g., 03:40 AM"
                />
              </FormField>
            </div>

            <FormField label="Place of birth" hint="City, region, country" error={errors.placeOfBirth}>
              <TextInput
                value={form.placeOfBirth}
                onChange={(e) =>
                  setForm((p) => ({ ...p, placeOfBirth: e.target.value }))
                }
                placeholder="e.g., Lisbon, Portugal"
              />
            </FormField>

            <FormField label="Pronouns (optional)" hint="Only if you’d like" error={errors.pronouns}>
              <TextInput
                value={form.pronouns ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, pronouns: e.target.value }))
                }
                placeholder="e.g., she/her, they/them"
              />
            </FormField>

            <FormField
              label="Current mood"
              hint="What’s the emotional weather right now?"
              error={errors.mood}
            >
              <TextInput
                value={form.mood}
                onChange={(e) =>
                  setForm((p) => ({ ...p, mood: e.target.value }))
                }
                placeholder="e.g., tender, hopeful, a little overwhelmed"
              />
            </FormField>

            <FormField
              label="Area of life"
              hint="Where do you want the most clarity?"
              error={errors.lifeArea}
            >
              <LifeAreaPicker
                value={form.lifeArea}
                onChange={(lifeArea) => setForm((p) => ({ ...p, lifeArea }))}
              />
            </FormField>

            <FormField
              label="Your question"
              hint="Ask one honest question you’d ask a wise friend."
              error={errors.question}
            >
              <TextArea
                value={form.question}
                onChange={(e) =>
                  setForm((p) => ({ ...p, question: e.target.value }))
                }
                placeholder="e.g., How do I stop repeating the same pattern in my relationships without hardening my heart?"
              />
            </FormField>

            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit}
              className={[
                "mt-2 inline-flex h-12 items-center justify-center rounded-full border px-6 text-sm font-medium tracking-wide transition focus:outline-none focus:ring-2",
                canSubmit
                  ? "border-[color:rgba(226,197,124,0.35)] bg-[color:rgba(226,197,124,0.16)] text-[color:rgb(var(--fg0))] shadow-[0_0_40px_rgba(226,197,124,0.10)] hover:bg-[color:rgba(226,197,124,0.22)] focus:ring-[color:rgba(226,197,124,0.25)]"
                  : "cursor-not-allowed border-[color:rgba(226,197,124,0.10)] bg-[color:rgba(10,11,18,0.40)] text-[color:rgba(198,192,228,0.55)]",
              ].join(" ")}
            >
              {busy ? "Preparing your reading…" : "Continue"}
            </button>

            <div className="text-xs leading-5 text-[color:rgb(var(--muted))]">
              By continuing, you agree this experience is for reflection and
              entertainment/spiritual insight. It is not medical, legal, or
              financial advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

