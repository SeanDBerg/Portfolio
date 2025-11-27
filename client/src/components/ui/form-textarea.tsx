import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground/90 mb-2"
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            'w-full px-4 py-3 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-sm',
            'text-foreground placeholder:text-muted-foreground/50 resize-y min-h-[120px]',
            'focus:outline-none focus:ring-2 focus:ring-ops-blue/50 focus:border-ops-blue/50 focus:bg-surface',
            'transition-all duration-200 ease-in-out',
            error && 'border-red-400 focus:ring-red-400 focus:border-red-400',
            className
          )}
          data-testid={`textarea-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400" data-testid={`error-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';