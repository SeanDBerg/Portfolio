import { useState, useCallback } from 'react';
import { resumeData, type ResumeData } from '@/data/resumeData';

export type ResumeRole = 'general' | 'frontend' | 'it' | 'pm';

export function useResumeRole() {
  const [currentRole, setCurrentRole] = useState<ResumeRole>('general');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchRole = useCallback((role: ResumeRole) => {
    if (currentRole === role) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentRole(role);
      setIsTransitioning(false);
    }, 150);
  }, [currentRole]);

  const getCurrentRoleData = useCallback((): ResumeData => {
    return resumeData[currentRole];
  }, [currentRole]);

  return {
    currentRole,
    isTransitioning,
    switchRole,
    getCurrentRoleData,
    roleData: resumeData[currentRole]
  };
}
