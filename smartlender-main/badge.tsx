import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const selectCls =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-brand-deep outline-none transition focus:ring-4";
const labelCls = "text-sm font-semibold text-brand-deep";

type FormState = {
  gender: string; married: string; dependents: string; education: string;
  self_employed: string; credit_history: string; property_area: string;
  applicant_income: string; coapplicant_income: string; loan_amount: string; loan_term: string;
  full_name: string; phone: string; email: string;
};

type PredictionResult = {
  approved: boolean;
  score: number;
  reasons: string[];
  source: "model" | "fallback";
  message?: string;
};

const initial: FormState = {
  gender: "", married: "", dependents: "", education: "",
  self_employed: "", credit_history: "", property_area: "",
  applicant_income: "", coapplicant_income: "", loan_amount: "", loan_term: "",
  full_name: "", phone: "", email: "",
};

function buildFallbackPrediction(f: FormState): PredictionResult {
  const reasons: string[] = [];
  let score = 50;
  if (f.credit_history === "1") { score += 30; reasons.push("Positive credit history"); }
  else if (f.credit_history === "0") { score -= 30; reasons.push("No credit history on record"); }

  const inc = Number(f.applicant_income || 0) + Number(f.coapplicant_income || 0);
  const amt = Number(f.loan_amount || 0);
  const term = Number(f.loan_term || 360);
  const emi = amt > 0 && term > 0 ? (amt * 1000) / term : 0;
  const dti = inc > 0 ? emi / inc : 1;
  if (dti < 0.35) { score += 15; reasons.push("Healthy debt-to-income ratio"); }
  else if (dti < 0.6) { score += 5; }
  else { score -= 15; reasons.push("High EMI to income ratio"); }

  if (f.education === "Graduate") score += 5;
  if (f.self_employed === "No") score += 3;
  if (f.married === "Yes") score += 2;
  if (f.property_area === "Urban" || f.property_area === "Semiurban") score += 3;

  score = Math.max(1, Math.min(99, score));
  return { approved: score >= 60, score, reasons, source: "fallback", message: "Fallback heuristic used because the model endpoint was unavailable." };
}

