// Navigation configuration
// Controls which sections are visible in the navigation bar

export interface NavigationConfig {
  showSummary: boolean;
  showResume: boolean;
  showProjects: boolean;
}

export const navigationConfig: NavigationConfig = {
  showSummary: true,    // Hidden by default
  showResume: true,      // Always show resume
  showProjects: false,   // Hidden by default
};

// Helper function to get visible sections
export function getVisibleSections(): Array<{ key: string; label: string }> {
  const sections = [];
  
  if (navigationConfig.showSummary) {
    sections.push({ key: 'summary', label: 'Summary' });
  }
  
  if (navigationConfig.showResume) {
    sections.push({ key: 'resume', label: 'Resume' });
  }
  
  if (navigationConfig.showProjects) {
    sections.push({ key: 'projects', label: 'Projects' });
  }
  
  return sections;
}

// Get the default active section (first visible section)
export function getDefaultActiveSection(): string {
  const visibleSections = getVisibleSections();
  return visibleSections.length > 0 ? visibleSections[0].key : 'resume';
}