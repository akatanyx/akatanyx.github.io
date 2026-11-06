import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Curtain } from "@/components/Curtain";
import { DesktopNotice } from "@/components/DesktopNotice";
import { PageLoader } from "@/components/PageLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TransitionEffects } from "@/components/TransitionEffects";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} | Portfolio`,
  description: site.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-sans">
        {/* Applies the saved theme before the first paint, so the page doesn't flash light. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        {children}
        <TransitionEffects />
        <PageLoader />
        <Curtain />
        <DesktopNotice />
        <ThemeToggle />
      </body>
    </html>
  );
}