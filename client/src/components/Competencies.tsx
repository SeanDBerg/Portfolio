import { CompetencyCategory } from '@/data/resumeData';

interface CompetenciesProps {
  competencies: CompetencyCategory[];
  technicalSkills?: string;
  isTransitioning: boolean;
}

export default function Competencies({ competencies, technicalSkills, isTransitioning }: CompetenciesProps) {
  return (
    <>
      <section className={`bg-white rounded-xl shadow-lg p-8 mb-8 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
          <i className="fas fa-brain text-trust-blue"></i>
          Core Competencies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {competencies.map((category, index) => (
            <div key={index} className="space-y-3">
              <h4 className="font-semibold text-trust-blue text-lg">{category.category}</h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="bg-trust-blue/10 text-trust-blue px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {technicalSkills && (
        <section className={`bg-white rounded-xl shadow-lg p-8 mb-8 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
            <i className="fas fa-tools text-trust-blue"></i>
            Technical Skills
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">{technicalSkills}</p>
          </div>
        </section>
      )}
    </>
  );
}
