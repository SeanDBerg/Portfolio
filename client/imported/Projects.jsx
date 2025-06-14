import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';

const sampleProjects = [
  {
    title: 'Project One',
    description: 'A brief description of Project One.',
    link: 'https://example.com/project-one',
    image: 'https://via.placeholder.com/300'
  },
  {
    title: 'Project Two',
    description: 'A brief description of Project Two.',
    link: 'https://example.com/project-two',
    image: 'https://via.placeholder.com/300'
  },
  {
    title: 'Project Three',
    description: 'A brief description of Project Three.',
    link: 'https://example.com/project-three',
    image: 'https://via.placeholder.com/300'
  }
];

export default function Projects() {
  return (
    <AnimatedPage>
      <div className="container">
        <h1>My Projects</h1>
        <div className="project-gallery">
          {sampleProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
