import { useScrollShrink } from '@/hooks/useScrollShrink';

interface EducationProps {
  certifications: string[];
  isTransitioning: boolean;
}

export default function Education({ certifications, isTransitioning }: EducationProps) {
  const { ref, isVisible } = useScrollShrink();

  return (
    <section 
      ref={ref}
      className={`bg-white rounded-xl shadow-lg p-4 mb-3 fade-transition transition-all duration-300 ${
        isTransitioning ? 'fade-out' : 'fade-in'
      } ${isVisible ? 'scale-100' : 'scale-95 opacity-80'}`}
    >
      <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
        <i className="fas fa-graduation-cap text-trust-blue text-sm"></i>
        Education & Certifications
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-base font-semibold text-navy mb-2">Education</h4>
          <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
            <i className="fas fa-university text-trust-blue text-sm mt-1"></i>
            <div>
              <div className="font-medium text-sm">Bachelor of Science - Business Leadership</div>
              <div className="text-trust-blue text-xs">Capella University</div>
              <div className="text-xs text-gray-600">Graduated: 2024</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-base font-semibold text-navy mb-2">Certifications</h4>
          <div className="space-y-1">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-hover-blue/10 text-hover-blue px-2 py-1 rounded flex items-center gap-2">
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
