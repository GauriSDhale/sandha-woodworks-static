"use client";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Upload, X } from "lucide-react";
import { openPositions } from "@/lib/constants/about";
import { sendEmail } from "@/lib/email";

const roleOptions = openPositions.map((position) => position.title);
const experienceOptions = ["0–1 year", "1–3 years", "3–5 years", "5+ years"];
const authorizationOptions = [
  "Canadian citizen",
  "Permanent resident",
  "Work permit holder",
  "Open to sponsorship",
  "Prefer not to say",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const SUPPORTING_EXTENSIONS = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const optionalUrl = z.union([z.literal(""), z.url("Enter a valid URL")]).optional();

function fileExt(name: string) {
  return `.${name.split(".").pop()?.toLowerCase() ?? ""}`;
}

const careersSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required").max(80),
    email: z.email("Enter a valid email address"),
    phone: z.string().trim().min(7, "Enter a valid phone number"),
    location: z.string().trim().min(1, "City / province is required"),
    position: z.string().min(1, "Please select a position"),
    experience: z.string().min(1, "Please select your experience"),
    currentRole: z.string().trim().min(1, "Current or most recent role is required"),
    currentCompany: optionalText(100),
    linkedin: optionalUrl,
    portfolio: optionalUrl,
    workAuthorization: z.string().min(1, "Please select your work authorization"),
    startDate: z.string().optional(),
    coverNote: optionalText(2000),
    resume: z.any(),
    supportingDocuments: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Resume — required, single file, type + size checked.
    const resume = data.resume as FileList | undefined;
    if (!resume || resume.length === 0) {
      ctx.addIssue({ code: "custom", path: ["resume"], message: "Resume is required" });
    } else {
      const file = resume[0];
      if (!RESUME_EXTENSIONS.includes(fileExt(file.name))) {
        ctx.addIssue({
          code: "custom",
          path: ["resume"],
          message: "Resume must be a PDF, DOC or DOCX",
        });
      }
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({ code: "custom", path: ["resume"], message: "Resume is larger than 10 MB" });
      }
    }

    // Supporting documents — optional, but validate each if provided.
    const docs = data.supportingDocuments as FileList | undefined;
    if (docs && docs.length > 0) {
      Array.from(docs).forEach((file) => {
        if (!SUPPORTING_EXTENSIONS.includes(fileExt(file.name))) {
          ctx.addIssue({
            code: "custom",
            path: ["supportingDocuments"],
            message: `${file.name}: unsupported file type`,
          });
        }
        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: "custom",
            path: ["supportingDocuments"],
            message: `${file.name} is larger than 10 MB`,
          });
        }
      });
    }
  });

