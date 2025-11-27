import { ResumeData } from '@/data/resumeData';
import { useScrollResize } from '@/hooks/useScrollResize';

interface HeaderProps {
  roleData: ResumeData;
  isTransitioning: boolean;
}

export default function Header({ roleData, isTransitioning }: HeaderProps) {
  const { ref, isShrunken, isEnlarged } = useScrollResize();

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <header ref={ref} className={`bg-surface glassmorphism border border-white/5 rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'} ${getSectionClass()}`}>
      <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-6 text-center">
        <div className="flex-shrink-0">
          <img 
            src="./EggHeadMcFinnigans.jpg"
            alt="Sean Berg Professional Headshot" 
            className="w-28 h-32 sm:w-28 sm:h-32 lg:w-28 lg:h-32 rounded-full object-cover shadow-lg border-2 border-white/10"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight leading-snug mb-4">Sean Berg</h1>
          <h2 className="text-sm sm:text-base lg:text-lg text-ops-blue font-medium mb-2">{roleData.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground font-normal mb-5 max-w-4xl mx-auto">{roleData.summary}</p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
            <a 
              href="mailto:SeanDBerg@gmail.com" 
              className="flex items-center gap-1 hover:text-ops-blue transition-colors"
            >
              <i className="fas fa-envelope text-xs sm:text-sm"></i>
              <span className="hidden sm:inline">SeanDBerg@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a 
              href="https://linkedin.com/in/seanberg" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-ops-blue transition-colors"
            >
              <i className="fab fa-linkedin text-xs sm:text-sm"></i>
              <span className="hidden sm:inline">linkedin.com/in/seanberg</span>
              <span className="sm:hidden">LinkedIn</span>
            </a>
            <span className="flex items-center gap-1">
              <i className="fas fa-phone"></i>
              (610) 730-3552
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-map-marker-alt"></i>
              Northampton, PA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
