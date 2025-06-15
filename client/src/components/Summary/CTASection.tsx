import { Link } from 'wouter';

export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-navy to-trust-blue text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to transform your operations?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Let's collaborate on optimizing your business processes and building high-performing teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:SeanDBerg@gmail.com"
              className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-navy font-medium rounded-lg shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-white/30"
            >
              Get In Touch
            </a>
            <Link
              href="/resume"
              className="inline-block px-8 py-3 bg-transparent hover:bg-white/10 border border-white text-white font-medium rounded-lg transition-colors"
            >
              View My Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}