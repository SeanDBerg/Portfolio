import { Highlight } from '@/data/resumeData';
import { useScrollResize } from '@/hooks/useScrollResize';

interface HighlightsProps {
  highlights: Highlight[];
  isTransitioning: boolean;
}

export default function Highlights({ highlights, isTransitioning }: HighlightsProps) {
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
      <h3 className="text-lg font-bold text-navy mb-2">
        Career Highlights
      </h3>
      <div className="space-y-0.5">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-2">
            <i className={`${highlight.icon} text-trust-blue mt-1 text-xs flex-shrink-0`}></i>
            <span className="text-base sm:text-lg text-gray-700 font-normal mb-5 max-w-4xl">{highlight.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
