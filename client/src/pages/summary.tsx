import { ResumeRole } from '@/hooks/useResumeRole';
import AnimatedPage from '@/components/AnimatedPage';
import HeroSection from '@/components/Summary/HeroSection';
import PillarsSection from '@/components/Summary/PillarsSection';
import CaseStudiesSection from '@/components/Summary/CaseStudiesSection';
import PortfolioSection from '@/components/Summary/PortfolioSection';
import CTASection from '@/components/Summary/CTASection';
import type { NavigationSection } from '@/App';
import { Helmet } from 'react-helmet-async';

interface SummaryProps {
  onNavigate: (section: NavigationSection) => void;
  currentRole: ResumeRole;
  onRoleChange: (role: ResumeRole) => void;
}

export default function Summary({ onNavigate, currentRole, onRoleChange }: SummaryProps) {
  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      <Helmet>
        <title>Sean Berg - Operations & IT Leader</title>
        <meta name="description" content="Sean Berg's professional summary showcasing leadership in operations, IT, and project management." />
        <meta property="og:title" content="Sean Berg - Operations & IT Leader" />
        <meta property="og:description" content="Sean Berg's professional summary showcasing leadership in operations, IT, and project management." />
      </Helmet>
      <main className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-1 sm:py-2 relative z-10">
        <AnimatedPage>
          <HeroSection />
          <PillarsSection />
          <CaseStudiesSection />
          <PortfolioSection />
          <CTASection />
        </AnimatedPage>
      </main>
      {/* Aurora fog wave effect - slow drifting aurora bands */}
      <div className="aurora-fog-wave">
        <div className="aurora-fog-band aurora-fog-band-green"></div>
        <div className="aurora-fog-band aurora-fog-band-blue"></div>
        <div className="aurora-fog-band aurora-fog-band-purple"></div>
      </div>
      <div className="aurora-ambient-pulse"></div>
      {/* Background decorative elements - aurora glow accents only */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-berg-green/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-ops-blue/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}