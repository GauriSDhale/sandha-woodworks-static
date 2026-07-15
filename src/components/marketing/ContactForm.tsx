"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Upload, X } from "lucide-react";
import { contactSectorIds } from "@/lib/constants/about";
import { siteConfig } from "@/lib/constants/site";
import { sendEmail } from "@/lib/email";
import i18n from "@/lib/i18n/i18n";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_EXTENSIONS = [".pdf", ".dwg", ".png", ".jpg", ".jpeg"];
const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(",");

/** Country dial codes for the phone field. Values are ISO codes (unique). */
const countryCodes = [
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "IN", dial: "+91", flag: "🇮🇳" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
  { code: "AE", dial: "+971", flag: "🇦🇪" },
  { code: "DE", dial: "+49", flag: "🇩🇪" },
  { code: "FR", dial: "+33", flag: "🇫🇷" },
  { code: "MX", dial: "+52", flag: "🇲🇽" },
  { code: "SG", dial: "+65", flag: "🇸🇬" },
] as const;

const todayISO = () => new Date().toISOString().slice(0, 10);

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

type ContactFormValues = {
  formType: "quote" | "inquiry";
  fullName: string;
  company?: string;
  email: string;
  country: string;
  phone?: string;
  projectName?: string;
  projectLocation?: string;
  sector?: (typeof contactSectorIds)[number];
  timeline?: string;
  budget?: string;
  message?: string;
  files?: FileList;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactForm() {
  const { t, i18n: i18nInstance } = useTranslation("contact");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const quoteResolver = useMemo(() => {
    const schema = z
      .object({
        formType: z.enum(["quote", "inquiry"]),
        fullName: z
          .string()
          .trim()
          .min(3, t("form.errors.fullNameMin"))
          .max(50, t("form.errors.fullNameMax")),
        company: optionalText(100),
        email: z.email(t("form.errors.emailInvalid")),
        country: z.enum(countryCodes.map((c) => c.code) as [string, ...string[]]),
        phone: z
          .string()
          .trim()
          .min(1, t("form.errors.phoneRequired"))
          .regex(/^\d{7,15}$/, t("form.errors.phoneInvalid")),
        projectName: optionalText(120),
        projectLocation: optionalText(120),
        sector: z.enum(contactSectorIds, { message: t("form.errors.sectorRequired") }),
        timeline: z
          .string()
          .optional()
          .refine((v) => !v || !Number.isNaN(Date.parse(v)), t("form.errors.timelineInvalid"))
          .refine((v) => !v || v >= todayISO(), t("form.errors.timelinePast")),
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
              message: t("form.errors.fileType", { name: file.name }),
            });
          }
          if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
              code: "custom",
              path: ["files"],
              message: t("form.errors.fileSize", { name: file.name }),
            });
          }
        });
      });

    return zodResolver(schema) as Resolver<ContactFormValues>;
  }, [t, i18nInstance.language]);

  const inquiryResolver = useMemo(() => {
    const schema = z.object({
      formType: z.enum(["quote", "inquiry"]),
      fullName: z.string().trim().min(1, t("form.errors.fullNameRequired")),
      email: z.email(t("form.errors.emailInvalid")),
      message: z.string().trim().min(1, t("form.errors.messageRequired")),
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

    return zodResolver(schema) as unknown as Resolver<ContactFormValues>;
  }, [t, i18nInstance.language]);

  // Keep resolvers in refs so react-hook-form always validates with the active language.
  const quoteResolverRef = useRef(quoteResolver);
  const inquiryResolverRef = useRef(inquiryResolver);
  quoteResolverRef.current = quoteResolver;
  inquiryResolverRef.current = inquiryResolver;

  const contactResolver = useRef<Resolver<ContactFormValues>>((values, context, options) =>
    (values.formType === "inquiry" ? inquiryResolverRef.current : quoteResolverRef.current)(
      values,
      context,
      options,
    ),
  ).current;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: contactResolver,
    mode: "onBlur",
    defaultValues: {
      formType: "quote",
      fullName: "",
      company: "",
      email: "",
      country: "CA",
      phone: "",
      projectName: "",
      projectLocation: "",
      sector: undefined,
      timeline: "",
      budget: "",
      message: "",
    },
  });

  // Re-run validation for fields that already show errors so messages match EN/FR.
  useEffect(() => {
    const names = Object.keys(errors) as (keyof ContactFormValues)[];
    if (names.length === 0) return;
    void trigger(names);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only refresh existing errors on language change
  }, [i18nInstance.language, trigger]);

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
    const tEn = i18n.getFixedT("en", "contact");
    const sectorLabel = values.sector ? tEn(`form.sectors.${values.sector}`) : "";

    // EmailJS's free tier can't carry file attachments, so we list the files the
    // sender selected and invite them to email the actual documents directly.
    const attachmentNames = values.files ? Array.from(values.files).map((file) => file.name) : [];
    const message = [
      values.message || "—",
      attachmentNames.length
        ? `\nFiles selected (please email these directly): ${attachmentNames.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const data = {
      formType: isInquiry ? "General Inquiry" : "Request Quote",
      fullName: values.fullName,
      email: values.email,
      phone: country ? `${country.dial} ${values.phone}` : values.phone,
      company: values.company || "—",
      projectName: values.projectName || "—",
      projectLocation: values.projectLocation || "—",
      sector: sectorLabel || "—",
      timeline: values.timeline || "—",
      budget: values.budget || "—",
      message,
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
      <div className="rounded-2xl border border-border bg-muted p-8 text-center">
        <p className="text-lg font-semibold">{t("form.success.title")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("form.success.body")}</p>
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

  const tabs = [
    { id: "quote" as const, label: t("form.tabs.quote") },
    { id: "inquiry" as const, label: t("form.tabs.inquiry") },
  ];

  return (
    <div>
      <div className="mb-6 inline-flex rounded-full border border-border bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setValue("formType", tab.id);
              clearErrors();
            }}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
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
                label={t("form.fields.fullName")}
                id="fullName"
                required
                registration={register("fullName")}
                error={errors.fullName?.message}
                placeholder={t("form.placeholders.fullName")}
              />
              <Field
                label={t("form.fields.email")}
                id="email"
                type="email"
                required
                registration={register("email")}
                error={errors.email?.message}
                placeholder={t("form.placeholders.email")}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("form.fields.phone")}
                id="phone"
                type="tel"
                registration={register("phone")}
                error={errors.phone?.message}
                placeholder={t("form.placeholders.phone")}
              />
              <Field
                label={t("form.fields.company")}
                id="company"
                registration={register("company")}
                error={errors.company?.message}
                placeholder={t("form.placeholders.company")}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                {t("form.fields.message")}
                <span className="text-brand-red"> *</span>
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder={t("form.placeholders.inquiryMessage")}
                {...register("message")}
                className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
              />
              <FieldError message={errors.message?.message} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-full bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t("form.actions.sending") : t("form.actions.sendMessage")}
            </button>
          </>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("form.fields.fullName")}
                id="fullName"
                required
                registration={register("fullName")}
                error={errors.fullName?.message}
                placeholder={t("form.placeholders.fullName")}
              />
              <Field
                label={t("form.fields.company")}
                id="company"
                registration={register("company")}
                error={errors.company?.message}
                placeholder={t("form.placeholders.company")}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("form.fields.email")}
                id="email"
                type="email"
                required
                registration={register("email")}
                error={errors.email?.message}
                placeholder={t("form.placeholders.email")}
              />

              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  {t("form.fields.phone")}
                  <span className="text-brand-red"> *</span>
                </label>
                <div className="mt-2 flex gap-2">
                  <select
                    aria-label={t("form.fields.countryDial")}
                    {...register("country")}
                    className="w-24 shrink-0 rounded-xl border border-border bg-white px-2 py-3 text-sm outline-none focus:border-black"
                    defaultValue="CA"
                  >
                    {countryCodes.map((c) => (
                      <option
                        key={c.code}
                        value={c.code}
                        title={t(`form.countries.${c.code}`)}
                      >
                        {c.flag} {c.dial}
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder={t("form.placeholders.phoneDigits")}
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
                label={t("form.fields.projectName")}
                id="projectName"
                registration={register("projectName")}
                error={errors.projectName?.message}
              />
              <Field
                label={t("form.fields.projectLocation")}
                id="projectLocation"
                registration={register("projectLocation")}
                error={errors.projectLocation?.message}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="sector" className="block text-sm font-medium">
                  {t("form.fields.sector")}
                  <span className="text-brand-red"> *</span>
                </label>
                <select
                  id="sector"
                  {...register("sector")}
                  defaultValue=""
                  className={inputClass(!!errors.sector)}
                >
                  <option value="" disabled>
                    {t("form.fields.sectorPlaceholder")}
                  </option>
                  {contactSectorIds.map((sector) => (
                    <option key={sector} value={sector}>
                      {t(`form.sectors.${sector}`)}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.sector?.message} />
              </div>

              <Field
                label={t("form.fields.timeline")}
                id="timeline"
                type="Date"
                registration={register("timeline")}
                error={errors.timeline?.message}
                min={todayISO()}
              />
            </div>

            <Field
              label={t("form.fields.budget")}
              id="budget"
              registration={register("budget")}
              error={errors.budget?.message}
              placeholder={t("form.placeholders.budget")}
            />

            <div>
              <label className="block text-sm font-medium">
                {t("form.fields.files")}
                <span className="ml-1 font-normal text-muted-foreground">
                  {t("form.fields.filesHint")}
                </span>
              </label>
              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted px-6 py-10 text-center transition hover:border-black/20">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="mt-3 text-sm font-medium">{t("form.upload.click")}</span>
                <span className="mt-1 text-xs text-muted-foreground">{t("form.upload.hint")}</span>
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
                      {t("form.upload.removeAll")}
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                {t("form.fields.message")}
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder={t("form.placeholders.quoteMessage")}
                {...register("message")}
                className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
              />
              <FieldError message={errors.message?.message} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t("form.actions.submitting") : t("form.actions.submitRequest")}
            </button>

            <div className="rounded-md border border-brand/30 bg-brand/5 p-4 text-sm text-foreground/80">
              <p className="font-semibold text-foreground">{t("form.uploadTip.title")}</p>
              <p className="mt-1 break-words leading-relaxed">
                {t("form.uploadTip.bodyBefore")}{" "}
                <a
                  href={`mailto:${siteConfig.estimatingEmail}?subject=Project%20Drawings`}
                  className="break-all font-semibold text-brand underline underline-offset-2 hover:text-foreground"
                >
                  {siteConfig.estimatingEmail}
                </a>{" "}
                {t("form.uploadTip.bodyAfter")}
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
