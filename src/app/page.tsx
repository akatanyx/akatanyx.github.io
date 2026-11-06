import { FirstVisitTip } from "@/components/FirstVisitTip";
import { HelloName } from "@/components/HelloName";
import { HoverUnderline } from "@/components/HoverUnderline";
import { SplitShell } from "@/components/SplitShell";
import { SocialIcons } from "@/components/SocialIcons";
import { TransitionLink } from "@/components/TransitionLink";
import { LockedItem } from "@/components/UnavailableGrid";
import { stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <SplitShell
      leftWidth="lg:w-[38%]"
      scrollLeft={false}
      fitMobile
      left={
        // On phones the intro sits at the top and the white panel is just tall enough for it.
        <div className="flex flex-col px-8 pt-14 pb-16 sm:px-20 lg:h-full lg:justify-center lg:py-20 lg:px-14 xl:px-18">
          <HelloName className="enter-up text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[2.6rem] xl:text-5xl" />
          <p className="enter-up mt-2 text-base sm:text-lg" style={stagger(1)}>
            {site.tagline}
          </p>
          <div className="enter-up mt-6" style={stagger(2)}>
            <SocialIcons />
          </div>

          <TransitionLink
            href="/works/"
            variant="expand"
            aria-label="See my works"
            className="absolute -bottom-11 left-8 grid h-[88px] w-[88px] place-items-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 lg:-right-11 lg:bottom-10 lg:left-auto"
          >
            {/* Points down on phones (the panels are stacked), right on desktop; the inner span
                nudges along that direction. */}
            <span className="rotate-90 lg:rotate-0">
              <span className="arrow-nudge block">
                <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="black" strokeWidth={2.5}>
                  <path d="M9 4l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
            <FirstVisitTip text="Click here to see my works!" />
          </TransitionLink>
        </div>
      }
    >
      <nav className="flex h-full flex-col justify-center gap-6 px-8 pt-12 pb-8 sm:px-20 lg:px-28 lg:py-24">
        <p className="enter-right text-xs tracking-[0.4em] text-white/50 uppercase" style={stagger(2)}>
          Explore
        </p>
        {[
          { href: "/works/", label: "Works", n: "01" },
          { href: "/games/", label: "Games", n: "02" },
        ].map((item, i) => (
          <TransitionLink
            key={item.href}
            href={item.href}
            variant="expand"
            className="enter-right group flex items-baseline gap-5 text-4xl font-semibold sm:text-6xl"
            style={stagger(3 + i)}
          >
            <span className="text-sm font-normal text-white/40">{item.n}</span>
            <span className="transition-transform group-hover:translate-x-2">
              <HoverUnderline>{item.label}</HoverUnderline>
            </span>
          </TransitionLink>
        ))}
        {/* Not open yet: pressing it takes a hit and says it's unavailable. */}
        <LockedItem id="card-games" className="enter-right text-4xl font-semibold sm:text-6xl" style={stagger(5)}>
          <span className="text-sm font-normal text-white/40">03</span>
          <span>
            <HoverUnderline>Card Games</HoverUnderline>
          </span>
        </LockedItem>
      </nav>
    </SplitShell>
  );
}
