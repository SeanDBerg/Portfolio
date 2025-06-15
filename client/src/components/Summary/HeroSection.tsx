import { FaGithub, FaLinkedin, FaCodepen } from 'react-icons/fa';
import { useScrollResize } from '@/hooks/useScrollResize';

export default function HeroSection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <section ref={ref} className={`bg-white rounded-xl shadow-lg p-2 sm:p-2 lg:p-2 fade-transition fade-in ${getSectionClass()}`}>
      <div className="flex flex-col items-center gap-3 text-center">
        {/* Profile image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-trust-blue to-hover-blue rounded-full blur-xl opacity-30"></div>
            <div className="relative bg-white p-2 rounded-full shadow-lg">
              <img
                src="./EggHeadMcFinnigans.jpg"
                alt="Sean Berg Profile"
                className="rounded-full w-32 h-40 sm:w-32 sm:h-40 lg:w-32 lg:h-40 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy tracking-tight leading-snug mb-4">
            Full-Stack Developer<br />
            Python, Django, Flask, and JavaScript
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-700 font-normal mb-5 max-w-4xl mx-auto">
            Modular backends, responsive frontends, and interactive tools, from AI job matchers to RPG-style learning games.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-center justify-center gap-3 mb-5">
            <a
              href="#portfolio"
              className="px-4 py-2 bg-navy text-white font-medium rounded-lg shadow-lg hover:bg-trust-blue transition-colors"
            >
              View My Work
            </a>
            <a
              href="mailto:SeanDBerg@gmail.com"
              className="px-4 py-2 bg-white border border-subtle text-navy font-medium rounded-lg shadow hover:bg-gray-50 transition-colors"
            >
              Get In Touch
            </a>
          </div>

          {/* Availability */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-subtle border border-gray-200 text-sm rounded-lg text-gray-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>Available for freelance projects</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-6 text-gray-600">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-hover-blue transition-colors">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://linkedin.com/in/seanberg" target="_blank" rel="noreferrer" className="hover:text-hover-blue transition-colors">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://codepen.io" target="_blank" rel="noreferrer" className="hover:text-hover-blue transition-colors">
              <FaCodepen className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}