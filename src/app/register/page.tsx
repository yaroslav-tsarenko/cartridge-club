"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { COUNTRIES } from "@/lib/countries";

type Form = {
  email: string;
  password: string;
  confirm: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

const EMPTY: Form = {
  email: "",
  password: "",
  confirm: "",
  firstName: "",
  lastName: "",
  phone: "+44 ",
  dateOfBirth: "",
  street: "",
  city: "",
  country: "United Kingdom",
  postalCode: "",
};

const STEPS = ["Account", "About you", "Address"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function validateStep(): string | null {
    if (step === 0) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Enter a valid email address.";
      if (form.password.length < 8) return "Password must be at least 8 characters.";
      if (form.password !== form.confirm) return "Passwords don't match.";
    }
    if (step === 1) {
      if (!form.firstName.trim() || !form.lastName.trim()) return "Enter your first and last name.";
      if (form.phone.replace(/\D/g, "").length < 7) return "Enter a valid phone number.";
      if (!form.dateOfBirth) return "Enter your date of birth.";
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) return setError(err);
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function submit() {
    if (!form.street.trim() || !form.city.trim() || !form.postalCode.trim())
      return setError("Complete all address fields.");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, acceptedTerms: accepted }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      router.push("/account");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl">Create your account</h1>
        <p className="mt-1 text-sm text-muted">Join the club for instant keys and member deals.</p>

        {/* Step indicator */}
        <div className="mt-6 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink text-xs font-heading ${
                  i <= step ? "bg-cobalt text-white" : "bg-card text-muted"
                }`}
              >
                {i + 1}
              </div>
              <span className={`hidden text-xs sm:block ${i === step ? "text-ink" : "text-muted"}`}>{label}</span>
              {i < STEPS.length - 1 && <div className="h-0.5 flex-1 bg-line" />}
            </div>
          ))}
        </div>

        <div className="cc-outline-plate mt-6 rounded-card bg-card p-6">
          {error && (
            <p className="mb-4 rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">{error}</p>
          )}

          {step === 0 && (
            <div className="space-y-4">
              <Field label="Email">
                <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@email.com" />
              </Field>
              <Field label="Password">
                <input type="password" value={form.password} onChange={set("password")} className={inputCls} placeholder="At least 8 characters" />
              </Field>
              <Field label="Confirm password">
                <input type="password" value={form.confirm} onChange={set("confirm")} className={inputCls} />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name">
                  <input value={form.firstName} onChange={set("firstName")} className={inputCls} />
                </Field>
                <Field label="Last name">
                  <input value={form.lastName} onChange={set("lastName")} className={inputCls} />
                </Field>
              </div>
              <Field label="Phone number">
                <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+44 7822 016861" />
              </Field>
              <Field label="Date of birth">
                <input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} className={inputCls} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field label="Street address">
                <input value={form.street} onChange={set("street")} className={inputCls} placeholder="221B Baker Street" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="City">
                  <input value={form.city} onChange={set("city")} className={inputCls} />
                </Field>
                <Field label="Postal code">
                  <input value={form.postalCode} onChange={set("postalCode")} className={inputCls} />
                </Field>
              </div>
              <Field label="Country">
                <select value={form.country} onChange={set("country")} className={inputCls}>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <label className="flex items-start gap-2 pt-2 text-sm">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4"
                />
                <span>
                  I read and agree to the{" "}
                  <Link href="/terms" className="underline hover:text-cobalt" target="_blank">
                    terms and conditions
                  </Link>
                  .
                </span>
              </label>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <Button variant="secondary" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button variant="primary" onClick={submit} disabled={!accepted || loading} className={!accepted || loading ? "opacity-50" : ""}>
                {loading ? "Creating…" : "Create account"}
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Already a member?{" "}
          <Link href="/login" className="font-heading text-cobalt hover:underline">
            Log in
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

const inputCls =
  "cc-outline w-full rounded-xl bg-bg px-3 py-2.5 text-sm outline-none placeholder:text-muted";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-heading text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}
