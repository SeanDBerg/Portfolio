import { ResumeData } from '@/data/resumeData';

interface HeaderProps {
  roleData: ResumeData;
  isTransitioning: boolean;
}

export default function Header({ roleData, isTransitioning }: HeaderProps) {
  return (
    <header className={`bg-white rounded-xl shadow-lg p-8 mb-8 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" 
            alt="Sean Berg Professional Headshot" 
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-subtle"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-navy mb-2">Sean Berg</h1>
          <h2 className="text-xl text-trust-blue font-medium mb-4">{roleData.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">{roleData.summary}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <a 
              href="mailto:SeanDBerg@gmail.com" 
              className="flex items-center gap-2 hover:text-hover-blue transition-colors"
            >
              <i className="fas fa-envelope"></i>
              SeanDBerg@gmail.com
            </a>
            <a 
              href="https://linkedin.com/in/seanberg" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-hover-blue transition-colors"
            >
              <i className="fab fa-linkedin"></i>
              linkedin.com/in/seanberg
            </a>
            <span className="flex items-center gap-2">
              <i className="fas fa-phone"></i>
              (610) 730-3552
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt"></i>
              Northampton, PA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
