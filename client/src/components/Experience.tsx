import { Experience as ExperienceType } from '@/data/resumeData';

interface ExperienceProps {
  experience: ExperienceType[];
  isTransitioning: boolean;
}

export default function Experience({ experience, isTransitioning }: ExperienceProps) {
  return (
    <section className={`bg-white rounded-xl shadow-lg p-8 mb-8 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
        <i className="fas fa-briefcase text-trust-blue"></i>
        Professional Experience
      </h3>
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div key={index} className={`relative pl-8 ${index !== experience.length - 1 ? 'border-l-2 border-gray-200 pb-8' : ''}`}>
            <div className="absolute w-4 h-4 bg-trust-blue rounded-full -left-2 top-0"></div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-navy">{exp.title}</h4>
                  <h5 className="text-lg text-trust-blue font-medium">{exp.company}</h5>
                </div>
                <span className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm font-medium mt-2 lg:mt-0 self-start lg:self-center">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start gap-3">
                    <i className="fas fa-arrow-right text-trust-blue mt-1 flex-shrink-0 text-sm"></i>
                    <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
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
