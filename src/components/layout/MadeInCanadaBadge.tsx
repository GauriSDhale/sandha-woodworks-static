import { brandMedia } from "@/lib/constants/media";

export function MadeInCanadaBadge() {
  return (
    <div
      aria-label="Sandha Woodworks — Made in Canada, serving Canada and the United States"
      className="pointer-events-none fixed bottom-3 right-3 z-40 sm:bottom-4 sm:right-4"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-1 rounded-md border border-white/10 bg-surface-dark/90 px-1.5 py-1 shadow-2xl backdrop-blur-md sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2.5">
        <div className="flex items-center gap-1 sm:gap-2">
          <img
            src={brandMedia.canadaFlag}
            alt="Canada"
            className="h-3.5 w-[21px] rounded-[2px] object-cover shadow-sm ring-1 ring-white/10 sm:h-5 sm:w-[30px]"
          />
          <svg
            viewBox="0 0 30 20"
            className="h-3.5 w-[21px] rounded-[2px] shadow-sm ring-1 ring-white/10 sm:h-5 sm:w-[30px]"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="United States"
          >
            <rect width="30" height="20" fill="#fff" />
            <rect y="0" width="30" height="1.54" fill="#B22234" />
            <rect y="3.08" width="30" height="1.54" fill="#B22234" />
            <rect y="6.15" width="30" height="1.54" fill="#B22234" />
            <rect y="9.23" width="30" height="1.54" fill="#B22234" />
            <rect y="12.31" width="30" height="1.54" fill="#B22234" />
            <rect y="15.38" width="30" height="1.54" fill="#B22234" />
            <rect y="18.46" width="30" height="1.54" fill="#B22234" />
            <rect width="12" height="10.77" fill="#3C3B6E" />
          </svg>
        </div>
        <span className="text-[6px] font-bold uppercase tracking-[0.2em] text-surface-cream/90 sm:text-[8px] sm:tracking-[0.25em]">
          Made in Canada
        </span>
      </div>
    </div>
  );
}
