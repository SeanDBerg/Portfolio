import React from 'react';

const SkillSection = ({ skills }) => {
  return (
    <div className="skill-section">
      <h2>Skills</h2>
      <ul className="skill-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillSection;
