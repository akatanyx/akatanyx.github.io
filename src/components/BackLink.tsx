import { TransitionLink } from "@/components/TransitionLink";

/** Back links leave the current section, so they use the expanding white panel. */
export function BackLink({ href, children }: { href: string; children: string }) {
  return (
    <TransitionLink
      href={href}
      variant="expand"
      className="inline-flex items-center gap-3 text-sm text-black transition-opacity hover:opacity-60"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={3}>
        <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </TransitionLink>
  );
}
