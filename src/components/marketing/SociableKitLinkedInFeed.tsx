"use client";

import { useEffect, useRef } from "react";
import { LinkedInPostsColumns } from "@/components/marketing/LinkedInPostsColumns";

const SCRIPT_SRC = "https://widgets.sociablekit.com/linkedin-page-posts/widget.js";
const EMBED_ID = "25695497";
const WIDGET_CLASS = "sk-ww-linkedin-page-post";
const WIDGET_SELECTOR = `.${WIDGET_CLASS}`;

/**
 * SociableKIT's widget.js scans the DOM once when the script evaluates.
 * Next.js App Router soft-navigations remount the empty embed div without
 * re-running that script, so the feed stays blank until a hard refresh.
 * Re-inject the script on every mount so cold loads and client navigations
 * both initialize the feed.
 */
export function SociableKitLinkedInFeed({
  columns = 2,
  posts = 8,
}: {
  columns?: number;
  posts?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    const mount = () => {
      if (cancelled || !containerRef.current) return;

      // Reset any leftover SociableKIT markup from a previous visit in this tab.
      containerRef.current.replaceChildren();
      containerRef.current.className = WIDGET_CLASS;
      containerRef.current.setAttribute("data-embed-id", EMBED_ID);

      document
        .querySelectorAll(
          `script[src*="widgets.sociablekit.com/linkedin-page-posts"]`,
        )
        .forEach((node) => node.remove());

      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.dataset.skLinkedinFeed = "1";
      document.body.appendChild(script);
    };

    // Defer one frame so the embed node is committed before SociableKIT scans.
    const raf = window.requestAnimationFrame(mount);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      script?.remove();
      document
        .querySelectorAll('script[data-sk-linkedin-feed="1"]')
        .forEach((node) => node.remove());
      containerRef.current?.replaceChildren();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={WIDGET_CLASS}
        data-embed-id={EMBED_ID}
      />
      <LinkedInPostsColumns
        columns={columns}
        posts={posts}
        selector={WIDGET_SELECTOR}
      />
    </>
  );
}
