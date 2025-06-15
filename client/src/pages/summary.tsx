import { useResumeRole } from '@/hooks/useResumeRole';
import Navigation from '@/components/Navigation';
import Overlay from '@/components/Overlay';
import AnimatedPage from '@/components/Summary/AnimatedPage';
import TurnipMascot from '@/components/Summary/TurnipMascot';
import HeroSection from '@/components/Summary/HeroSection';
import PortfolioSection from '@/components/Summary/PortfolioSection';
import CTASection from '@/components/Summary/CTASection';

export default function Summary() {
  const { currentRole, switchRole } = useResumeRole();

  const handleDownloadPDF = () => {
    // Placeholder for PDF generation
    console.log('PDF download from summary page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main to-white">
      <Navigation onDownloadPDF={handleDownloadPDF} />
      <Overlay currentRole={currentRole} onRoleChange={switchRole} />
      
      <AnimatedPage>
        <HeroSection />
        <div className="fixed bottom-8 right-8 z-30 float-animation">
          <TurnipMascot size={150} />
        </div>
        <PortfolioSection />
        <CTASection />
      </AnimatedPage>
    </div>
  );
}