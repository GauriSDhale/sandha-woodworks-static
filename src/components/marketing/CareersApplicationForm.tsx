"use client";

import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { openPositions } from "@/lib/constants/about";

const roleOptions = openPositions.map((position) => position.title);
const experienceOptions = ["0–1 year", "1–3 years", "3–5 years", "5+ years"];
const authorizationOptions = [
  "Canadian citizen",
  "Permanent resident",
  "Work permit holder",
  "Open to sponsorship",
  "Prefer not to say",
];

export function CareersApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-muted p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold">Application received</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Thank you for applying. Our team will review your details and reach out if your profile is
          a match for an opening.
        </p>
      </div>
    );
  }

  return (
    <div
      id="careers-application-form"
      className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">Apply now</p>
        <h2 className="font-display text-3xl font-semibold">Candidate application</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Share your background and upload your resume. Required fields are marked with an asterisk.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name" id="fullName" required />
          <Field label="Email address" id="email" type="email" required />
          <Field label="Phone number" id="phone" type="tel" required />
          <Field label="City / province" id="location" required />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label="Position applying for" id="position" options={roleOptions} required />
          <SelectField label="Years of experience" id="experience" options={experienceOptions} required />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Current or most recent role" id="currentRole" required />
          <Field label="Current or most recent company" id="currentCompany" required />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="LinkedIn profile" id="linkedin" type="url" />
          <Field label="Portfolio / website" id="portfolio" type="url" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Work authorization"
            id="workAuthorization"
            options={authorizationOptions}
            required
          />
          <Field label="Preferred start date" id="startDate" type="date" />
        </div>

        <div>
          <label htmlFor="coverNote" className="block text-sm font-medium">
            Cover note
          </label>
          <textarea
            id="coverNote"
            name="coverNote"
            rows={5}
            className="mt-2 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="Tell us a little about yourself and why you'd like to join Sandha Woodworks."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="resume" className="block text-sm font-medium">
              Resume
              <span className="ml-1 text-brand-red">*</span>
            </label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted px-6 py-8 text-center transition hover:border-black/20">
              <Upload className="h-7 w-7 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">Upload your resume</span>
              <span className="mt-1 text-xs text-muted-foreground">PDF, DOC, or DOCX up to 10 MB</span>
              <input id="resume" name="resume" type="file" className="sr-only" required accept=".pdf,.doc,.docx" />
            </label>
          </div>

          <div>
            <label htmlFor="supportingDocuments" className="block text-sm font-medium">
              Supporting documents
            </label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted px-6 py-8 text-center transition hover:border-black/20">
              <Upload className="h-7 w-7 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">Add portfolio or certificates</span>
              <span className="mt-1 text-xs text-muted-foreground">Optional documents or work samples</span>
              <input
                id="supportingDocuments"
                name="supportingDocuments"
                type="file"
                className="sr-only"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
          By submitting this form, you consent to our team reviewing your application. We will be in
          touch if your experience aligns with an opening.
        </div>

        <button
          type="submit"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream transition hover:bg-warm-black"
        >
          Submit application
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? <span className="ml-1 text-brand-red">*</span> : null}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="mt-2 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  );
}

function SelectField({
  label,
  id,
  options,
  required = false,
}: {
  label: string;
  id: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? <span className="ml-1 text-brand-red">*</span> : null}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        className="mt-2 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-black"
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