export function LoanForm() {
  const [f, setF] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const fallbackResult = useMemo(() => buildFallbackPrediction(f), [f]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    // Clear error for this field as the user types
    if (errors[k]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[k];
        return next;
      });
    }
  };

  const handleBlur = (k: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [k]: true }));
  };

  // Helper to validate all fields and get the errors
  const getValidationErrors = (state: FormState) => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!state.gender) errs.gender = "Gender is required";
    if (!state.married) errs.married = "Marital status is required";
    if (!state.dependents) errs.dependents = "Dependents count is required";
    if (!state.education) errs.education = "Education level is required";
    if (!state.self_employed) errs.self_employed = "Self employed status is required";
    if (!state.credit_history) errs.credit_history = "Credit history is required";
    if (!state.property_area) errs.property_area = "Property area is required";

    if (!state.applicant_income) {
      errs.applicant_income = "Applicant income is required";
    } else if (Number(state.applicant_income) <= 0) {
      errs.applicant_income = "Income must be greater than 0";
    }

    if (!state.loan_amount) {
      errs.loan_amount = "Loan amount is required";
    } else if (Number(state.loan_amount) <= 0) {
      errs.loan_amount = "Loan amount must be greater than 0";
    }

    if (!state.loan_term) {
      errs.loan_term = "Loan term is required";
    } else if (Number(state.loan_term) <= 0) {
      errs.loan_term = "Loan term must be greater than 0";
    }

    if (!state.full_name.trim()) errs.full_name = "Full name is required";

    const cleanPhone = state.phone.replace(/\D/g, "");
    if (!state.phone) {
      errs.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit mobile starting with 6-9";
    }

    const trimmedEmail = state.email.trim();
    if (!trimmedEmail) {
      errs.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      errs.email = "Enter a valid email address (e.g. name@domain.com)";
    }

    return errs;
  };

  const getFieldCls = (k: keyof FormState) => {
    const hasError = (touched[k] || submitted) && errors[k];
    return `${selectCls} ${hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
      : "border-border focus:border-brand-accent focus:ring-brand-accent/20"
      }`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = getValidationErrors(f);
    setErrors(validationErrors);

    const allTouched: Partial<Record<keyof FormState, boolean>> = {};
    Object.keys(f).forEach((key) => {
      allTouched[key as keyof FormState] = true;
    });
    setTouched(allTouched);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      setResult(null);
      const firstErrorKey = Object.keys(validationErrors)[0] as keyof FormState;
      const errorEl = document.getElementById(`field-${firstErrorKey}`);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
        if (errorEl.tagName === "INPUT" || errorEl.tagName === "SELECT") {
          (errorEl as HTMLInputElement | HTMLSelectElement).focus();
        }
      }
      return;
    }

    setSubmitted(true);
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("Gender", f.gender);
      formData.append("Married", f.married);
      formData.append("Dependents", f.dependents);
      formData.append("Education", f.education);
      formData.append("Self_Employed", f.self_employed);
      formData.append("ApplicantIncome", f.applicant_income);
      formData.append("CoapplicantIncome", f.coapplicant_income);
      formData.append("LoanAmount", f.loan_amount);
      formData.append("Loan_Amount_Term", f.loan_term);
      formData.append("Credit_History", f.credit_history);
      formData.append("Property_Area", f.property_area);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Prediction request failed.");
      }

      const score = Number(payload.probability || 0);
      setResult({
        approved: Boolean(payload.approved),
        score,
        reasons: fallbackResult.reasons,
        source: "model",
        message: "Prediction generated from the trained Random Forest model and Epic 3 preprocessing pipeline.",
      });
    } catch (error) {
      const fallback = buildFallbackPrediction(f);
      setResult({ ...fallback, source: "fallback", message: error instanceof Error ? error.message : "Prediction request failed." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        const resultEl = document.getElementById("prediction-result");
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  };

  return (
    <section id="apply" className="bg-surface-muted py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">Loan Prediction Form</p>
          <h2 className="mt-4 text-4xl font-bold text-brand-deep sm:text-5xl">Applicant Profile</h2>
          <p className="mt-4 text-ink-muted">
            Fill the form below and submit it to get an immediate loan approval prediction.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] ring-1 ring-black/5 sm:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="field-gender" className={labelCls}>Gender</label>
              <select
                id="field-gender"
                className={getFieldCls("gender")}
                value={f.gender}
                onChange={(e) => set("gender", e.target.value)}
                onBlur={() => handleBlur("gender")}
              >
                <option value="">Select gender</option><option>Male</option><option>Female</option>
              </select>
              {(touched.gender || submitted) && errors.gender && (
                <p className="mt-1 text-xs text-destructive">{errors.gender}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-married" className={labelCls}>Married</label>
              <select
                id="field-married"
                className={getFieldCls("married")}
                value={f.married}
                onChange={(e) => set("married", e.target.value)}
                onBlur={() => handleBlur("married")}
              >
                <option value="">Select marital status</option><option>Yes</option><option>No</option>
              </select>
              {(touched.married || submitted) && errors.married && (
                <p className="mt-1 text-xs text-destructive">{errors.married}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-dependents" className={labelCls}>Dependents</label>
              <select
                id="field-dependents"
                className={getFieldCls("dependents")}
                value={f.dependents}
                onChange={(e) => set("dependents", e.target.value)}
                onBlur={() => handleBlur("dependents")}
              >
                <option value="">Select dependents</option><option>0</option><option>1</option><option>2</option><option>3+</option>
              </select>
              {(touched.dependents || submitted) && errors.dependents && (
                <p className="mt-1 text-xs text-destructive">{errors.dependents}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-education" className={labelCls}>Education</label>
              <select
                id="field-education"
                className={getFieldCls("education")}
                value={f.education}
                onChange={(e) => set("education", e.target.value)}
                onBlur={() => handleBlur("education")}
              >
                <option value="">Select education</option><option>Graduate</option><option>Not Graduate</option>
              </select>
              {(touched.education || submitted) && errors.education && (
                <p className="mt-1 text-xs text-destructive">{errors.education}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-self_employed" className={labelCls}>Self Employed</label>
              <select
                id="field-self_employed"
                className={getFieldCls("self_employed")}
                value={f.self_employed}
                onChange={(e) => set("self_employed", e.target.value)}
                onBlur={() => handleBlur("self_employed")}
              >
                <option value="">Select option</option><option>Yes</option><option>No</option>
              </select>
              {(touched.self_employed || submitted) && errors.self_employed && (
                <p className="mt-1 text-xs text-destructive">{errors.self_employed}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-credit_history" className={labelCls}>Credit History</label>
              <select
                id="field-credit_history"
                className={getFieldCls("credit_history")}
                value={f.credit_history}
                onChange={(e) => set("credit_history", e.target.value)}
                onBlur={() => handleBlur("credit_history")}
              >
                <option value="">Select history</option><option value="1">1</option><option value="0">0</option>
              </select>
              {(touched.credit_history || submitted) && errors.credit_history && (
                <p className="mt-1 text-xs text-destructive">{errors.credit_history}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="field-property_area" className={labelCls}>Property Area</label>
              <select
                id="field-property_area"
                className={getFieldCls("property_area")}
                value={f.property_area}
                onChange={(e) => set("property_area", e.target.value)}
                onBlur={() => handleBlur("property_area")}
              >
                <option value="">Select area</option><option>Urban</option><option>Semiurban</option><option>Rural</option>
              </select>
              {(touched.property_area || submitted) && errors.property_area && (
                <p className="mt-1 text-xs text-destructive">{errors.property_area}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-applicant_income" className={labelCls}>Applicant Income (₹)</label>
              <input
                id="field-applicant_income"
                inputMode="numeric"
                className={getFieldCls("applicant_income")}
                placeholder="e.g. 45000"
                value={f.applicant_income}
                onChange={(e) => set("applicant_income", e.target.value.replace(/\D/g, ""))}
                onBlur={() => handleBlur("applicant_income")}
              />
              {(touched.applicant_income || submitted) && errors.applicant_income && (
                <p className="mt-1 text-xs text-destructive">{errors.applicant_income}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-coapplicant_income" className={labelCls}>Coapplicant Income (₹)</label>
              <input
                id="field-coapplicant_income"
                inputMode="numeric"
                className={selectCls + " border-border focus:border-brand-accent focus:ring-brand-accent/20"}
                placeholder="e.g. 15000"
                value={f.coapplicant_income}
                onChange={(e) => set("coapplicant_income", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div>
              <label htmlFor="field-loan_amount" className={labelCls}>Loan Amount (₹ in thousands)</label>
              <input
                id="field-loan_amount"
                inputMode="numeric"
                className={getFieldCls("loan_amount")}
                placeholder="e.g. 150"
                value={f.loan_amount}
                onChange={(e) => set("loan_amount", e.target.value.replace(/\D/g, ""))}
                onBlur={() => handleBlur("loan_amount")}
              />
              {(touched.loan_amount || submitted) && errors.loan_amount && (
                <p className="mt-1 text-xs text-destructive">{errors.loan_amount}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-loan_term" className={labelCls}>Loan Amount Term (months)</label>
              <input
                id="field-loan_term"
                inputMode="numeric"
                className={getFieldCls("loan_term")}
                placeholder="e.g. 360"
                value={f.loan_term}
                onChange={(e) => set("loan_term", e.target.value.replace(/\D/g, ""))}
                onBlur={() => handleBlur("loan_term")}
              />
              {(touched.loan_term || submitted) && errors.loan_term && (
                <p className="mt-1 text-xs text-destructive">{errors.loan_term}</p>
              )}
            </div>

            <div className="md:col-span-2 mt-4 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">Contact Details</p>
            </div>
            <div>
              <label htmlFor="field-full_name" className={labelCls}>Full Name</label>
              <input
                id="field-full_name"
                className={getFieldCls("full_name")}
                placeholder="Your full name"
                value={f.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                onBlur={() => handleBlur("full_name")}
              />
              {(touched.full_name || submitted) && errors.full_name && (
                <p className="mt-1 text-xs text-destructive">{errors.full_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="field-phone" className={labelCls}>Phone (Indian format)</label>
              <div
                id="field-phone-container"
                className={`mt-2 flex items-stretch overflow-hidden rounded-xl border bg-white focus-within:ring-4 ${(touched.phone || submitted) && errors.phone
                  ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
                  : "border-border focus-within:border-brand-accent focus-within:ring-brand-accent/20"
                  }`}
              >
                <span className="grid place-items-center bg-surface-muted px-3 text-sm font-semibold text-brand-deep">+91</span>
                <input
                  id="field-phone"
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full bg-transparent px-3 py-3 text-sm text-brand-deep outline-none"
                  placeholder="10-digit mobile"
                  value={f.phone}
                  onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  onBlur={() => handleBlur("phone")}
                />
              </div>
              {(touched.phone || submitted) && errors.phone && (
                <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="field-email" className={labelCls}>Email</label>
              <input
                id="field-email"
                type="email"
                className={getFieldCls("email")}
                placeholder="you@example.com"
                value={f.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => handleBlur("email")}
              />
              {(touched.email || submitted) && errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 w-full rounded-2xl bg-brand-accent px-6 py-4 text-base font-semibold text-[color:var(--primary-foreground)] shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--brand-accent)_75%,transparent)] transition cursor-pointer enabled:hover:bg-brand-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Scoring application..." : "Predict My Loan Approval"}
          </button>

          {submitted && result && (
            <div
              id="prediction-result"
              className={`mt-8 rounded-2xl p-6 ring-1 ${result.approved
                ? "bg-[oklch(0.96_0.06_160)] ring-brand-accent/40"
                : "bg-[oklch(0.97_0.05_30)] ring-destructive/30"
                }`}
            >
              <div className="flex items-center gap-3">
                {result.approved ? (
                  <CheckCircle2 className="h-6 w-6 text-brand-deep" />
                ) : (
                  <XCircle className="h-6 w-6 text-destructive" />
                )}
                <h3 className="text-xl font-bold text-brand-deep">
                  {result.approved ? "Likely Approved" : "Likely Rejected"} · Confidence {result.score}%
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-deep/80">
                {result.message || "This preliminary assessment is based on the application details provided."}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-deep/80">
                {result.approved
                  ? `We are pleased to inform you that your loan application appears suitable for approval based on the information provided. A member of our underwriting team will review your application and contact you shortly with the next steps.`
                  : `We sincerely regret to inform you that your loan application is not approved at this time. Based on the current profile and risk assessment, it does not meet the required threshold for approval.`}
              </p>
              <div className="mt-3 inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {result.source === "model" ? "Model-backed prediction" : "Fallback heuristic"}
              </div>
              {result.reasons.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-brand-deep/80">
                  {result.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
