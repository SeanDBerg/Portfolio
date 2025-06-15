import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useResumeRole } from "@/hooks/useResumeRole";
import { usePDFGenerator } from "@/components/Resume/PDFGenerator";
import Navigation from "@/components/Navigation";
import Overlay from "@/components/Overlay";
import Summary from "@/pages/summary";
import Resume from "@/pages/resume";
import Footer from "@/components/Footer";

export type NavigationSection = 'summary' | 'resume' | 'projects';

function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('summary');
  const { currentRole, isTransitioning, switchRole, roleData } = useResumeRole();
  const { generatePDF } = usePDFGenerator();

  const handleDownloadPDF = () => {
    generatePDF(roleData, currentRole);
  };

  const handleNavigate = (section: NavigationSection) => {
    setActiveSection(section);
    // Scroll to top when navigating to a new section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return <Summary onNavigate={handleNavigate} currentRole={currentRole} onRoleChange={switchRole} />;
      case 'resume':
      case 'projects':
        return <Resume onNavigate={handleNavigate} activeSection={activeSection} currentRole={currentRole} onRoleChange={switchRole} isTransitioning={isTransitioning} roleData={roleData} />;
      default:
        return <Summary onNavigate={handleNavigate} currentRole={currentRole} onRoleChange={switchRole} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50">
          <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
          <Overlay 
            currentRole={currentRole} 
            onRoleChange={switchRole} 
            activeSection={activeSection}
            onDownloadPDF={handleDownloadPDF}
          />
        </header>
        <div className="flex-1">
          {renderContent()}
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    </TooltipProvider>
  );
}

export default App;
