import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { projects } from "@/data/projects";
import { useScrollResize } from '@/hooks/useScrollResize';
import { useProjectScrollResize } from '@/hooks/useProjectScrollResize';

interface ProjectCardProps {
  project: any;
  index: number;
  totalProjects: number;
}

function ProjectCard({ project, index, totalProjects }: ProjectCardProps) {
  const { ref, isShrunken, isEnlarged } = useProjectScrollResize(index, totalProjects);

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  return (
    <div
      ref={ref}
      className={`project-card group bg-card border border-white/5 rounded-lg overflow-hidden shadow hover:shadow-lg hover:border-ops-blue/50 transition-all duration-300 fade-transition fade-in ${getSectionClass()}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-3 text-white">
            <h3 className="text-lg font-bold">
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-1 bg-void border border-white/10 rounded text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <a
            href={project.demo}
            className="text-muted-foreground hover:text-ops-blue font-medium text-sm hover:underline"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section ref={ref} id="portfolio" className={`aurora-blue-flow glassmorphism-aurora rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in border aurora-accent-blue ${getSectionClass()} relative overflow-hidden`}>
        {/* Aurora wave overlay */}
        <div className="absolute inset-0 aurora-wave-overlay-blue pointer-events-none"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Explore some of my recent work showcasing modern web development capabilities
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
          {/* Previous Button (Desktop) */}
          <button
            onClick={handlePrev}
            className="hidden md:block p-3 rounded-full transition-all text-muted-foreground hover:bg-white/10 hover:text-ops-blue shadow-sm"
            aria-label="Previous page"
          >
            <FaChevronLeft className="w-8 h-8" />
          </button>

          {/* Project Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-0">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalProjects={currentProjects.length}
              />
            ))}
            {/* Invisible placeholders to maintain layout height */}
            {Array.from({ length: ITEMS_PER_PAGE - currentProjects.length }).map((_, idx) => (
              <div
                key={`placeholder-${idx}`}
                className="project-card bg-subtle rounded-lg overflow-hidden shadow invisible"
                aria-hidden="true"
              >
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700">Tech</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button (Desktop) */}
          <button
            onClick={handleNext}
            className="hidden md:block p-3 rounded-full transition-all text-muted-foreground hover:bg-white/10 hover:text-ops-blue shadow-sm"
            aria-label="Next page"
          >
            <FaChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Pagination Controls */}
        <div className="flex md:hidden justify-center items-center gap-6 mt-6 relative z-10">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full transition-all text-muted-foreground hover:bg-white/10 hover:text-ops-blue shadow-sm"
            aria-label="Previous page"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          
          <span className="text-sm font-medium text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            className="p-3 rounded-full transition-all text-muted-foreground hover:bg-white/10 hover:text-ops-blue shadow-sm"
            aria-label="Next page"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
      
      {/* Section separator: blue to purple transition */}
      <div className="section-separator section-separator-blue-to-purple mb-8"></div>
    </>
  );
}