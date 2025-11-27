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
    <section ref={ref} className={`relative overflow-hidden aurora-green-flow aurora-wave-overlay rounded-xl p-2 sm:p-2 lg:p-2 fade-transition fade-in border aurora-accent-green ${getSectionClass()}`}>
      <div className="flex flex-col items-center gap-3 text-center relative z-10">
        {/* Profile image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-berg-green to-ops-blue rounded-full blur-xl opacity-40 animate-aurora-shimmer"></div>
            <div className="relative bg-surface p-2 rounded-full border border-white/10">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight leading-snug mb-4">
            Full-Stack Developer<br />
            <span className="text-berg-green font-mono text-xl sm:text-2xl mt-2 block drop-shadow-[0_0_8px_rgba(46,255,123,0.5)]">Google App Script, JavaScript, Python, and React</span>
          </h1>
          {/* Subheading */}
          <p className="text-base sm:text-lg text-muted-foreground font-normal mb-5 max-w-4xl mx-auto">
            I modernize complex, messy operational systems. I stabilize what you already have, then automate and extend it without disrupting daily work.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-center justify-center gap-3 mb-5">
            <a
              href="#portfolio"
              className="px-6 py-2 bg-berg-green text-void font-bold font-mono rounded-lg neon-glow hover:bg-berg-green/90 transition-all"
            >
              VIEW MY WORK
            </a>
            <a
              href="mailto:SeanDBerg@gmail.com"
              className="px-6 py-2 bg-transparent border border-ops-blue text-ops-blue font-mono font-bold rounded-lg hover:bg-ops-blue/10 transition-colors"
            >
              GET IN TOUCH
            </a>
          </div>
          {/* Availability */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-steel text-sm rounded-lg text-muted-foreground shadow-sm">
              <span className="w-2 h-2 rounded-full bg-berg-green animate-pulse"></span>
              <span className="font-mono text-xs">AVAILABLE FOR FREELANCE PROJECTS</span>
            </div>
          </div>
          {/* Socials */}
          <div className="flex justify-center gap-6 text-muted-foreground">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-berg-green transition-colors">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://linkedin.com/in/seanberg" target="_blank" rel="noreferrer" className="hover:text-berg-green transition-colors">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://codepen.io" target="_blank" rel="noreferrer" className="hover:text-berg-green transition-colors">
              <FaCodepen className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}