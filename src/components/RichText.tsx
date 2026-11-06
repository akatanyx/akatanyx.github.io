/**
 * Plain text where `[label](https://…)` becomes a link, for thoughts and descriptions in the data
 * files. Links open in a new tab and are styled to sit quietly in body text (see TextLink).
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    parts.push(text.slice(last, m.index));
    parts.push(
      <TextLink key={m.index} href={m[2]}>
        {m[1]}
      </TextLink>,
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

/**
 * A link that reads as text: medium weight with a faint grey underline. On hover a black line
 * sweeps in over it from the left and the little arrow nudges up-right. The underline is a
 * background, so it follows the words when a link wraps onto a second line.
 */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link bg-[linear-gradient(currentColor,currentColor),linear-gradient(#d4d4d4,#d4d4d4)] bg-no-repeat pb-px font-medium [background-position:0_100%,0_100%] [background-size:0%_1.5px,100%_1.5px] transition-[background-size] duration-300 ease-out hover:[background-size:100%_1.5px,100%_1.5px] focus-visible:[background-size:100%_1.5px,100%_1.5px] focus-visible:outline-none"
    >
      {children}
      <span
        aria-hidden
        className="ml-0.5 inline-block text-[0.75em] text-neutral-400 transition-[translate,color] duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-current"
      >
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
