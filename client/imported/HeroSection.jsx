// HeroSection.jsx - Hero section component
import React from 'react';
import { FaGithub, FaLinkedin, FaCodepen, FaTwitter } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="pb-4 bg-gradient-to-br from-sky-50 to-white font-serif">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Content wrapper switches from center to left on medium+ */}
        <div className="text-center md:text-left">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight leading-snug">
            Full-Stack Developer<br />
            Focused on Python, Django, Flask, and JavaScript
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            I build modular backends, responsive frontends, and interactive tools, from AI job matchers to RPG-style learning games.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-start justify-center gap-4">
            <a
              href="#portfolio"
              className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-md shadow hover:bg-slate-800 transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-800 font-medium rounded-md shadow hover:bg-slate-100 transition"
            >
              Get In Touch
            </a>
          </div>

          {/* Availability */}
          <div className="mt-6 flex md:justify-start justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 text-sm rounded-lg text-slate-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>Available for freelance projects</span>
            </div>
          </div>

          {/* Socials */}
          <div className="mt-6 flex md:justify-start justify-center gap-6 text-slate-500">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://codepen.io" target="_blank" rel="noreferrer" className="hover:text-slate-900">
              <FaCodepen className="text-xl" />
            </a>
          </div>
        </div>

        {/* Profile image */}
        <div className="flex justify-center md:justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-sky-300 to-indigo-400 rounded-full blur-xl opacity-30"></div>
            <div className="relative bg-white p-2 rounded-full shadow-lg">
              <img
                src="/assets/profile.jpg"
                alt="Your Profile"
                className="rounded-full w-56 h-56 sm:w-64 sm:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
