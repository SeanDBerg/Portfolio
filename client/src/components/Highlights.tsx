import { Highlight } from '@/data/resumeData';
import { useScrollShrink } from '@/hooks/useScrollShrink';

interface HighlightsProps {
  highlights: Highlight[];
  isTransitioning: boolean;
}

export default function Highlights({ highlights, isTransitioning }: HighlightsProps) {
  const { ref, isVisible } = useScrollShrink();

  return (
    <section 
      ref={ref}
      className={`bg-white rounded-xl shadow-lg p-4 mb-1 fade-transition transition-all duration-300 ${
        isTransitioning ? 'fade-out' : 'fade-in'
      } ${isVisible ? 'scale-100' : 'scale-95 opacity-80'}`}
    >
      <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
        <i className="fas fa-star text-trust-blue text-sm"></i>
        Career Highlights
      </h3>
      <div className="space-y-0.5">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-2">
            <i className="fas fa-check text-trust-blue mt-1 text-xs flex-shrink-0"></i>
            <span className="text-gray-700 text-sm leading-tight">{highlight.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
