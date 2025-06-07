import { Highlight } from '@/data/resumeData';

interface HighlightsProps {
  highlights: Highlight[];
  isTransitioning: boolean;
}

export default function Highlights({ highlights, isTransitioning }: HighlightsProps) {
  return (
    <section className={`bg-white rounded-xl shadow-lg p-4 mb-3 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
        <i className="fas fa-star text-trust-blue text-sm"></i>
        Career Highlights
      </h3>
      <div className="space-y-2">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3 py-1">
            <i className="fas fa-check text-trust-blue mt-1 text-sm flex-shrink-0"></i>
            <span className="text-gray-700 text-sm leading-relaxed">{highlight.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
