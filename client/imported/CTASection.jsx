import React from 'react';
import { Link } from 'react-router-dom';

// Renders the call-to-action section with links to contact and resume
export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-primary to-blue-600 dark:from-primary/80 dark:to-blue-900 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to transform your web experience?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Let&apos;s collaborate on your next project and create exceptional web experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white hover:bg-slate-100 text-primary font-medium rounded-lg shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-primary/30"
            >
              Get In Touch
            </Link>
            <Link
              to="/resume"
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
