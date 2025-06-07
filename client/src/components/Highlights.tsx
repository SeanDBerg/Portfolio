import { Highlight } from '@/data/resumeData';

interface HighlightsProps {
  highlights: Highlight[];
  isTransitioning: boolean;
}

export default function Highlights({ highlights, isTransitioning }: HighlightsProps) {
  return (
    <section className={`bg-white rounded-xl shadow-lg p-8 mb-8 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
        <i className="fas fa-star text-trust-blue"></i>
        Career Highlights
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-l-4 border-trust-blue">
            <i className={`${highlight.icon} text-trust-blue mt-1 text-lg flex-shrink-0`}></i>
            <span className="text-gray-700 text-sm leading-relaxed">{highlight.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
