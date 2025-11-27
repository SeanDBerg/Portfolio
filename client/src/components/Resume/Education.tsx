import { useScrollResize } from '@/hooks/useScrollResize';

interface EducationProps {
  certifications: string[];
  isTransitioning: boolean;
}

export default function Education({ certifications, isTransitioning }: EducationProps) {
  const { ref, isShrunken, isEnlarged } = useScrollResize();

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
        Education & Certifications
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-base font-semibold text-foreground mb-2">Education</h4>
          <div className="bg-void/50 border border-white/5 rounded-lg p-3 flex items-start gap-3">
            <i className="fas fa-university text-ops-blue text-sm mt-1"></i>
            <div>
              <div className="font-medium text-sm">Bachelor of Science - Business Leadership</div>
              <div className="text-ops-blue text-xs">Capella University</div>
              <div className="text-xs text-muted-foreground">Graduated: 2024</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-base font-semibold text-foreground mb-2">Certifications</h4>
          <div className="space-y-1">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-ops-blue/10 text-ops-blue px-2 py-1 rounded flex items-center gap-2">
                <i className="fas fa-certificate text-xs"></i>
                <span className="font-medium text-xs">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
