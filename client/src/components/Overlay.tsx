import { useState } from "react";
import { ResumeRole } from "@/hooks/useResumeRole";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OverlayProps {
  currentRole: ResumeRole;
  onRoleChange: (role: ResumeRole) => void;
}

export default function Overlay({ currentRole, onRoleChange }: OverlayProps) {
  const [open, setOpen] = useState(true);

  const roles: Array<{ key: ResumeRole; label: string }> = [
    { key: "general", label: "General Manager" },
    { key: "frontend", label: "Frontend Developer" },
    { key: "it", label: "IT Manager" },
    { key: "pm", label: "Project Manager" },
  ];

  return (
    <div className="no-print fixed top-16 right-0 z-40 flex">
      <button
        onClick={() => setOpen(!open)}
        className="relative -left-7 top-4 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow"
      >
        {open ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-60 p-4 pt-10 [&>button]:hidden">
          <div className="flex flex-col gap-2">
            {roles.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onRoleChange(key)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentRole === key
                    ? "bg-navy text-white shadow"
                    : "bg-subtle text-gray-700 hover:bg-trust-blue hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
