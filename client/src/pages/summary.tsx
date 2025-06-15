import { ResumeRole } from '@/hooks/useResumeRole';
import AnimatedPage from '@/components/AnimatedPage';
import TurnipMascot from '@/components/Summary/TurnipMascot';
import HeroSection from '@/components/Summary/HeroSection';
import PortfolioSection from '@/components/Summary/PortfolioSection';
import CTASection from '@/components/Summary/CTASection';
import type { NavigationSection } from '@/App';

interface SummaryProps {
  onNavigate: (section: NavigationSection) => void;
  currentRole: ResumeRole;
  onRoleChange: (role: ResumeRole) => void;
}

export default function Summary({ onNavigate, currentRole, onRoleChange }: SummaryProps) {
// Sections hidden until ready
  //  <PortfolioSection />
  return (
    <div className="bg-gradient-to-br from-bg-main to-white">
      <main className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-1 sm:py-2">
        <AnimatedPage>
          <HeroSection />
          <CTASection />
        </AnimatedPage>
      </main>

      <div className="fixed bottom-8 right-8 z-30 float-animation">
        <TurnipMascot size={150} />
      </div>

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