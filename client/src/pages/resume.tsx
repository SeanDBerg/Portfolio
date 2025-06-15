import { useEffect } from 'react';
import { useResumeRole } from '@/hooks/useResumeRole';
import { usePDFGenerator } from '@/components/Resume/PDFGenerator';
import Navigation from '@/components/Navigation';
import Overlay from '@/components/Overlay';
import AnimatedPage from '@/components/AnimatedPage';
import Header from '@/components/Resume/Header';
import Highlights from '@/components/Resume/Highlights';
import Competencies from '@/components/Resume/Competencies';
import Experience from '@/components/Resume/Experience';
import Education from '@/components/Resume/Education';
import type { NavigationSection } from '@/App';

interface ResumeProps {
  onNavigate: (section: NavigationSection) => void;
  activeSection: NavigationSection;
}

export default function Resume({ onNavigate, activeSection }: ResumeProps) {
  const { currentRole, isTransitioning, switchRole, roleData } = useResumeRole();
  const { generatePDF } = usePDFGenerator();

  // Load jsPDF script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleDownloadPDF = () => {
    generatePDF(roleData, currentRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main to-white">
      <Navigation 
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
      <Overlay currentRole={currentRole} onRoleChange={switchRole} activeSection={activeSection} onDownloadPDF={handleDownloadPDF} />
      
      <main className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-1 sm:py-2">
        <AnimatedPage>
          <Header 
            roleData={roleData}
            isTransitioning={isTransitioning}
          />
          
          <Highlights 
            highlights={roleData.highlights}
            isTransitioning={isTransitioning}
          />
          
          <Competencies 
            competencies={roleData.competencies}
            technicalSkills={roleData.technicalSkills}
            isTransitioning={isTransitioning}
          />
          
          <Experience 
            experience={roleData.experience}
            isTransitioning={isTransitioning}
          />
          
          <Education 
            certifications={roleData.certifications}
            isTransitioning={isTransitioning}
          />
        </AnimatedPage>
      </main>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080" 
          alt="Modern office workspace" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
