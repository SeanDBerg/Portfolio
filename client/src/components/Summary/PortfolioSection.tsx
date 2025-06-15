import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
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
      className={`project-card group bg-subtle rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 fade-transition fade-in ${getSectionClass()}`}
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
        <h3 className="text-lg font-bold text-navy mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <a
            href={`/project/${project.slug}`}
            className="text-navy hover:text-hover-blue font-medium text-sm hover:underline"
          >
            View Project
          </a>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              aria-label="GitHub repository"
            >
              <FaGithub className="text-sm" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Live demo"
            >
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  const featuredProjects = projects.slice(0, 6);

  return (
    <section ref={ref} id="portfolio" className={`bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in ${getSectionClass()}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
          Featured Projects
        </h2>
        <p className="text-base sm:text-lg text-gray-700">
          Explore some of my recent work showcasing modern web development capabilities
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalProjects={featuredProjects.length}
          />
        ))}
      </div>

      {/* View All */}
      <div className="mt-8 text-center">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-trust-blue text-white font-medium rounded-lg transition-colors"
        >
          <span>View All Projects</span>
          <FaArrowRight />
        </a>
      </div>
    </section>
  );
}