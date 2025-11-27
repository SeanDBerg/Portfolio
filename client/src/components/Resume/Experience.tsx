import { Experience as ExperienceType } from '@/data/resumeData';
import { useExperienceScrollResize } from '@/hooks/useExperienceScrollResize';
import { useJobScrollResize } from '@/hooks/useJobScrollResize';

interface ExperienceProps {
  experience: ExperienceType[];
  isTransitioning: boolean;
}

interface JobContentProps {
  exp: ExperienceType;
  index: number;
  isLast: boolean;
  isTransitioning: boolean;
  totalJobs: number;
}

function JobContent({ exp, index, isLast, isTransitioning, totalJobs }: JobContentProps) {
  const { ref, isShrunken, isEnlarged } = useJobScrollResize(index, totalJobs);

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <div className={`relative ${!isLast ? 'border-l-2 border-white/10 pb-3 pl-6' : 'pl-6'}`}>
      {/* Date range positioned above and aligned with timeline */}
      <div className="relative -ml-6 mb-2">
        <div className="absolute w-3 h-3 bg-ops-blue rounded-full left-0 top-1"></div>
        {/* Connecting line from timeline dot to date */}
        <div className="absolute w-4 h-0.5 bg-ops-blue left-3 top-2.5"></div>
        <div className="ml-8">
          <span className="text-ops-blue text-xs font-bold">
            {exp.period}
          </span>
        </div>
      </div>
      
      {/* Job listing content - this is the section that resizes */}
      <section 
        ref={ref}
        className={`bg-void/50 border border-white/5 rounded-lg p-3 fade-transition ${
          isTransitioning ? 'fade-out' : 'fade-in'
        } ${getSectionClass()}`}
      >
        <div className="mb-2">
          <h4 className="text-base font-semibold text-foreground leading-tight">{exp.title}</h4>
          <h5 className="text-sm text-ops-blue font-medium">{exp.company}</h5>
        </div>
        <ul className="space-y-1">
          {exp.achievements.map((achievement, achievementIndex) => (
            <li key={achievementIndex} className="flex items-start gap-2">
              <i className="fas fa-arrow-right text-ops-blue mt-1.5 flex-shrink-0 text-xs"></i>
              <span className="text-base sm:text-lg text-muted-foreground font-normal mb-3 max-w-4xl">{achievement}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function Experience({ experience, isTransitioning }: ExperienceProps) {
  const { ref, isShrunken, isEnlarged } = useExperienceScrollResize(experience.length);

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <section 
      ref={ref}
      className={`bg-surface glassmorphism border border-white/5 rounded-xl shadow-lg p-4 mb-1 fade-transition ${
        isTransitioning ? 'fade-out' : 'fade-in'
      } ${getSectionClass()}`}
    >
      <h3 className="text-lg font-bold text-foreground mb-3">
        Professional Experience
      </h3>
      
      <div className="space-y-3">
        {experience.map((exp, index) => (
          <JobContent 
            key={index}
            exp={exp}
            index={index}
            isLast={index === experience.length - 1}
            isTransitioning={isTransitioning}
            totalJobs={experience.length}
          />
        ))}
      </div>
    </section>
  );
}