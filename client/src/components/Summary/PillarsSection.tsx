import { useScrollResize } from '@/hooks/useScrollResize';
import { FaTools, FaRobot, FaChartLine } from 'react-icons/fa';
export default function PillarsSection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();
  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };
  const pillars = [
    {
      title: 'Stabilize',
      icon: <FaTools className="text-4xl text-berg-green mb-4 drop-shadow-[0_0_8px_rgba(46,255,123,0.5)]" />,
      description: 'Diagnose failures, fix errors, reduce outages and manual patching.',
    },
    {
      title: 'Automate',
      icon: <FaRobot className="text-4xl text-berg-green mb-4 drop-shadow-[0_0_8px_rgba(46,255,123,0.5)]" />,
      description: 'Turn manual workflows into predictable, auditable automations.',
    },
    {
      title: 'Extend',
      icon: <FaChartLine className="text-4xl text-berg-green mb-4 drop-shadow-[0_0_8px_rgba(46,255,123,0.5)]" />,
      description: 'Add new workflows, integrations, and reporting on top of existing systems.',
    },
  ];

  return (
    <>
      <section
        ref={ref}
        className={`aurora-green-flow glassmorphism-aurora rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in border aurora-accent-green ${getSectionClass()} mb-8 relative overflow-hidden`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="animate-aurora-shimmer">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
        {/* Aurora wave overlay */}
        <div className="absolute inset-0 aurora-wave-overlay pointer-events-none"></div>
      </section>
    </>
  );
}
