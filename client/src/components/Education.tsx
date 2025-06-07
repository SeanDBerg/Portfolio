interface EducationProps {
  certifications: string[];
  isTransitioning: boolean;
}

export default function Education({ certifications, isTransitioning }: EducationProps) {
  return (
    <section className={`bg-white rounded-xl shadow-lg p-8 mb-8 fade-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
        <i className="fas fa-graduation-cap text-trust-blue"></i>
        Education & Certifications
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold text-navy mb-4">Education</h4>
          <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-4">
            <i className="fas fa-university text-trust-blue text-xl mt-1"></i>
            <div>
              <div className="font-medium text-lg">Bachelor of Science - Business Leadership</div>
              <div className="text-trust-blue">Capella University</div>
              <div className="text-sm text-gray-600">Graduated: 2024</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-navy mb-4">Certifications</h4>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-hover-blue/10 text-hover-blue px-4 py-3 rounded-lg flex items-center gap-3">
                <i className="fas fa-certificate"></i>
                <span className="font-medium text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
