import { Experience as ExperienceType } from '@/data/resumeData';
import { useScrollShrink } from '@/hooks/useScrollShrink';

interface ExperienceProps {
  experience: ExperienceType[];
  isTransitioning: boolean;
}

export default function Experience({ experience, isTransitioning }: ExperienceProps) {
  const { ref, isPassed } = useScrollShrink(500);

  return (
    <section 
      ref={ref}
      className={`bg-white rounded-xl shadow-lg p-4 mb-1 fade-transition ${
        isTransitioning ? 'fade-out' : 'fade-in'
      } ${isPassed ? 'section-shrunk' : 'section-normal'}`}
    >
      <h3 className="text-lg font-bold text-navy mb-3">
        Professional Experience
      </h3>
      <div className="space-y-3">
        {experience.map((exp, index) => (
          <div key={index} className={`relative pl-6 ${index !== experience.length - 1 ? 'border-l-2 border-gray-200 pb-3' : ''}`}>
            <div className="absolute w-3 h-3 bg-trust-blue rounded-full -left-1.5 top-1"></div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-navy leading-tight">{exp.title}</h4>
                  <h5 className="text-sm text-trust-blue font-medium">{exp.company}</h5>
                </div>
                <span className="bg-trust-blue text-white px-2 py-1 rounded text-xs font-medium mt-1 sm:mt-0 self-start">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-1">
                {exp.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start gap-2">
                    <i className="fas fa-arrow-right text-trust-blue mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-gray-700 text-xs leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
