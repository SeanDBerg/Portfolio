export interface Highlight {
  icon: string;
  text: string;
}

export interface CompetencyCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface ResumeData {
  title: string;
  summary: string;
  highlights: Highlight[];
  competencies: CompetencyCategory[];
  technicalSkills?: string;
  experience: Experience[];
  certifications: string[];
}

export const resumeData: Record<string, ResumeData> = {
  general: {
    title: "General Manager | Operations Leader | CX Retention Strategist",
    summary: "Results-driven leader with 20+ years overseeing multi-site operations across retail, hospitality, and technology. Proven success scaling teams, and increasing revenue retention through CX strategy, labor forecasting, and process automation. Adept at building performance cultures, executing growth roadmaps, and aligning cross-functional teams.",
    highlights: [
      {
        icon: "fas fa-chart-line",
        text: "Reduced employee turnover from 18% to 7% through onboarding, coaching, and workflow improvements"
      },
      {
        icon: "fas fa-users",
        text: "Directed onboarding of 2,000+ employees and 150+ managers across regional teams"
      },
      {
        icon: "fas fa-heart",
        text: "Improved client retention by 363% through CX redesign and success initiatives"
      },
      {
        icon: "fas fa-cogs",
        text: "Implemented POS systems and training programs for Hilton, Marriott, and Dairy Queen"
      },
      {
        icon: "fas fa-graduation-cap",
        text: "Led national sales training events and created RFPs for franchise and enterprise clients"
      },
      {
        icon: "fas fa-building",
        text: "Launched LMS platform with 400+ hours of content and a 9,000 sq. ft. training center"
      }
    ],
    competencies: [
      {
        category: "Operations",
        skills: ["Operations Leadership", "Multi-Unit Supervision", "Labor Forecasting", "P&L Accountability"]
      },
      {
        category: "People",
        skills: ["Staff Development", "Performance Coaching", "Retention Strategy", "Customer Experience"]
      },
      {
        category: "Finance & Compliance",
        skills: ["Financial Oversight", "Risk & Compliance", "Inventory Control"]
      },
      {
        category: "Technology",
        skills: ["POS Strategy", "Vendor Management", "Workflow Optimization", "Operational Reporting"]
      }
    ],
    experience: [
      {
        title: "Operations & Project Manager",
        company: "Self-Employed",
        period: "Jan. 2023 – Present",
        achievements: [
          "Managed project scoping, stakeholder communication, and post-launch support across multiple clients",
          "Reduced overhead by 18% through workflow automation and vendor optimization",
          "Designed onboarding assets, self-serve training tools, CRM optimizations, and POS vendor-facing dashboards",
          "Drove 60% increase in close rates through service design and customer journey automation"
        ]
      },
      {
        title: "Senior Manager, Customer Service & Retention",
        company: "Shift4 | Allentown, PA",
        period: "Aug 2020 - Jan 2023",
        achievements: [
          "Led customer support, portfolio retention, and multi-channel service operations for 200,000+ client accounts",
          "Oversaw global support center operations supporting $3.3B+ in revenue and national merchant portfolios",
          "Reduced employee turnover from 18% to 7% through onboarding, coaching, and workflow improvements",
          "Improved portfolio retention by 363% through CX strategy, onboarding improvements, and targeted support",
          "Created KPI dashboards to monitor SLAs, retention trends, and service quality across 200,000+ accounts"
        ]
      },
      {
        title: "Director, Client & Training Engagement",
        company: "Shift4 | Allentown, PA",
        period: "Mar 2015 - Aug 2020",
        achievements: [
          "Directed all training initiatives, POS onboarding, and internal enablement programs",
          "Developed role-based LMS content and launched an in-house training facility to support scalable onboarding",
          "Led M&A integration efforts by aligning teams and training programs with company-wide performance goals",
          "Built training and vendor dashboards to track adoption rates, knowledge gaps, and onboarding outcomes",
          "Fostered team culture by launching peer coaching models, improving team cohesion and promotion readiness"
        ]
      }
    ],
    certifications: [
      "Lean Six Sigma Green Belt (2025)",
      "Professional Scrum Master (PSM) (2025)"
    ]
  },
  frontend: {
    title: "Frontend Developer | React Interface Systems Engineer",
    summary: "Versatile Frontend Developer with a strong foundation in JavaScript, React, and web UI engineering. 10+ years of technical leadership experience delivering user-centered web solutions across SaaS, enterprise, and SMB environments. Proven ability to translate complex business needs into responsive, performant, and maintainable interfaces. Focused on building fast, modern applications that enhance user experience and operational efficiency.",
    highlights: [
      {
        icon: "fas fa-code",
        text: "Built multiple React-based dashboards for client portals and internal monitoring tools"
      },
      {
        icon: "fas fa-gamepad",
        text: "Designed and deployed a browser-based RPG onboarding game using HTML/CSS and JavaScript"
      },
      {
        icon: "fas fa-robot",
        text: "Developed modular cybersecurity resource curator with Discord-based UI using JavaScript and Python"
      },
      {
        icon: "fas fa-chart-bar",
        text: "Built React dashboards integrating Tableau and CRM data to monitor SLAs for 200k accounts"
      },
      {
        icon: "fas fa-mobile-alt",
        text: "Created React training interfaces to simulate POS behavior in sandboxed environments"
      },
      {
        icon: "fas fa-git-alt",
        text: "Maintained Git-based versioning and deployment via Render for multiple client projects"
      }
    ],
    competencies: [
      {
        category: "Frontend Development",
        skills: ["JavaScript (ES6+)", "TypeScript", "React", "TailwindCSS", "Python", "Flask", "Django"]
      },
      {
        category: "Tooling & Deployment",
        skills: ["Git", "Render", "Web Dashboards", "Discord UI Integrations"]
      },
      {
        category: "Practices",
        skills: ["Responsive Design", "Accessibility Compliance", "Performance Optimization"]
      },
      {
        category: "Project Execution",
        skills: ["Agile/Scrum", "Cross-Functional Collaboration", "Stakeholder Communication"]
      },
      {
        category: "Systems & Automation",
        skills: ["CRM Dashboards", "Training Interfaces", "Internal Tools"]
      }
    ],
    technicalSkills: "JavaScript (ES6+) • TypeScript • React • TailwindCSS • HTML5 • CSS3 • Python • Flask • Django • Git • Render • Responsive Design • Performance Optimization • Accessibility Compliance • REST APIs • JSON • Webpack • npm/yarn • Browser DevTools",
    experience: [
      {
        title: "Frontend-Focused IT Consultant",
        company: "Self-Employed | Remote",
        period: "Jan. 2023 – Present",
        achievements: [
          "Designed and delivered web-based tools, dashboards, and UI integrations for client-facing interfaces and automation",
          "Built multiple React-based dashboards for client portals and internal monitoring tools",
          "Designed and deployed a browser-based RPG onboarding game using HTML/CSS and JavaScript to improve training engagement",
          "Developed a modular cybersecurity resource curator with a Discord-based UI using JavaScript and Python, supporting real-time tool validation and automated updates",
          "Maintained Git-based versioning and deployment via Render"
        ]
      },
      {
        title: "Senior Manager, Customer Experience & Enablement",
        company: "Shift4 | Allentown, PA",
        period: "Aug 2020 - Jan 2023",
        achievements: [
          "Oversaw the development and deployment of frontend tools, dashboards, and CRM interfaces to enhance workflows",
          "Automated Slack-based support workflows using JavaScript and UI-driven commands for internal tools",
          "Built React dashboards integrating Tableau and CRM data to monitor SLAs, and retention for 200k accounts",
          "Standardized frontend components and design reviews across support platforms to improve UX consistency",
          "Developed a React CRM interface with integrated performance and pipeline metrics for executive reporting"
        ]
      },
      {
        title: "Director, Technical Training & Enablement",
        company: "Shift4 | Allentown, PA",
        period: "Mar 2015 - Aug 2020",
        achievements: [
          "Directed system training and LMS interface development, building internal web tools to track learning outcomes",
          "Launched an LMS interface and supporting dashboards to deliver 400+ hours of technical content",
          "Built internal web tools to track to visualize training progress and certification milestones",
          "Coordinated UX-aligned rollout strategies with IT and training teams to drive tool adoption and user readiness",
          "Developed React training interfaces to simulate POS behavior and onboard staff in a sandboxed environment"
        ]
      }
    ],
    certifications: [
      "PMP (In Progress - Expected Oct 2025)",
      "Lean Six Sigma Green Belt (2025)",
      "Professional Scrum Master (PSM) (2025)",
      "CompTIA A+ (2010)"
    ]
  },
  it: {
    title: "IT Manager | Infrastructure & Automation Leader | Technical Project Consultant",
    summary: "Multidisciplinary IT leader with 10+ years managing operations and delivering IT-driven business outcomes. Extensive experience in planning, deploying, and optimizing technical solutions across enterprise, retail, and SMB environments. Adept at leading cross-functional teams, supporting infrastructure rollouts, and aligning IT with business objectives. Known for bridging technical and non-technical teams through clear documentation and scalable systems.",
    highlights: [
      {
        icon: "fas fa-server",
        text: "Automated Zoho CRM workflows using Deluge to manage client status, send paperwork, and track follow-ups"
      },
      {
        icon: "fas fa-gamepad",
        text: "Built an RPG-style orientation game in JavaScript to increase training engagement"
      },
      {
        icon: "fas fa-chart-line",
        text: "Developed React dashboards to improve account visibility across vendors and clients"
      },
      {
        icon: "fab fa-python",
        text: "Created Python tools for cybersecurity resource curation, pruning outdated tools automatically"
      },
      {
        icon: "fab fa-linux",
        text: "Built virtual machines for researching and testing 30+ third-party POS systems"
      },
      {
        icon: "fas fa-database",
        text: "Designed hardware simulators and sandboxed training tools for internal staff readiness"
      }
    ],
    competencies: [
      {
        category: "IT Operations",
        skills: ["Systems Integration", "Linux & Virtualization", "Workflow Automation"]
      },
      {
        category: "Development",
        skills: ["Dashboards", "Internal Tools", "CRM Customization", "POS Infrastructure"]
      },
      {
        category: "Project Management",
        skills: ["Cross-Functional Teams", "Agile & Lean Methods", "Strategic Road Mapping"]
      },
      {
        category: "Strategy & Enablement",
        skills: ["UX Advocacy", "Vendor Management", "Training Systems"]
      }
    ],
    technicalSkills: "Linux • VMware • Office 365 • Jira • Git • VirtualBox • Bash • PowerShell • Python • Pandas • Flask • JavaScript • React • Node.js • PostgreSQL • SQL • C# • Tokenization • Encryption • Tableau",
    experience: [
      {
        title: "IT Operations & Solutions Consultant",
        company: "Self-Employed | Remote",
        period: "Jan. 2023 – Present",
        achievements: [
          "Managed IT project scoping, stakeholder coordination, and post-launch support for multiple clients",
          "Automated Zoho CRM workflows using Deluge to manage client status, send paperwork, and track follow-ups",
          "Built an RPG-style orientation game in JavaScript to increase training engagement",
          "Developed React dashboards to improve account visibility across vendors and clients",
          "Created Python tools for cybersecurity resource curation, pruning outdated tools automatically"
        ]
      },
      {
        title: "Senior Manager, Customer Service & Retention",
        company: "Shift4 | Allentown, PA",
        period: "Aug 2020 - Jan 2023",
        achievements: [
          "Led support infrastructure and retention operations for 200,000+ accounts across digital and service channels",
          "Automated call center workflows using Slack UI, Apps Script, and JavaScript to simplify support tasks",
          "Built real-time KPI dashboards in React with Tableau to monitor SLAs, retention, and service quality",
          "Centralized CRM, phone analytics, and support tickets to support daily use and power executive reporting",
          "Collaborated with IT teams to align deployments with support workflows and end-user readiness",
          "Oversaw $3.3B+ in tech-enabled payment portfolios and implemented digital-first retention operations"
        ]
      },
      {
        title: "Director, Technical Enablement & Training",
        company: "Shift4 | Allentown, PA",
        period: "Mar 2015 - Aug 2020",
        achievements: [
          "Directed LMS systems, POS onboarding, and technical training for internal teams and client partners",
          "Built virtual machines for researching and testing 30+ third-party POS systems",
          "Designed hardware simulators and sandboxed training tools for internal staff readiness",
          "Launched an LMS platform with 400+ technical training hours and automated progress tracking",
          "Built internal dashboards to track employee training status, completion rates, and certification progress",
          "Partnered with developers to scope, test, and validate proprietary POS software enhancements"
        ]
      }
    ],
    certifications: [
      "PMP (In Progress - Expected Oct 2025)",
      "Lean Six Sigma Green Belt (2025)",
      "Professional Scrum Master (PSM) (2025)",
      "CompTIA A+ (2010)"
    ]
  },
  pm: {
    title: "Technical Project Manager | CSM | Infrastructure & Operations Strategist",
    summary: "Results-driven project leader with over a decade of experience managing cross-functional initiatives spanning IT infrastructure, software deployment, and enterprise operations. Certified Scrum Master (CSM) with a proven record of delivering complex, high-impact technical solutions across enterprise, retail, and SMB environments. Known for bridging technical and business teams, aligning stakeholders, and driving scalable project outcomes with precision.",
    highlights: [
      {
        icon: "fas fa-project-diagram",
        text: "Scoped, led, and delivered IT automation, dashboarding, and CRM customization projects across multiple clients"
      },
      {
        icon: "fas fa-cogs",
        text: "Automated client onboarding workflows in Zoho CRM using Deluge and integrated status tracking"
      },
      {
        icon: "fas fa-chart-bar",
        text: "Engineered React-based reporting dashboards to streamline vendor and account visibility"
      },
      {
        icon: "fas fa-gamepad",
        text: "Developed a gamified onboarding system using JavaScript to increase training completion rates"
      },
      {
        icon: "fas fa-shield-alt",
        text: "Created Python tools to curate cybersecurity resource databases, reducing outdated tool references by 40%"
      },
      {
        icon: "fas fa-users-cog",
        text: "Led cross-departmental LMS deployment with 400+ hours of content and automated certification tracking"
      }
    ],
    competencies: [
      {
        category: "Project Management",
        skills: ["Agile, Scrum", "Project Lifecycle", "Stakeholder Management", "Cross-Functional Leadership"]
      },
      {
        category: "IT Operations",
        skills: ["Infrastructure Modernization", "Systems Integration", "Cloud Migrations", "Workflow Automation"]
      },
      {
        category: "Development & Analytics",
        skills: ["Dashboards & Data Reporting", "CRM Customization", "Scripting & Automation"]
      },
      {
        category: "Strategy & Enablement",
        skills: ["Roadmapping & Change Enablement", "Training Systems", "Vendor Management"]
      }
    ],
    technicalSkills: "Languages: Python, JavaScript, C#, SQL, Bash, PowerShell • Frameworks: Flask, React, Node.js, Pandas • Platforms: Windows, Linux, VMware, VirtualBox • Data & Reporting: PostgreSQL, Tableau, Tokenization, Encryption • Dev & Automation Tools: Git, Jira, Asana, Smartsheet, Office 365",
    experience: [
      {
        title: "Technical Project Manager",
        company: "Self-Employed | Remote",
        period: "Jan. 2023 – Present",
        achievements: [
          "Scoped, led, and delivered IT automation, dashboarding, and CRM customization projects across multiple clients",
          "Automated client onboarding workflows in Zoho CRM using Deluge and integrated status tracking",
          "Engineered React-based reporting dashboards to streamline vendor and account visibility",
          "Developed a gamified onboarding system using JavaScript to increase training completion rates",
          "Created Python tools to curate cybersecurity resource databases, reducing outdated tool references by 40%"
        ]
      },
      {
        title: "Senior Manager, Retention Operations & Digital Enablement",
        company: "Shift4 | Allentown, PA",
        period: "Aug 2020 - Jan 2023",
        achievements: [
          "Directed multiple digital transformation projects supporting 200,000+ accounts and $3.3B+ in revenue",
          "Spearheaded automation of call center workflows via Slack UI, JavaScript, and Google Apps Script",
          "Built and launched KPI dashboards in React + Tableau to track SLA adherence and service quality",
          "Consolidated CRM and analytics pipelines to enhance decision-making across departments",
          "Coordinated with IT and product teams to align software releases with support infrastructure readiness"
        ]
      },
      {
        title: "Director, Technical Training & Program Delivery",
        company: "Shift4 | Allentown, PA",
        period: "Mar 2015 - Aug 2020",
        achievements: [
          "Directed LMS systems, POS onboarding, and technical training for internal teams and client partners",
          "Led cross-departmental LMS deployment with 400+ hours of content and automated certification tracking",
          "Built virtual POS simulators and sandbox environments to reduce onboarding time for internal teams",
          "Partnered with software developers to scope and validate POS product enhancements pre-release",
          "Managed testing environments using Linux-based VMs for 30+ third-party platforms",
          "Designed dashboards to monitor training progress, improving certification rates by 75%"
        ]
      }
    ],
    certifications: [
      "Project Management Professional (PMP) – In Progress (Expected Oct 2025)",
      "Professional Scrum Master (PSM) (2025)",
      "Lean Six Sigma Green Belt (2025)",
      "CompTIA A+ (2010)"
    ]
  }
};
