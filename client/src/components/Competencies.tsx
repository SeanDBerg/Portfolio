import { CompetencyCategory } from '@/data/resumeData';
import { useScrollShrink } from '@/hooks/useScrollShrink';

interface CompetenciesProps {
  competencies: CompetencyCategory[];
  technicalSkills?: string;
  isTransitioning: boolean;
}

export default function Competencies({ competencies, technicalSkills, isTransitioning }: CompetenciesProps) {
  const { ref, isScrolled } = useScrollShrink();

  return (
    <>
      <section 
        ref={ref}
        className={`bg-white rounded-xl shadow-lg p-4 mb-1 fade-transition ${
          isTransitioning ? 'fade-out' : 'fade-in'
        } ${isScrolled ? 'section-shrunk' : 'section-normal'}`}
      >
        <h3 className="text-lg font-bold text-navy mb-3">
          Core Competencies
        </h3>
        <div className="space-y-2">
          {competencies.map((category, index) => (
            <div key={index} className="text-sm">
              <span className="font-semibold text-trust-blue">{category.category}:</span>{' '}
              <span className="text-gray-700">{category.skills.join(' • ')}</span>
            </div>
          ))}
        </div>
      </section>

      {technicalSkills && (
        <section className={`bg-white rounded-xl shadow-lg p-4 mb-1 fade-transition ${
          isTransitioning ? 'fade-out' : 'fade-in'
        } ${isScrolled ? 'section-shrunk' : 'section-normal'}`}>
          <h3 className="text-lg font-bold text-navy mb-3">
            Technical Skills
          </h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-700 text-sm leading-relaxed">{technicalSkills}</p>
          </div>
        </section>
      )}
    </>
  );
}
