import { ResumeData } from '@/data/resumeData';
import { ResumeRole } from '@/hooks/useResumeRole';

interface PDFGeneratorProps {
  roleData: ResumeData;
  currentRole: ResumeRole;
}

export function usePDFGenerator() {
  const generatePDF = async (roleData: ResumeData, currentRole: ResumeRole) => {
    // Check if jsPDF is available
    if (typeof window === 'undefined' || !window.jspdf) {
      // Load jsPDF dynamically
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // PDF styling
    const primaryColor = [44, 62, 80]; // #2C3E50
    const secondaryColor = [52, 152, 219]; // #3498DB
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPosition = 25;
    
    // Helper function to add text with word wrap and page breaks
    function addText(text: string, x: number, y: number, maxWidth: number, fontSize = 10, isBold = false): number {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      
      return y + (lines.length * fontSize * 0.4) + 5;
    }

    // Header
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Sean Berg', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'normal');
    yPosition = addText(roleData.title, margin, yPosition, pageWidth - 2 * margin, 14);
    yPosition += 5;
    
    // Contact info
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition = addText('SeanDBerg@gmail.com | (610) 730-3552 | linkedin.com/in/seanberg | Northampton, PA', margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 10;
    
    // Professional Summary
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Summary', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    yPosition = addText(roleData.summary, margin, yPosition, pageWidth - 2 * margin, 11);
    yPosition += 10;
    
    // Career Highlights
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Career Highlights', margin, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    roleData.highlights.forEach(highlight => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      yPosition = addText(`• ${highlight.text}`, margin, yPosition, pageWidth - 2 * margin, 10);
    });
    yPosition += 10;
    
    // Core Competencies
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Core Competencies', margin, yPosition);
    yPosition += 10;
    
    roleData.competencies.forEach(comp => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(...secondaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text(comp.category + ':', margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const skillsText = comp.skills.join(' • ');
      yPosition = addText(skillsText, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
      yPosition += 3;
    });
    
    // Technical Skills (if available)
    if (roleData.technicalSkills) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(...primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text('Technical Skills', margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      yPosition = addText(roleData.technicalSkills, margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 10;
    }
    
    // Professional Experience
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Experience', margin, yPosition);
    yPosition += 10;
    
    roleData.experience.forEach(exp => {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.title, margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(12);
      doc.setTextColor(...secondaryColor);
      doc.setFont('helvetica', 'normal');
      doc.text(`${exp.company} | ${exp.period}`, margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      exp.achievements.forEach(achievement => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        yPosition = addText(`• ${achievement}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
      });
      yPosition += 8;
    });
    
    // Education & Certifications
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Education & Certifications', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Education:', margin, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addText('Bachelor of Science - Business Leadership, Capella University (2024)', margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
    yPosition += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Certifications:', margin, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    roleData.certifications.forEach(cert => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      yPosition = addText(`• ${cert}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
    });
    
    // Save the PDF
    const roleNames: Record<ResumeRole, string> = {
      general: 'General_Manager',
      frontend: 'Frontend_Developer',
      it: 'IT_Manager',
      pm: 'Project_Manager'
    };
    
    doc.save(`Sean_Berg_Resume_${roleNames[currentRole]}.pdf`);
  };

  return { generatePDF };
}

export default function PDFGenerator({ roleData, currentRole }: PDFGeneratorProps) {
  const { generatePDF } = usePDFGenerator();

  const handleDownload = () => {
    generatePDF(roleData, currentRole);
  };

  return null; // This component doesn't render anything
}
