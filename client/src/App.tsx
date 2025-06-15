import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Summary from "@/pages/summary";
import Resume from "@/pages/resume";
import Footer from "@/components/Footer";

export type NavigationSection = 'summary' | 'resume' | 'projects';

function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('summary');

  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return <Summary onNavigate={setActiveSection} />;
      case 'resume':
      case 'projects':
        return <Resume onNavigate={setActiveSection} activeSection={activeSection} />;
      default:
        return <Summary onNavigate={setActiveSection} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          {renderContent()}
        </div>
        <Footer onNavigate={setActiveSection} />
      </div>
    </TooltipProvider>
  );
}

export default App;
