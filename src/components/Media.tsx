import { asset } from "@/lib/site";

/** An image from /public, or a grey placeholder box when there isn't one yet. */
export function Media({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return <div role="img" aria-label={alt} className={`bg-placeholder ${className}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
    <img src={asset(src)} alt={alt} className={`object-cover ${className}`} />
  );
}
