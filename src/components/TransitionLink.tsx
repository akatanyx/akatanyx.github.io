"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * "expand": the white panel grows to fill the screen while its contents fade (moving between sections).
 * "fade": the page content fades out (picking a project or game).
 */
export type TransitionVariant = "expand" | "fade";

const duration: Record<TransitionVariant, number> = { expand: 700, fade: 280 };

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: TransitionVariant;
};

/** A Link that plays an exit animation before navigating. The styles live in globals.css. */
export function TransitionLink({ href, variant = "fade", onClick, ...rest }: Props) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        // Let new-tab clicks and reduced-motion users through untouched.
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        e.preventDefault();
        const root = document.documentElement;
        if (root.dataset.leaving) return;
        root.dataset.leaving = variant;
        setTimeout(() => router.push(href), duration[variant]);
        // Never leave the page blank if navigation fails.
        setTimeout(() => delete root.dataset.leaving, duration[variant] + 10000);
      }}
    />
  );
}