type CareersFormValues = z.infer<typeof careersSchema>;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CareersApplicationForm() {
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const docsInputRef = useRef<HTMLInputElement | null>(null);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareersFormValues>({
    resolver: zodResolver(careersSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      position: "",
      experience: "",
      currentRole: "",
      currentCompany: "",
      linkedin: "",
      portfolio: "",
      workAuthorization: "",
      startDate: "",
      coverNote: "",
    },
  });

  const selectedResume = useWatch({ control, name: "resume" }) as FileList | undefined;
  const selectedDocs = useWatch({ control, name: "supportingDocuments" }) as FileList | undefined;

  const { ref: resumeFieldRef, ...resumeRegister } = register("resume");
  const { ref: docsFieldRef, ...docsRegister } = register("supportingDocuments");

  function clearResume() {
    if (resumeInputRef.current) resumeInputRef.current.value = "";
    setValue("resume", undefined, { shouldValidate: true });
  }

  function clearDocs() {
    if (docsInputRef.current) docsInputRef.current.value = "";
    setValue("supportingDocuments", undefined, { shouldValidate: true });
  }

  async function onSubmit(values: CareersFormValues) {
    setSubmitError(null);

    const resume = values.resume as FileList | undefined;
    const docs = values.supportingDocuments as FileList | undefined;
    const attachmentNames = [
      ...(resume?.[0] ? [resume[0].name] : []),
      ...(docs ? Array.from(docs).map((file) => file.name) : []),
    ];

    // EmailJS's free tier can't carry file attachments, so we send the full
    // application as text and list the files the applicant selected. They can
    // email the actual documents directly.
    const details = [
      `Position Applying For: ${values.position}`,
      `Years of Experience: ${values.experience}`,
      `City / Province: ${values.location}`,
      `Current / Recent Role: ${values.currentRole}`,
      values.currentCompany && `Current / Recent Company: ${values.currentCompany}`,
      values.linkedin && `LinkedIn: ${values.linkedin}`,
      values.portfolio && `Portfolio: ${values.portfolio}`,
      `Work Authorization: ${values.workAuthorization}`,
      values.startDate && `Preferred Start Date: ${values.startDate}`,
      values.coverNote && `\nCover Note:\n${values.coverNote}`,
      attachmentNames.length
        ? `\nFiles selected (please email these directly): ${attachmentNames.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const data = {
      formType: "Career Application",
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      company: values.currentCompany || "—",
      projectName: values.position,
      projectLocation: values.location,
      sector: "Careers",
      timeline: values.startDate || "—",
      budget: "—",
      message: details,
    };

    const result = await sendEmail(data);
    if (result.success) {
      setSent(true);
      reset();
    } else {
      setSubmitError(result.message ?? "Something went wrong. Please try again.");
    }
  }

  if (sent) {
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
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:bg-background"
        >
          Submit another application
        </button>
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Full name"
            id="fullName"
            required
            registration={register("fullName")}
            error={errors.fullName?.message}
          />
          <Field
            label="Email address"
            id="email"
            type="email"
            required
            registration={register("email")}
            error={errors.email?.message}
          />
          <Field
            label="Phone number"
            id="phone"
            type="tel"
            required
            registration={register("phone")}
            error={errors.phone?.message}
          />
          <Field
            label="City / province"
            id="location"
            required
            registration={register("location")}
            error={errors.location?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Position applying for"
            id="position"
            options={roleOptions}
            required
            registration={register("position")}
            error={errors.position?.message}
          />
          <SelectField
            label="Years of experience"
            id="experience"
            options={experienceOptions}
            required
            registration={register("experience")}
            error={errors.experience?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Current or most recent role"
            id="currentRole"
            required
            registration={register("currentRole")}
            error={errors.currentRole?.message}
          />
          <Field
            label="Current or most recent company"
            id="currentCompany"
            registration={register("currentCompany")}
            error={errors.currentCompany?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="LinkedIn profile"
            id="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/…"
            registration={register("linkedin")}
            error={errors.linkedin?.message}
          />
          <Field
            label="Portfolio / website"
            id="portfolio"
            type="url"
            placeholder="https://…"
            registration={register("portfolio")}
            error={errors.portfolio?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Work authorization"
            id="workAuthorization"
            options={authorizationOptions}
            required
            registration={register("workAuthorization")}
            error={errors.workAuthorization?.message}
          />
          <Field
            label="Preferred start date"
            id="startDate"
            type="date"
            registration={register("startDate")}
            error={errors.startDate?.message}
          />
        </div>

        <div>
          <label htmlFor="coverNote" className="block text-sm font-medium">
            Cover note
          </label>
          <textarea
            id="coverNote"
            rows={5}
            {...register("coverNote")}
            className="mt-2 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="Tell us a little about yourself and why you'd like to join Sandha Woodworks."
          />
          <FieldError message={errors.coverNote?.message} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Resume — required */}
          <div>
            <label htmlFor="resume" className="block text-sm font-medium">
              Resume
              <span className="ml-1 text-brand-red">*</span>
            </label>
            <label
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted px-6 py-8 text-center transition hover:border-black/20 ${
                errors.resume ? "border-brand-red" : "border-border"
              }`}
            >
              <Upload className="h-7 w-7 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">Upload your resume</span>
              <span className="mt-1 text-xs text-muted-foreground">PDF, DOC, or DOCX up to 10 MB</span>
              <input
                id="resume"
                type="file"
                className="sr-only"
                accept={RESUME_EXTENSIONS.join(",")}
                {...resumeRegister}
                ref={(el) => {
                  resumeFieldRef(el);
                  resumeInputRef.current = el;
                }}
              />
            </label>
            <FieldError message={errors.resume?.message as string | undefined} />
            <FileList files={selectedResume} onClear={clearResume} />
          </div>

          {/* Supporting documents — optional */}
          <div>
            <label htmlFor="supportingDocuments" className="block text-sm font-medium">
              Supporting documents
            </label>
            <label
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted px-6 py-8 text-center transition hover:border-black/20 ${
                errors.supportingDocuments ? "border-brand-red" : "border-border"
              }`}
            >
              <Upload className="h-7 w-7 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">Add portfolio or certificates</span>
              <span className="mt-1 text-xs text-muted-foreground">Optional documents or work samples</span>
              <input
                id="supportingDocuments"
                type="file"
                className="sr-only"
                multiple
                accept={SUPPORTING_EXTENSIONS.join(",")}
                {...docsRegister}
                ref={(el) => {
                  docsFieldRef(el);
                  docsInputRef.current = el;
                }}
              />
            </label>
            <FieldError message={errors.supportingDocuments?.message as string | undefined} />
            <FileList files={selectedDocs} onClear={clearDocs} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
          By submitting this form, you consent to our team reviewing your application. We will be in
          touch if your experience aligns with an opening.
        </div>

        {submitError ? (
          <p className="rounded-xl border border-brand-red/40 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream transition disabled:cursor-not-allowed disabled:opacity-60 w-full cursor-pointer hover:bg-brand"
        >
          {isSubmitting ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </div>
  );
}

function FileList({ files, onClear }: { files?: FileList; onClear: () => void }) {
  if (!files || files.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2">
      {Array.from(files).map((file) => (
        <li
          key={`${file.name}-${file.size}`}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-3 py-2 text-sm"
        >
          <span className="truncate">{file.name}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(file.size)}</span>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:underline"
        >
          <X className="h-3.5 w-3.5" />
          Remove
        </button>
      </li>
    </ul>
  );
}

function inputClass(hasError: boolean) {
  return `mt-2 w-full rounded-2xl border bg-muted px-4 py-3 text-sm outline-none focus:border-black ${
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
  placeholder,
  registration,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
  error?: string;
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
        placeholder={placeholder}
        {...registration}
        className={inputClass(!!error)}
      />
      <FieldError message={error} />
    </div>
  );
}

function SelectField({
  label,
  id,
  options,
  required = false,
  registration,
  error,
}: {
  label: string;
  id: string;
  options: string[];
  required?: boolean;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? <span className="ml-1 text-brand-red">*</span> : null}
      </label>
      <select id={id} {...registration} defaultValue="" className={inputClass(!!error)}>
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}
