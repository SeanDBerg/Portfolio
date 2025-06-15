import { Link } from 'wouter';
import { useScrollResize } from '@/hooks/useScrollResize';

export default function CTASection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`bg-gradient-to-br from-navy to-trust-blue text-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in ${getSectionClass()}`}
    >
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to transform your operations?
        </h2>
        <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Let's collaborate on optimizing your business processes and building high-performing teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:SeanDBerg@gmail.com"
            className="inline-block px-6 py-3 bg-white hover:bg-gray-100 text-navy font-medium rounded-lg shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-white/30"
          >
            Get In Touch
          </a>
          <Link
            href="/resume"
            className="inline-block px-6 py-3 bg-transparent hover:bg-white/10 border border-white text-white font-medium rounded-lg transition-colors"
          >
            View My Resume
          </Link>
        </div>
      </div>
    </section>
  );
}