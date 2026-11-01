import { site } from "@/lib/site";

export function SocialIcons() {
  const { discord, twitter, youtube } = site.socials;
  return (
    <div className="flex items-center gap-6">
      <a href={discord} aria-label="Discord" target="_blank" rel="noreferrer" className="transition-transform hover:-translate-y-0.5">
        <svg viewBox="0 0 24 24" className="h-10 w-12" fill="#5865F2">
          <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.85a13.7 13.7 0 0 0-.63 1.29 18.4 18.4 0 0 0-5.5 0 12.6 12.6 0 0 0-.64-1.29 19.7 19.7 0 0 0-4.93 1.53C.6 9.05-.24 13.6.18 18.1a19.9 19.9 0 0 0 6.04 3.05c.49-.66.92-1.36 1.29-2.1a12.9 12.9 0 0 1-2.03-.97c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.12 0c.17.14.33.27.5.38-.65.39-1.33.71-2.03.97.37.74.8 1.44 1.29 2.1a19.8 19.8 0 0 0 6.04-3.05c.5-5.2-.84-9.72-3.58-13.73ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.22 0 2.18 1.1 2.16 2.42 0 1.33-.94 2.42-2.16 2.42Z" />
        </svg>
      </a>
      <a href={twitter} aria-label="Twitter" target="_blank" rel="noreferrer" className="transition-transform hover:-translate-y-0.5">
        <svg viewBox="0 0 24 24" className="h-10 w-11" fill="#1D9BF0">
          <path d="M23.64 4.94a9.6 9.6 0 0 1-2.78.76 4.85 4.85 0 0 0 2.13-2.68 9.7 9.7 0 0 1-3.08 1.18 4.84 4.84 0 0 0-8.25 4.41A13.74 13.74 0 0 1 1.7 3.55a4.84 4.84 0 0 0 1.5 6.46 4.8 4.8 0 0 1-2.2-.6v.06a4.84 4.84 0 0 0 3.89 4.75 4.9 4.9 0 0 1-2.19.08 4.85 4.85 0 0 0 4.52 3.36A9.7 9.7 0 0 1 0 19.67a13.7 13.7 0 0 0 7.42 2.17c8.9 0 13.77-7.37 13.77-13.77l-.02-.63a9.8 9.8 0 0 0 2.47-2.5Z" />
        </svg>
      </a>
      <a href={youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="transition-transform hover:-translate-y-0.5">
        <svg viewBox="0 0 28 20" className="h-10 w-14">
          <rect width="28" height="20" rx="5" fill="#FF0000" />
          <path d="M11 5.5v9l8-4.5-8-4.5Z" fill="#fff" />
        </svg>
      </a>
    </div>
  );
}
