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

  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return <Summary onNavigate={setActiveSection} currentRole={currentRole} onRoleChange={switchRole} />;
      case 'resume':
      case 'projects':
        return <Resume onNavigate={setActiveSection} activeSection={activeSection} currentRole={currentRole} onRoleChange={switchRole} isTransitioning={isTransitioning} roleData={roleData} />;
      default:
        return <Summary onNavigate={setActiveSection} currentRole={currentRole} onRoleChange={switchRole} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
        <Overlay 
          currentRole={currentRole} 
          onRoleChange={switchRole} 
          activeSection={activeSection}
          onDownloadPDF={handleDownloadPDF}
        />
        <div className="flex-1">
          {renderContent()}
        </div>
        <Footer onNavigate={setActiveSection} />
      </div>
    </TooltipProvider>
  );
}

export default App;
