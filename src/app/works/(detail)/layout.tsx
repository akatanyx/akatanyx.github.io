import { SplitShell } from "@/components/SplitShell";
import { WorkSidebar } from "@/components/WorkSidebar";

// Shared by every project page, so the sidebar stays mounted while you switch projects
// and only the right side changes.
export default function WorkDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <SplitShell leftWidth="lg:w-[29%]" left={<WorkSidebar />}>
      {children}
    </SplitShell>
  );
}
