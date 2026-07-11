"use client";

import { useEffect } from "react";

/**
 * Overrides settings on the embedded SociableKIT LinkedIn posts widget —
 * by default: 2 columns (instead of its 3-wide default) and 8 visible posts.
 *
 * These are server-driven settings, and the widget lays posts out with a
 * JS-computed masonry (absolute positioning), so CSS alone can't safely
 * reflow it. Instead we use the widget's own live-preview hook: dispatching
 * a `previewDataUpdated` event merges our settings into its state and makes
 * it re-render through its native layout engine — which then stays correct
 * on resize and drives its own "Load more" button.
 */
export function LinkedInPostsColumns({
  columns = 2,
  posts = 8,
  selector = ".sk-ww-linkedin-page-post",
}: {
  columns?: number;
  posts?: number;
  selector?: string;
}) {
  useEffect(() => {
    let done = false;

    const apply = () => {
      if (done) return;
      const widget = document.querySelector(selector);
      // Wait until the widget has actually rendered posts, otherwise its
      // preview listener isn't attached yet and the event is a no-op.
      if (!widget || !widget.querySelector(".sk-post-item")) return;
      done = true;
      window.dispatchEvent(
        new CustomEvent("previewDataUpdated", {
          detail: {
            previewData: {
              settings: { column_count: columns, post_count: posts },
            },
          },
        }),
      );
    };

    const interval = window.setInterval(() => {
      apply();
      if (done) window.clearInterval(interval);
    }, 400);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 30000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [columns, posts, selector]);

  return null;
}
