"use client";

import { pdf } from "@react-pdf/renderer/lib/react-pdf.browser";
import { ArrowLeft, Download, Printer, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubSectorStatementDoc } from "@/components/capability-pdf/SubSectorStatementDoc";
import {
  getLocalizedStatement,
  getPdfUiCopy,
} from "@/lib/capability-pdf/localize";
import type { SubSectorStatementMeta } from "@/lib/constants/sub-sector-statements";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

interface CapabilityPdfViewerProps {
  sub: SubSectorStatementMeta;
}

export function CapabilityPdfViewer({ sub }: CapabilityPdfViewerProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation("capabilityPdf");
  const { t: tDetails } = useTranslation("capabilityPdfDetails");
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const localized = useMemo(
    () => getLocalizedStatement(sub, tDetails),
    [sub, tDetails, i18n.language],
  );
  const ui = useMemo(
    () => getPdfUiCopy(t, localized.name),
    [t, localized.name, i18n.language],
  );

  const filename = useMemo(
    () =>
      `${sub.slug}-capability-statement.pdf`.replace(/[^a-z0-9.-]+/gi, "-").toLowerCase(),
    [sub.slug],
  );

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    async function generate() {
      try {
        setReady(false);
        setError(null);
        const { getStatementImagePaths, loadImagesAsDataUrls } = await import(
          "@/lib/capability-pdf/images"
        );
        const paths = getStatementImagePaths(sub);
        const images = await loadImagesAsDataUrls(paths);
        if (cancelled) return;

        const blob = await pdf(
          <SubSectorStatementDoc sub={localized} ui={ui} images={images} />,
        ).toBlob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
        setReady(true);
      } catch (err) {
        console.error("Capability PDF generation failed:", err);
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : typeof err === "string"
                ? err
                : "PDF generation failed";
          setError(message);
        }
      }
    }

    void generate();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [sub, localized, ui]);

  function handleClose() {
    if (window.history.length > 1) router.back();
    else router.push("/sectors");
  }

  function handleDownload() {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handlePrint() {
    if (!blobUrl) return;
    const frame = window.open(blobUrl);
    if (!frame) return;
    frame.addEventListener("load", () => {
      try {
        frame.focus();
        frame.print();
      } catch {
        /* ignore */
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[200] flex h-screen w-screen flex-col bg-warm-black text-cream">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/10 bg-warm-black/95 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-cream">
            <span className="font-display text-sm font-bold">S</span>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-brand">
              {siteConfig.name}
            </p>
            <h1 className="truncate font-display text-sm text-cream sm:text-base">
              {localized.name} {t("viewer.titleSuffix")}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            disabled={!ready}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-brand hover:text-brand",
              "disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            <Printer className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t("viewer.print")}</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!ready}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-warm-black",
              "disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            <Download className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t("viewer.download")}</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-brand hover:text-brand"
          >
            <X className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t("viewer.close")}</span>
          </button>
        </div>
      </header>

      <main className="relative flex-1 overflow-auto bg-neutral-900 px-4 py-6 sm:px-8">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-display text-xl text-cream">{t("viewer.errorTitle")}</p>
            <p className="mt-3 max-w-md text-sm text-cream/70">{error}</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-8 inline-flex items-center gap-2 text-sm text-brand hover:text-brand-light"
            >
              <ArrowLeft className="size-4" /> {t("viewer.goBack")}
            </button>
          </div>
        ) : !ready || !blobUrl ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-cream/20 border-t-brand" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
                {t("viewer.preparingEyebrow")}
              </p>
              <p className="mt-2 text-xs text-cream/60">{t("viewer.preparingHint")}</p>
            </div>
          </div>
        ) : (
          <iframe
            title={t("viewer.iframeTitle", { name: localized.name })}
            src={`${blobUrl}#navpanes=0&view=FitH`}
            className="mx-auto h-full min-h-[70vh] w-full max-w-5xl rounded-sm bg-white shadow-2xl"
          />
        )}
      </main>
    </div>
  );
}
