import { useState } from "react";
import { ResumeRole } from "@/hooks/useResumeRole";
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
    <div className="no-print fixed top-32 sm:top-40 right-0 z-40 flex items-start">
      <div className="relative">
        <div
          className={`absolute right-0 flex w-fit transform items-center gap-1 sm:gap-2 rounded-l-lg border bg-white/95 px-2 sm:px-3 py-1.5 sm:py-2 shadow transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="mr-1 sm:mr-2 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border bg-white shadow"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <div className="flex gap-1 sm:gap-2 whitespace-nowrap">
            {roles.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onRoleChange(key)}
                className={`rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors ${
                  currentRole === key
                    ? "bg-navy text-white shadow"
                    : "bg-subtle text-gray-700 hover:bg-trust-blue hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">
                  {key === "general" && "GM"}
                  {key === "frontend" && "FE"}
                  {key === "it" && "IT"}
                  {key === "pm" && "PM"}
                </span>
              </button>
            ))}
          </div>
        </div>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border bg-white shadow"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
