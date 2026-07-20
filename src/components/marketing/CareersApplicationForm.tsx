"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CheckCircle2, Upload, X } from "lucide-react";
import { openPositionIds } from "@/lib/constants/about";
import { sendEmail } from "@/lib/email";
import i18n from "@/lib/i18n/i18n";

const experienceIds = ["0-1", "1-3", "3-5", "5plus"] as const;
const authorizationIds = [
  "citizen",
  "pr",
  "workPermit",
  "sponsorship",
  "preferNot",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const SUPPORTING_EXTENSIONS = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

function fileExt(name: string) {
  return `.${name.split(".").pop()?.toLowerCase() ?? ""}`;
}

type CareersFormValues = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  currentRole: string;
  currentCompany?: string;
  linkedin?: string;
  portfolio?: string;
  workAuthorization: string;
  startDate?: string;
  coverNote?: string;
  resume?: FileList;
  supportingDocuments?: FileList;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CareersApplicationForm() {
  const { t, i18n: i18nInstance } = useTranslation("careers");
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const docsInputRef = useRef<HTMLInputElement | null>(null);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resolver = useMemo(() => {
    const optionalUrl = z
      .union([z.literal(""), z.url(t("form.errors.urlInvalid"))])
      .optional();

    const schema = z
      .object({
        fullName: z.string().trim().min(1, t("form.errors.fullNameRequired")).max(80),
        email: z.email(t("form.errors.emailInvalid")),
        phone: z.string().trim().min(7, t("form.errors.phoneInvalid")),
        location: z.string().trim().min(1, t("form.errors.locationRequired")),
        position: z.string().min(1, t("form.errors.positionRequired")),
        experience: z.string().min(1, t("form.errors.experienceRequired")),
        currentRole: z.string().trim().min(1, t("form.errors.currentRoleRequired")),
        currentCompany: optionalText(100),
        linkedin: optionalUrl,
        portfolio: optionalUrl,
        workAuthorization: z.string().min(1, t("form.errors.authorizationRequired")),
        startDate: z.string().optional(),
        coverNote: optionalText(2000),
        resume: z.any(),
        supportingDocuments: z.any().optional(),
      })
      .superRefine((data, ctx) => {
        const resume = data.resume as FileList | undefined;
        if (!resume || resume.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["resume"],
            message: t("form.errors.resumeRequired"),
          });
        } else {
          const file = resume[0];
          if (!RESUME_EXTENSIONS.includes(fileExt(file.name))) {
            ctx.addIssue({
              code: "custom",
              path: ["resume"],
              message: t("form.errors.resumeType"),
            });
          }
          if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
              code: "custom",
              path: ["resume"],
              message: t("form.errors.resumeSize"),
            });
          }
        }

        const docs = data.supportingDocuments as FileList | undefined;
        if (docs && docs.length > 0) {
          Array.from(docs).forEach((file) => {
            if (!SUPPORTING_EXTENSIONS.includes(fileExt(file.name))) {
              ctx.addIssue({
                code: "custom",
                path: ["supportingDocuments"],
                message: t("form.errors.docType", { name: file.name }),
              });
            }
            if (file.size > MAX_FILE_SIZE) {
              ctx.addIssue({
                code: "custom",
                path: ["supportingDocuments"],
                message: t("form.errors.docSize", { name: file.name }),
              });
            }
          });
        }
      });

    return zodResolver(schema) as Resolver<CareersFormValues>;
  }, [t, i18nInstance.language]);

  // Keep the latest locale-aware resolver so language switches revalidate with new copy.
  const resolverRef = useRef(resolver);
  resolverRef.current = resolver;
  const stableResolver = useRef<Resolver<CareersFormValues>>((values, context, options) =>
    resolverRef.current(values, context, options),
  ).current;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CareersFormValues>({
    resolver: stableResolver,
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

  // Re-run validation for fields that already show errors so messages match EN/FR.
  useEffect(() => {
    const names = Object.keys(errors) as (keyof CareersFormValues)[];
    if (names.length === 0) return;
    void trigger(names);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only refresh existing errors on language change
  }, [i18nInstance.language, trigger]);

  const selectedResume = useWatch({ control, name: "resume" }) as FileList | undefined;
  const selectedDocs = useWatch({ control, name: "supportingDocuments" }) as
    | FileList
    | undefined;

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
    const tEn = i18n.getFixedT("en", "careers");
    const positionLabel = tEn(`positions.items.${values.position}.title`);
    const experienceLabel = tEn(`form.experience.${values.experience}`);
    const authorizationLabel = tEn(`form.authorization.${values.workAuthorization}`);

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
      `Position Applying For: ${positionLabel}`,
      `Years of Experience: ${experienceLabel}`,
      `City / Province: ${values.location}`,
      `Current / Recent Role: ${values.currentRole}`,
      values.currentCompany && `Current / Recent Company: ${values.currentCompany}`,
      values.linkedin && `LinkedIn: ${values.linkedin}`,
      values.portfolio && `Portfolio: ${values.portfolio}`,
      `Work Authorization: ${authorizationLabel}`,
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
      projectName: positionLabel,
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
      setSubmitError(result.message ?? t("form.errors.generic"));
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-muted p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold">{t("form.success.title")}</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t("form.success.body")}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:bg-background"
        >
          {t("form.actions.submitAnother")}
        </button>
      </div>
    );
  }

  const positionOptions = openPositionIds.map((id) => ({
    value: id,
    label: t(`positions.items.${id}.title`),
  }));
  const experienceOptions = experienceIds.map((id) => ({
    value: id,
    label: t(`form.experience.${id}`),
  }));
  const authorizationOptions = authorizationIds.map((id) => ({
    value: id,
    label: t(`form.authorization.${id}`),
  }));

  return (
    <div
      id="careers-application-form"
      className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-3">
        <p className="type-eyebrow text-brand">
          {t("form.eyebrow")}
        </p>
        <h2 className="font-display text-3xl font-semibold">{t("form.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{t("form.intro")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label={t("form.fields.fullName")}
            id="fullName"
            required
            registration={register("fullName")}
            error={errors.fullName?.message}
          />
          <Field
            label={t("form.fields.email")}
            id="email"
            type="email"
            required
            registration={register("email")}
            error={errors.email?.message}
          />
          <Field
            label={t("form.fields.phone")}
            id="phone"
            type="tel"
            required
            registration={register("phone")}
            error={errors.phone?.message}
          />
          <Field
            label={t("form.fields.location")}
            id="location"
            required
            registration={register("location")}
            error={errors.location?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label={t("form.fields.position")}
            id="position"
            options={positionOptions}
            placeholder={t("form.selectOne")}
            required
            registration={register("position")}
            error={errors.position?.message}
          />
          <SelectField
            label={t("form.fields.experience")}
            id="experience"
            options={experienceOptions}
            placeholder={t("form.selectOne")}
            required
            registration={register("experience")}
            error={errors.experience?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label={t("form.fields.currentRole")}
            id="currentRole"
            required
            registration={register("currentRole")}
            error={errors.currentRole?.message}
          />
          <Field
            label={t("form.fields.currentCompany")}
            id="currentCompany"
            registration={register("currentCompany")}
            error={errors.currentCompany?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label={t("form.fields.linkedin")}
            id="linkedin"
            type="url"
            placeholder={t("form.placeholders.linkedin")}
            registration={register("linkedin")}
            error={errors.linkedin?.message}
          />
          <Field
            label={t("form.fields.portfolio")}
            id="portfolio"
            type="url"
            placeholder={t("form.placeholders.portfolio")}
            registration={register("portfolio")}
            error={errors.portfolio?.message}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label={t("form.fields.workAuthorization")}
            id="workAuthorization"
            options={authorizationOptions}
            placeholder={t("form.selectOne")}
            required
            registration={register("workAuthorization")}
            error={errors.workAuthorization?.message}
          />
          <Field
            label={t("form.fields.startDate")}
            id="startDate"
            type="date"
            registration={register("startDate")}
            error={errors.startDate?.message}
          />
        </div>

        <div>
          <label htmlFor="coverNote" className="block text-sm font-medium">
            {t("form.fields.coverNote")}
          </label>
          <textarea
            id="coverNote"
            rows={5}
            {...register("coverNote")}
            className="mt-2 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-black"
            placeholder={t("form.placeholders.coverNote")}
          />
          <FieldError message={errors.coverNote?.message} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="resume" className="block text-sm font-medium">
              {t("form.fields.resume")}
              <span className="ml-1 text-brand-red">*</span>
            </label>
            <label
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted px-6 py-8 text-center transition hover:border-black/20 ${
                errors.resume ? "border-brand-red" : "border-border"
              }`}
            >
              <Upload className="h-7 w-7 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">{t("form.upload.resume")}</span>
              <span className="mt-1 text-xs text-muted-foreground">
                {t("form.upload.resumeHint")}
              </span>
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
            <FileList
              files={selectedResume}
              onClear={clearResume}
              removeLabel={t("form.upload.remove")}
            />
          </div>

          <div>
            <label htmlFor="supportingDocuments" className="block text-sm font-medium">
              {t("form.fields.supportingDocuments")}
            </label>
            <label
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted px-6 py-8 text-center transition hover:border-black/20 ${
                errors.supportingDocuments ? "border-brand-red" : "border-border"
              }`}
            >
              <Upload className="h-7 w-7 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium">{t("form.upload.docs")}</span>
              <span className="mt-1 text-xs text-muted-foreground">
                {t("form.upload.docsHint")}
              </span>
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
            <FileList
              files={selectedDocs}
              onClear={clearDocs}
              removeLabel={t("form.upload.remove")}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
          {t("form.consent")}
        </div>

        {submitError ? (
          <p className="rounded-xl border border-brand-red/40 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t("form.actions.submitting") : t("form.actions.submit")}
        </button>
      </form>
    </div>
  );
}

function FileList({
  files,
  onClear,
  removeLabel,
}: {
  files?: FileList;
  onClear: () => void;
  removeLabel: string;
}) {
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
          {removeLabel}
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
  placeholder,
  required = false,
  registration,
  error,
}: {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
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
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}
