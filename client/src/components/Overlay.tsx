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
    <div className="no-print fixed top-40 right-0 z-40 flex items-start">
      <div className="relative">
        <div
          className={`absolute right-0 flex w-fit transform items-center gap-3 rounded-l-lg border bg-white/95 px-4 py-2 shadow transition-transform min-w-[600px] sm:min-w-[700px] lg:min-w-[800px] xl:min-w-[900px] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow flex-shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="flex gap-3 whitespace-nowrap flex-1 justify-center">
            {roles.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onRoleChange(key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors flex-1 min-w-0 ${
                  currentRole === key
                    ? "bg-navy text-white shadow"
                    : "bg-subtle text-gray-700 hover:bg-trust-blue hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
