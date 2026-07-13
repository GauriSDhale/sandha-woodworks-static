"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { contactSectors } from "@/lib/constants/about";
import { siteConfig } from "@/lib/constants/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<"quote" | "inquiry">("quote");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-muted p-8 text-center">
        <p className="text-lg font-semibold">Thank you for your request.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our estimating team will follow up within one business day.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 inline-flex rounded-full border border-border bg-muted p-1">
        {[
          { id: "quote" as const, label: "Request a Quote" },
          { id: "inquiry" as const, label: "General Inquiry" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFormType(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              formType === tab.id ? "bg-black text-white" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" id="fullName" required />
          <Field label="Company" id="company" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" id="email" type="email" required />
          <Field label="Phone" id="phone" type="tel" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Project Name" id="projectName" />
          <Field label="Project Location" id="projectLocation" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sector" className="block text-sm font-medium">
              Sector
            </label>
            <select
              id="sector"
              name="sector"
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
            >
              {contactSectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          <Field label="Timeline" id="timeline" />
        </div>
        <Field label="Budget (Optional)" id="budget" />

        <div>
          <label className="block text-sm font-medium">
            Project Drawings / Files
            <span className="ml-1 font-normal text-muted-foreground">
              (PDF, DWG, images — up to 10 MB each)
            </span>
          </label>
          <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted px-6 py-10 text-center transition hover:border-black/20">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="mt-3 text-sm font-medium">Click to upload drawings</span>
            <span className="mt-1 text-xs text-muted-foreground">
              Attach shop drawings, RFPs, spec sheets, or reference images
            </span>
            <input type="file" className="sr-only" multiple accept=".pdf,.dwg,.png,.jpg,.jpeg" />
          </label>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-warm-black"
        >
          Submit Request
        </button>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Having trouble uploading drawings? Email project files to{" "}
          <a href={`mailto:${siteConfig.estimatingEmail}`} className="underline">
            {siteConfig.estimatingEmail}
          </a>{" "}
          after submitting this form.
        </p>
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
        {required ? <span className="text-brand-red"> *</span> : null}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
