import { useState } from 'react';
import { useScrollResize } from '@/hooks/useScrollResize';
import { caseStudies, CaseStudy } from '@/data/caseStudies';
import { X, ExternalLink, ArrowRight, CheckCircle2, Database, Layout, TrendingUp } from 'lucide-react';
export default function CaseStudiesSection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };
  return (
    <>
      {/* Section separator: green to blue transition */}
      <div className="section-separator section-separator-green-to-blue mb-8"></div>
      
      <section
        ref={ref}
        className={`aurora-blue-flow glassmorphism-aurora rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in border aurora-accent-blue ${getSectionClass()} mb-8 relative overflow-hidden`}
      >
      {/* Aurora wave overlay */}
      <div className="absolute inset-0 aurora-wave-overlay-blue pointer-events-none"></div>
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Case Studies
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Real world examples of operational systems modernization.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {caseStudies.map((study) => (
          <div 
            key={study.id}
            className="group relative bg-card border border-white/10 rounded-xl p-6 hover:border-ops-blue/50 hover:shadow-lg hover:shadow-ops-blue/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedStudy(study)}
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-ops-blue transition-colors">
                {study.title}
              </h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {study.summary}
              </p>
              <div className="space-y-3 mb-6">
                {study.impact.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-berg-green mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {study.stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 bg-void border border-white/10 text-muted-foreground text-xs rounded-md font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-ops-blue font-medium text-sm group-hover:gap-2 transition-all">
                View case study <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setSelectedStudy(null)}
          />
          <div className="relative bg-surface border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col font-inter">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-surface/95 backdrop-blur-sm border-b border-white/10 p-6 sm:p-8 flex justify-between items-start z-10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {selectedStudy.modalContent.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {selectedStudy.modalContent.subtitle}
                </p>
              </div>
              <button 
                onClick={() => setSelectedStudy(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-12">
              {/* Situation */}
              <section>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 rounded-full" />
                  The Situation
                </h4>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {selectedStudy.modalContent.situation.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
              {/* What I Did */}
              <section>
                <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-ops-blue rounded-full" />
                  What I Did
                </h4>
                <div className={`grid grid-cols-1 gap-6 ${
                  selectedStudy.modalContent.whatIDid.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
                }`}>
                  {selectedStudy.modalContent.whatIDid.map((group, idx) => (
                    <div key={idx} className="bg-void/50 border border-white/5 rounded-xl p-5">
                      <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        {group.category === 'Stabilized' && <Database className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Automated' && <Layout className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Extended' && <TrendingUp className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Investment Communicator' && <Database className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Rental Management Portal' && <Layout className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Autonomous Intake' && <Database className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Operations Integration' && <Layout className="w-4 h-4 text-ops-blue" />}
                        {group.category === 'Compliance & Legal' && <TrendingUp className="w-4 h-4 text-ops-blue" />}
                        {group.category}
                      </h5>
                      <ul className="space-y-3">
                        {group.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-white/10">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
              {/* Results */}
              <section>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-berg-green rounded-full" />
                  Results
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedStudy.modalContent.results.map((result, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-berg-green/10 p-4 rounded-lg border border-berg-green/20">
                      <CheckCircle2 className="w-5 h-5 text-berg-green flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium">{result}</span>
                    </div>
                  ))}
                </div>
              </section>
              {/* Stack */}
              <section className="border-t border-white/10 pt-8">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-void border border-white/10 text-muted-foreground text-sm rounded-full font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            {/* What This Shows */}
              <section className="bg-card border border-white/10 rounded-xl p-6 sm:p-8 text-foreground">
                <h4 className="text-lg font-bold mb-4">What this shows</h4>
                <ul className="space-y-3">
                  {selectedStudy.modalContent.whatThisShows.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-ops-blue rounded-full mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* CTA Button */}
              <div className="flex justify-center pt-4 pb-2">
                <button
                  onClick={() => {
                    setSelectedStudy(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-ops-blue text-void font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 neon-glow"
                >
                  Contact Me <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </section>
      
      {/* Section separator: blue to purple transition */}
      <div className="section-separator section-separator-blue-to-purple mb-8"></div>
    </>
  );
}
