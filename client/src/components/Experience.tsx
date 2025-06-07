import { Experience as ExperienceType } from '@/data/resumeData';
import { useScrollResize } from '@/hooks/useScrollResize';

interface ExperienceProps {
  experience: ExperienceType[];
  isTransitioning: boolean;
}

interface JobListingProps {
  exp: ExperienceType;
  index: number;
  isLast: boolean;
  isTransitioning: boolean;
}

function JobListing({ exp, index, isLast, isTransitioning }: JobListingProps) {
  const { ref, isShrunken, isEnlarged } = useScrollResize();

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <section 
      ref={ref}
      className={`bg-white rounded-xl shadow-lg p-4 mb-1 fade-transition ${
        isTransitioning ? 'fade-out' : 'fade-in'
      } ${getSectionClass()}`}
    >
      <div className={`relative ${!isLast ? 'border-l-2 border-gray-200 pb-3 pl-6' : 'pl-6'}`}>
        {/* Date range positioned above and aligned with timeline */}
        <div className="relative -ml-6 mb-2">
          <div className="absolute w-3 h-3 bg-trust-blue rounded-full left-0 top-1"></div>
          {/* Connecting line from timeline dot to date */}
          <div className="absolute w-4 h-0.5 bg-trust-blue left-3 top-2.5"></div>
          <div className="ml-8">
            <span className="text-trust-blue text-xs font-bold">
              {exp.period}
            </span>
          </div>
        </div>
        
        {/* Job listing content */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="mb-2">
            <h4 className="text-base font-semibold text-navy leading-tight">{exp.title}</h4>
            <h5 className="text-sm text-trust-blue font-medium">{exp.company}</h5>
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
    </section>
  );
}

export default function Experience({ experience, isTransitioning }: ExperienceProps) {
  return (
    <>
      <section className="bg-white rounded-xl shadow-lg p-4 mb-1">
        <h3 className="text-lg font-bold text-navy mb-3">
          Professional Experience
        </h3>
      </section>
      
      {experience.map((exp, index) => (
        <JobListing 
          key={index}
          exp={exp}
          index={index}
          isLast={index === experience.length - 1}
          isTransitioning={isTransitioning}
        />
      ))}
    </>
  );
}