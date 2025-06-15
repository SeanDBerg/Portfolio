import { useResumeRole } from '@/hooks/useResumeRole';
import Navigation from '@/components/Navigation';
import Overlay from '@/components/Overlay';

export default function Summary() {
  const { currentRole, switchRole } = useResumeRole();

  const handleDownloadPDF = () => {
    // Placeholder for PDF generation
    console.log('PDF download from summary page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main to-white">
      <Navigation onDownloadPDF={handleDownloadPDF} />
      <Overlay currentRole={currentRole} onRoleChange={switchRole} />
      
      <main className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-1 sm:py-2">
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in">
          <div className="text-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-trust-blue to-hover-blue rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-white p-2 rounded-full shadow-lg">
                  <img
                    src="./EggHeadMcFinnigans.jpg"
                    alt="Sean Berg Professional Profile"
                    className="rounded-full w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-snug mb-4">
              Operations & Technology Leader<br />
              Specialized in Team Management & Strategic Implementation
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-normal mb-8 max-w-4xl mx-auto">
              I drive operational excellence through strategic leadership, process optimization, and technology implementation. 
              From managing multi-million dollar operations to building high-performing teams across diverse industries.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-center justify-center gap-4 mb-8">
              <a
                href="#portfolio"
                className="px-6 py-3 bg-navy text-white font-medium rounded-lg shadow-lg hover:bg-trust-blue transition-colors"
              >
                View My Experience
              </a>
              <a
                href="mailto:SeanDBerg@gmail.com"
                className="px-6 py-3 bg-white border border-subtle text-navy font-medium rounded-lg shadow hover:bg-gray-50 transition-colors"
              >
                Get In Touch
              </a>
            </div>

            {/* Availability */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-subtle border border-gray-200 text-sm rounded-lg text-gray-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>Available for leadership opportunities</span>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex justify-center gap-6 text-gray-600">
              <a 
                href="mailto:SeanDBerg@gmail.com" 
                className="flex items-center gap-2 hover:text-hover-blue transition-colors"
              >
                <i className="fas fa-envelope text-lg"></i>
                <span>Email</span>
              </a>
              <a 
                href="https://linkedin.com/in/seanberg" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-hover-blue transition-colors"
              >
                <i className="fab fa-linkedin text-lg"></i>
                <span>LinkedIn</span>
              </a>
              <span className="flex items-center gap-2">
                <i className="fas fa-phone text-lg"></i>
                <span>(610) 730-3552</span>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}