"use client";

import { useRef, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X } from "lucide-react";
import { contactSectors } from "@/lib/constants/about";
import { sendEmail } from "@/lib/email";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_EXTENSIONS = [".pdf", ".dwg", ".png", ".jpg", ".jpeg"];
const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(",");

/** Country dial codes for the phone field. Values are ISO codes (unique). */
const countryCodes = [
  { code: "CA", label: "Canada", dial: "+1", flag: "🇨🇦" ,},
  { code: "US", label: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "IN", label: "India", dial: "+91", flag: "🇮🇳" },
  { code: "AU", label: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AE", label: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "DE", label: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", label: "France", dial: "+33", flag: "🇫🇷" },
  { code: "MX", label: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "SG", label: "Singapore", dial: "+65", flag: "🇸🇬" },
] as const;

const todayISO = () => new Date().toISOString().slice(0, 10);

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const contactSchema = z
  .object({
    formType: z.enum(["quote", "inquiry"]),
    fullName: z
      .string()
      .trim()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must be 50 characters or fewer"),
    company: optionalText(100),
    email: z.email("Enter a valid email address"),
    country: z.enum(countryCodes.map((c) => c.code) as [string, ...string[]]),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^\d{7,15}$/, "Enter a valid phone number (7–15 digits)"),
    projectName: optionalText(120),
    projectLocation: optionalText(120),
    sector: z.enum(contactSectors, { message: "Please select a sector" }),
    timeline: z
      .string()
      .optional()
      .refine((v) => !v || !Number.isNaN(Date.parse(v)), "Enter a valid date")
      .refine((v) => !v || v >= todayISO(), "Timeline can't be in the past"),
    budget: optionalText(60),
    message: optionalText(2000),
    files: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    const list = data.files as FileList | undefined;
    if (!list || list.length === 0) return;
    Array.from(list).forEach((file) => {
      const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        ctx.addIssue({
          code: "custom",
          path: ["files"],
          message: `${file.name}: unsupported file type (PDF, DWG or images only)`,
        });
      }
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: "custom",
          path: ["files"],
          message: `${file.name} is larger than 10 MB`,
        });
      }
    });
  });

/**
 * General Inquiry only validates the essentials (Full Name, Email, Message),
 * with Email also format-checked. Every other field is carried through
 * untouched so nothing is stripped from the submitted values.
 */
