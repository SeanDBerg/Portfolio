// Home.jsx - Home page component
import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import TurnipMascot from './TurnipMascot';
import HeroSection from '../components/HeroSection';
import PortfolioSection from '../components/PortfolioSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <AnimatedPage>
      <HeroSection />
      <div className="hero-image float-animation">
        <TurnipMascot size={150} />
      </div>
      <PortfolioSection />
      <CTASection />
    </AnimatedPage>
  );
}
