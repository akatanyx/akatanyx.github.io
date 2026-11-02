"use client";

import { useState } from "react";

export function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = legacyCopy(value);
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${label}`}
      className="inline-flex items-center gap-2.5 border border-neutral-300 px-3 py-1.5 text-sm transition-colors hover:border-black"
    >
      <span className="text-[11px] tracking-[0.2em] text-neutral-500 uppercase">{label}</span>
      <span className="font-medium tabular-nums select-all">{value}</span>
      <span aria-live="polite" className="min-w-12 text-left text-xs text-neutral-500">
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

/** Fallback for browsers that block the async clipboard API. */
function legacyCopy(text: string) {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  const ok = document.execCommand("copy");
  el.remove();
  return ok;
}