const inquirySchema = z.object({
  formType: z.enum(["quote", "inquiry"]),
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  projectName: z.string().optional(),
  projectLocation: z.string().optional(),
  sector: z.any().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  files: z.any().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const quoteResolver = zodResolver(contactSchema) as Resolver<ContactFormValues>;
const inquiryResolver = zodResolver(inquirySchema) as unknown as Resolver<ContactFormValues>;

/** Pick the schema based on the active tab so each mode has its own rules. */
const contactResolver: Resolver<ContactFormValues> = (values, context, options) =>
  (values.formType === "inquiry" ? inquiryResolver : quoteResolver)(values, context, options);

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: contactResolver,
    mode: "onBlur",
    defaultValues: {
      formType: "quote",
      fullName: "",
      company: "",
      email: "",
      country: "IN",
      phone: "",
      projectName: "",
      projectLocation: "",
      sector: undefined,
      timeline: "",
      budget: "",
      message: "",
    },
  });

  const formType = useWatch({ control, name: "formType" });
  const selectedFiles = useWatch({ control, name: "files" }) as FileList | undefined;

  const { ref: filesFieldRef, ...filesRegister } = register("files");

  function clearFiles() {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setValue("files", undefined, { shouldValidate: true });
  }

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    const country = countryCodes.find((c) => c.code === values.country);
    const isInquiry = values.formType === "inquiry";

    const fd = new FormData();
    fd.append("from_name", "Sandha Woodworks Website");
    fd.append(
      "subject",
      isInquiry
        ? `New General Inquiry — ${values.fullName}`
        : `New Quote Request — ${values.fullName}${values.sector ? ` (${values.sector})` : ""}`,
    );
    fd.append("replyto", values.email);

    fd.append("Form Type", isInquiry ? "General Inquiry" : "Request a Quote");
    fd.append("Full Name", values.fullName);
    fd.append("Email", values.email);
    fd.append("Phone", `${country?.dial ?? ""} ${values.phone}`.trim());
    if (values.company) fd.append("Company", values.company);
    if (values.projectName) fd.append("Project Name", values.projectName);
    if (values.projectLocation) fd.append("Project Location", values.projectLocation);
    if (values.sector) fd.append("Sector", values.sector);
    if (values.timeline) fd.append("Timeline", values.timeline);
    if (values.budget) fd.append("Budget", values.budget);
    if (values.message) fd.append("Message", values.message);

    const files = values.files as FileList | undefined;
    if (files) {
      Array.from(files).forEach((file, index) =>
        fd.append(`Attachment ${index + 1}`, file, file.name),
      );
    }

    const result = await sendEmail(fd);
    if (result.success) {
      setSent(true);
      reset();
    } else {
      setSubmitError(result.message ?? "Something went wrong. Please try again.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-muted p-8 text-center">
        <p className="text-lg font-semibold">Thank you for your request.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our estimating team will follow up within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:bg-background"
        >
          Submit another request
        </button>
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
            onClick={() => {
              setValue("formType", tab.id);
              clearErrors();
            }}
            className={`rounded-full cursor-pointer px-4 py-2 text-sm font-medium transition ${
              formType === tab.id
                ? "bg-black text-white"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {submitError ? (
          <p className="rounded-xl border border-brand-red/40 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
            {submitError}
          </p>
        ) : null}
        {formType === "inquiry" ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                id="fullName"
                required
                registration={register("fullName")}
                error={errors.fullName?.message}
                placeholder="Jane Doe"
              />
              <Field
                label="Email"
                id="email"
                type="email"
                required
                registration={register("email")}
                error={errors.email?.message}
                placeholder="jane@company.com"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Phone"
                id="phone"
                type="tel"
                registration={register("phone")}
                error={errors.phone?.message}
                placeholder="555 123 4567"
              />
              <Field
                label="Company"
                id="company"
                registration={register("company")}
                error={errors.company?.message}
                placeholder="Company Inc."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
                <span className="text-brand-red"> *</span>
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="How can we help?"
                {...register("message")}
                className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
              />
              <FieldError message={errors.message?.message} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-brand cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </>
        ) : (
          <>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full Name"
            id="fullName"
            required
            registration={register("fullName")}
            error={errors.fullName?.message}
            placeholder="Jane Doe"
          />
          <Field
            label="Company"
            id="company"
            registration={register("company")}
            error={errors.company?.message}
            placeholder="Company Inc."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Email"
            id="email"
            type="email"
            required
            registration={register("email")}
            error={errors.email?.message}
            placeholder="jane@company.com"
          />

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
              <span className="text-brand-red"> *</span>
            </label>
            <div className="mt-2 flex gap-2">
              <select
                aria-label="Country dial code"
                {...register("country")}
                className="w-24 shrink-0 rounded-xl border border-border bg-white px-2 py-3 text-sm outline-none focus:border-black"
                defaultValue={"In"}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code} title={c.label}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="5551234567"
                {...register("phone")}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:border-black ${
                  errors.phone ? "border-brand-red" : "border-border"
                }`}
              />
            </div>
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Project Name"
            id="projectName"
            registration={register("projectName")}
            error={errors.projectName?.message}
          />
          <Field
            label="Project Location"
            id="projectLocation"
            registration={register("projectLocation")}
            error={errors.projectLocation?.message}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sector" className="block text-sm font-medium">
              Sector
              <span className="text-brand-red"> *</span>
            </label>
            <select
              id="sector"
              {...register("sector")}
              defaultValue=""
              className={inputClass(!!errors.sector)}
            >
              <option value="" disabled>
                Select a sector
              </option>
              {contactSectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            <FieldError message={errors.sector?.message} />
          </div>

          <Field
            label="Timeline"
            id="timeline"
            type="Date"
            registration={register("timeline")}
            error={errors.timeline?.message}
            min={todayISO()}
          />
        </div>

        <Field
          label="Budget (Optional)"
          id="budget"
          registration={register("budget")}
          error={errors.budget?.message}
          placeholder="e.g. $50,000–$100,000"
        />

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
            <input
              type="file"
              className="sr-only"
              multiple
              accept={ACCEPT_ATTR}
              {...filesRegister}
              ref={(el) => {
                filesFieldRef(el);
                fileInputRef.current = el;
              }}
            />
          </label>
          <FieldError message={errors.files?.message as string | undefined} />

          {selectedFiles && selectedFiles.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {Array.from(selectedFiles).map((file) => (
                <li
                  key={`${file.name}-${file.size}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-3 py-2 text-sm"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={clearFiles}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:underline"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove all files
                </button>
              </li>
            </ul>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Scope, sector, key milestones, or anything else we should know."
            {...register("message")}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
          />
          <FieldError message={errors.message?.message} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full cursor-pointer bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream transition disabled:cursor-not-allowed disabled:opacity-60 w-full hover:bg-brand"
        >
          {isSubmitting ? "Submitting…" : "Submit Request"}
        </button>

        <div className="rounded-md border border-brand/30 bg-brand/5 p-4 text-sm text-foreground/80">
          <p className="font-semibold text-foreground">Having trouble uploading drawings?</p>
          <p className="mt-1 break-words leading-relaxed">
            Large or multi-file drawing sets can occasionally get stuck in the uploader. If that
            happens — or if you&apos;d simply prefer to send them directly — please email your
            project files to{" "}
            <a
              href="mailto:estimating@sandhawoodworks.ca?subject=Project%20Drawings"
              className="font-semibold break-all text-brand underline underline-offset-2 hover:text-foreground"
            >
              estimating@sandhawoodworks.ca
            </a>{" "}
            after submitting this form. Include your project name so our team can match it to your
            request.
          </p>
        </div>
          </>
        )}
      </form>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:border-black ${
    hasError ? "border-brand-red" : "border-border"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-brand-red">{message}</p>;
}

function Field({
  label,
  id,
  type = "text",
  required = false,
  registration,
  error,
  placeholder,
  min,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
  error?: string;
  placeholder?: string;
  min?: string;
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
        placeholder={placeholder}
        min={min}
        {...registration}
        className={inputClass(!!error)}
      />
      <FieldError message={error} />
    </div>
  );
}
