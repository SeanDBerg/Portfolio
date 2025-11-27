import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

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
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-sm',
            'text-foreground placeholder:text-muted-foreground/50',
            'focus:outline-none focus:ring-2 focus:ring-ops-blue/50 focus:border-ops-blue/50 focus:bg-surface',
            'transition-all duration-200 ease-in-out',
            error && 'border-red-400 focus:ring-red-400 focus:border-red-400',
            className
          )}
          data-testid={`input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`}
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

FormInput.displayName = 'FormInput';